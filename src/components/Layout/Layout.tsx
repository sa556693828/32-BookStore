import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";
import Nav from "../ui/nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  // const isMobile = useBreakpointValue({ base: true, lg: false });
  const urlPath = useRouter().pathname;
  const router = useRouter();

  return (
    <>
      {/* <Header urlPath={urlPath} /> */}
      <main
        className="max-w-[100vw]"
        style={{
          // minHeight: "calc(100dvh)",
          height: "calc(100vh - 60px)",
          overflowY: "auto",
        }}
      >
        {children}
      </main>
      <Nav urlPath={urlPath} />
    </>
  );
}
