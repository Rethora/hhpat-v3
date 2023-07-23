import { Navbar } from "components/Navbar";
import { Outlet } from "react-router-dom";

export const RootLayout = () => (
  <div className="flex h-screen flex-col bg-offWhite">
    <Navbar />
    <div className="h-full overflow-auto p-2 sm:px-16 md:px-24 lg:px-32 xl:px-40">
      <Outlet />
    </div>
  </div>
);
