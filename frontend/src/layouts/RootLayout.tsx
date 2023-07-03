import React from "react";
import { Navbar } from "components/Navbar";
import { Outlet } from "react-router-dom";
import { useWindowSize } from "hooks/useWindowSize";

export const RootLayout = () => {
  const navbarRef = React.useRef<HTMLDivElement>({} as HTMLDivElement);
  const { height } = useWindowSize();

  return (
    <div className="relative w-full bg-offWhite ">
      <div ref={navbarRef} className="sticky left-0 top-0 w-full">
        <Navbar />
      </div>
      <div
        className={`p-2 sm:px-16 md:px-24 lg:px-32 xl:px-40 ${
          height
            ? "h-[" + (height - navbarRef.current.clientHeight) + "px]"
            : "h-screen"
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};
