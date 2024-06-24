import { useInitData } from "@tma.js/sdk-react";
import { RxAvatar } from "react-icons/rx";
import { IoHome } from "react-icons/io5";
import { MdScreenShare } from "react-icons/md";
import { useContext } from "react";
import { Context } from "../Provider";

export default function Nav({ urlPath }: { urlPath: string }) {
  const initData = useInitData();
  const { goPage } = useContext(Context);
  const navRouter = [
    {
      id: 1,
      name: "Home",
      path: "/",
      icon: <IoHome size={25} />,
    },
    { id: 2, name: "Profile", path: "/profile", icon: <RxAvatar size={25} /> },
    { id: 3, name: "Share", path: "/share", icon: <MdScreenShare size={25} /> },
  ];
  return (
    <div className="relative z-20 flex h-[60px] cursor-pointer w-full justify-between text-center items-center gap-1 border-t border-black/20">
      {navRouter.map((nav) => (
        <div
          key={nav.id}
          className={`flex-1 font-bold uppercase flex flex-col items-center ${
            urlPath === nav.path ? "text-black" : "text-gray-400"
          }`}
          onClick={() => goPage(nav.path)}
        >
          {nav.icon}
          <a className="text-xs">{nav.name}</a>
        </div>
      ))}
    </div>
  );
}
