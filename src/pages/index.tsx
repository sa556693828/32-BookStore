import { useCallback, useContext, useEffect, useState } from "react";
// import { useMainButton } from "@tma.js/sdk-react";
import { Context } from "@/components/Provider";
import { useRouter } from "next/router";
import { useInitData } from "@tma.js/sdk-react";
import { supabase } from "@/utils/supabase";
import { tableMap, UserData } from "@/types/types";
import { postEvent } from "@tma.js/sdk";
import ImageInput from "@/components/Input/imageInput";

export interface UploadData {
  title: string;
  image: string;
  description: string;
  price: number;
}

export default function Home() {
  const router = useRouter();
  const initData = useInitData();
  const { user: userTG } = initData as any;
  const [userData, setUserData] = useState<UserData | null>(null);
  const { goPage, updateUserToken, reFetchUserData } = useContext(Context);
  const [uploadData, setUploadData] = useState<UploadData>({
    title: "",
    description: "",
    price: 0,
    image: "",
  });
  const updateCollectionData = <K extends keyof UploadData>(
    key: K,
    value: UploadData[K]
  ) => {
    setUploadData({ ...uploadData, [key]: value });
  };

  const changeLogo = (file: any) => {
    updateCollectionData("image", file);
  };
  const getGoodList = async () => {
    try {
      const { data: goodList, error: goodListError } = await supabase
        .from(tableMap.goods)
        .select("*");
      if (goodListError) {
        throw goodListError;
      }
      if (goodList.length > 0) {
        console.log(goodList);
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  useEffect(() => {
    async function getOrCreateUser({
      userId,
      userName,
      firstName,
      lastName,
    }: {
      userId: number;
      userName?: string;
      firstName?: string;
      lastName?: string;
    }) {
      try {
        const { data: existingUser, error: userError } = await supabase
          .from(tableMap.users)
          .select("*")
          .eq("user_id", userId);
        if (userError) {
          throw userError;
        }
        if (existingUser.length > 0) {
          setUserData(existingUser[0] as UserData);
        } else {
          const { error: newUserError } = await supabase
            .from(tableMap.users)
            .insert([
              {
                user_id: userId,
                username: userName ? userName : undefined,
                first_name: firstName ? firstName : undefined,
                last_name: lastName ? lastName : undefined,
              },
            ])
            .single();
          if (newUserError) {
            throw newUserError;
          }
          const { data: newUserRows, error: newUserRowsError } = await supabase
            .from(tableMap.users)
            .select("*")
            .eq("user_id", userId);

          if (newUserRowsError) {
            throw newUserRowsError;
          }
          reFetchUserData();
          setUserData(newUserRows[0] as UserData);
          return newUserRows;
        }
      } catch (error) {
        console.error("Error creating user:", error);
      }
    }
    if (userTG) {
      getGoodList();
      getOrCreateUser({
        userId: Number(userTG.id),
        userName: userTG.username,
        firstName: userTG.firstName,
        lastName: userTG.lastName,
      });
    }
  }, [userTG]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("eruda").then((module) => {
        module.default.init();
      });
    }
    postEvent("web_app_expand");
  }, []);

  return (
    <div className="relative z-20 flex h-full w-full flex-col items-center gap-1 bg-white">
      <a className="text-3xl font-bold uppercase">{`3 > 2 Mall`}</a>
      <a className="text-2xl font-semibold uppercase">{`You can upload your good here`}</a>
      <ImageInput uploadImage={uploadData.image} setUploadImages={changeLogo} />
    </div>
  );
}
