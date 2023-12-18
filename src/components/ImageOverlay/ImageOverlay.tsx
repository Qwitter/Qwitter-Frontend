import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

type ImageOverlayProps = {
  // tweet:
  children: React.ReactNode;
};

export const ImageOverlay = ({ children }: ImageOverlayProps) => {
  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent>
        <div>hello there</div>
      </SheetContent>
    </Sheet>
  );
};
