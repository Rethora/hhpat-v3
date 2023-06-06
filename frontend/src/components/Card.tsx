import { ReactElement } from "react";

interface IProps {
  children: ReactElement;
  className?: string;
}

export const Card = ({ children, className }: IProps) => (
  <div className={"card-shadow rounded-lg p-4 " + className}>{children}</div>
);
