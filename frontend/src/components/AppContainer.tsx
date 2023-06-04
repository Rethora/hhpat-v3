import { ReactElement } from "react";

interface IProps {
  children: ReactElement;
}

export const AppContainer = ({ children }: IProps) => (
  <div className="h-screen w-full overflow-auto bg-offWhite px-2 sm:px-16 md:px-24 lg:px-32 xl:px-40">
    {children}
  </div>
);
