import Button, { ButtonProps } from "@mui/base/Button";
import React from "react";

export const NeutralButton = React.forwardRef(function PositiveButton(
  props: ButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <Button
      ref={ref}
      {...props}
      slotProps={{
        root: state => ({
          className: `bg-neutral border-2 rounded-lg px-2 h-9 focus-visible:outline-neutral button-shadow`,
        }),
      }}
    />
  );
});
