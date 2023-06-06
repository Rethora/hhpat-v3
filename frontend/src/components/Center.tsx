import { ReactElement } from "react";

interface IProps {
  children: ReactElement;
}

export const Center = ({ children }: IProps) => (
  <div className="flex h-full w-full items-center justify-center">
    <div>{children}</div>
  </div>
);
