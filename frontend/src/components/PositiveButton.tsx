import Button, { ButtonProps } from "@mui/base/Button";
import React from "react";

export const PositiveButton = React.forwardRef(
  (props: ButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => (
    <Button
      ref={ref}
      {...props}
      slotProps={{
        root: state => ({
          className: `bg-positive border-2 rounded-lg px-2 h-9 focus-visible:outline-neutral button-shadow`,
        }),
      }}
    />
  )
);
