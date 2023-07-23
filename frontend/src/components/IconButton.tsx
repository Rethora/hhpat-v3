import React from "react";
import Button, { ButtonProps } from "@mui/base/Button";

export const IconButton = React.forwardRef(
  (props: ButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => (
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
  )
);
