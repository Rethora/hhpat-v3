import React from "react";
import MuiInput, { InputProps } from "@mui/base/Input";

interface IInputProps {
  labelprops: {
    title: string;
    className?: string;
  };
}

export const Input = React.forwardRef(
  (
    props: InputProps & IInputProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => (
    <div>
      <label className={props.labelprops.className} htmlFor={props.name}>
        {props.labelprops.title}
      </label>
      <MuiInput
        ref={ref}
        {...props}
        slotProps={{
          root: state => ({
            className: `${
              state.focused ? "border-neutral" : "border-grey"
            } border-solid border-2 rounded-lg h-9 px-2 flex input-shadow`,
          }),
          input: {
            className: "outline-none bg-offWhite h-full w-full",
          },
        }}
      />
    </div>
  )
);
