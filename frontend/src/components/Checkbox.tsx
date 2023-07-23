import React from "react";
import { FormControl } from "@mui/base";

interface ICheckboxProps {
  name?: string;
  label?: string;
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  id: string;
}

export const Checkbox = React.forwardRef(
  (props: ICheckboxProps, ref: React.ForwardedRef<HTMLInputElement>) => (
    <FormControl>
      <div className="flex w-fit items-center justify-center">
        <input className="mr-2" {...props} ref={ref} type="checkbox" />
        <label htmlFor={props.id}>{props.label}</label>
      </div>
    </FormControl>
  )
);
