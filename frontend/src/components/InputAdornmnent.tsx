import { ReactElement } from "react";

interface IProps {
  children: ReactElement;
}

export const InputAdornment = ({ children }: IProps) => (
  <div className="inline-flex items-center justify-center">{children}</div>
);
