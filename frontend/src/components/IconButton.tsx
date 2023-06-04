import React from "react";
import Button, { ButtonProps } from "@mui/base/Button";

export const IconButton = React.forwardRef(function IconButton(
  props: ButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <Button
      ref={ref}
      {...props}
      slotProps={{
        root: {
          className:
            "flex items-center justify-center border-none bg-inherit cursor-pointer focus-within:outline-neutral",
        },
      }}
    />
  );
});
