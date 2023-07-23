import React from "react";
import MuiInput, { InputProps } from "@mui/base/Input";

interface IInputProps {
  labelprops: {
    label: string;
    className?: string;
  };
  id: string;
  errortext?: string;
  helpertext?: string;
}

export const Input = React.forwardRef(
  (
    props: InputProps & IInputProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => (
    <div className="w-full sm:w-64 md:w-72 lg:w-80 xl:w-96">
      <label className={props.labelprops.className} htmlFor={props.id}>
        {props.labelprops.label}
      </label>
      <MuiInput
        ref={ref}
        {...props}
        slotProps={{
          root: state => ({
            className: `${
              state.focused ? "border-neutral" : "border-grey"
            } border-solid border-2 rounded-lg h-9 flex input-shadow`,
          }),
          input: {
            className: "outline-none h-full w-full px-2 rounded-lg",
          },
        }}
      />
      {props.error ? (
        <div className="text-negative">{props.errortext}</div>
      ) : (
        props.helpertext && <div>{props.helpertext}</div>
      )}
    </div>
  )
);
