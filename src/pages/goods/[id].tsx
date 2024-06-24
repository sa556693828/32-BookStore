import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import yt from "@/assets/ICONS/footer_yt.svg";
import ig from "@/assets/ICONS/footer_ig.svg";
import "swiper/css";
import "swiper/css/pagination";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import axios from "axios";

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: "170395375097414469" } },
      { params: { id: "170395400429071935" } },
      { params: { id: "170395407356053688" } },
      { params: { id: "170395409364063676" } },
      { params: { id: "170395412184411118" } },
      { params: { id: "170395414065577148" } },
    ],
    fallback: true,
  };
}
export async function getStaticProps({ params }: any) {
  const index = params.id;
  try {
    if (process.env.NODE_ENV === "production") {
      const res = await axios.get(
        `https://bako.soooul.xyz/api/v1/products/${index}`
      );
      const data = res.data.data.data;
      const imgsArray = JSON.parse(data?.imgs);
      const detail = data?.detail;
      const titleArray = JSON.parse(data?.title);
      const specArray = JSON.parse(data?.specifications);
      return { props: { imgsArray, detail, titleArray, specArray } };
    } else {
      const res = await axios.get(
        `http://localhost:8098/api/v1/products/${index}`
      );
      const data = res.data.data.data;
      const imgsArray = JSON.parse(data?.imgs);
      const detail = data?.detail;
      const titleArray = JSON.parse(data?.title);
      const specArray = JSON.parse(data?.specifications);
      return { props: { imgsArray, detail, titleArray, specArray } };
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        imgsArray: [],
        detail: "",
        titleArray: [],
        specArray: [],
        data: {},
        error: "Failed to fetch data",
      },
    };
  }
}
interface Props {
  imgsArray: any;
  detail: string;
  titleArray: any;
  specArray: any;
}

const DynamicPage = ({ imgsArray, detail, titleArray, specArray }: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const swiperRef = useRef<any>(null);
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [click, setClick] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const openLink = (link: string) => {
    window.open(link, "_blank");
  };
  const stringFormat = (str: string) => {
    return str
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());
  };
  const navigateToInquire = () => {
    router.push({
      pathname: "/collection/inquire",
      query: { id },
    });
  };
  return (
    <div className="flex flex-col items-start bg-bakoW p-4 pb-16 lg:flex-row lg:justify-between lg:px-[10%] lg:py-20">
      <div className="hidden w-[57.14%] gap-6 lg:flex">
        <div className="flex flex-col gap-4">
          {imgsArray &&
            imgsArray?.map((img: any, index: number) => (
              <Image
                onClick={() => setImgIndex(index)}
                key={index}
                src={img}
                alt="pic1"
                width={200}
                height={200}
                className={`${
                  index === imgIndex ? "border-bakoB" : "border-bakoB/20"
                } h-[68px] w-[68px] border-2 object-cover`}
              />
            ))}
        </div>
        <div className="h-[572px] w-full min-w-[320px] bg-[#C5C6C7]">
          <Image
            src={imgsArray && imgsArray[imgIndex]}
            alt="pic1"
            width={1000}
            height={1000}
            className="h-full w-full object-contain transition-all hover:object-cover"
          />
        </div>
      </div>
      <div className="relative flex w-full flex-col lg:hidden"></div>
      <div className="pt-12 lg:w-[35.7%] lg:pt-0">
        <div className="flex w-full flex-col gap-2 border-b border-bakoB/20 pb-8 leading-[140%]">
          <a className="text-2xl">{titleArray && titleArray[0]}</a>
          <a>{titleArray && titleArray[1]}</a>
        </div>
        <div className="flex w-full flex-col gap-4 border-b border-bakoB/20 py-8 text-sm leading-[140%] lg:text-base">
          <a className="">{detail}</a>
          <div>
            Please take a listen to{" "}
            <a className="font-bold">{titleArray && titleArray[1]}</a> talk
            about :{/* [podcast highlight]: */}
          </div>
          <div className="flex items-start gap-4">
            <Image
              src={yt}
              alt="Instagram"
              className="h-6 w-6 cursor-pointer lg:h-8 lg:w-8"
            />
            {/* <Image src={ig} alt="Instagram" className="h-6 w-6 lg:h-8 lg:w-8" /> */}
          </div>
        </div>
        <div className="flex w-full flex-col gap-4 py-8 leading-[140%]">
          {Object.entries(specArray || {}).map(([key, value]) => (
            <div key={key} className="flex gap-1 text-sm lg:text-base">
              <a className="font-bold">{stringFormat(key)}:</a>
              <a>{value as any}</a>
            </div>
          ))}
        </div>
        <button
          className="h-[60px] w-full rounded-full bg-bakoB font-bold uppercase leading-[140%] tracking-[6.4px] text-bakoW"
          onClick={navigateToInquire}
        >
          inquire
        </button>
      </div>
    </div>
  );
};

export default DynamicPage;
