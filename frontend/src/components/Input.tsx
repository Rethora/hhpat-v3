import React from "react";
import MuiInput, { InputProps } from "@mui/base/Input";

export const Input = React.forwardRef(function Input(
  props: InputProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  return (
    <MuiInput
      ref={ref}
      {...props}
      slotProps={{
        root: (state) => ({
          className: `${
            state.focused ? "border-neutral" : "border-grey"
          } border-solid border-2 rounded-lg h-9 px-2 flex input-shadow`,
        }),
        input: {
          className: "outline-none bg-offWhite h-full w-full",
        },
      }}
    />
  );
});
