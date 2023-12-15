import React from "react";
import { Dialog, DialogOverlay, DialogPortal } from "../ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Spinner } from "../Spinner";

interface LoadingOverlayProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  show: boolean;
}

export const LoadingOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  LoadingOverlayProps
>(({ show, ...props }, ref) => {
  return (
    <Dialog open={show}>
      <DialogPortal>
        <DialogOverlay
          className="bg-black sm:bg-black/90 -z-50"
          onClick={() => {
            console.log("wow");
          }}
        />
        <DialogPrimitive.Content
          ref={ref}
          className="duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          {...props}
        >
          <Spinner />
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
});
