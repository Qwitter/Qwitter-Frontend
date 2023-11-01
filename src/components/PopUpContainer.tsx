import React from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { X, ArrowLeft } from "lucide-react";

type Props = {
  show: boolean; // flag to hide and show the popup
  hasBack?: boolean; // flag for the back arrow
  hasClose?: boolean; // flag for the x
  hasLogo?: boolean; // flag to show the logo
  children?: React.ReactNode; // children to be displayed
};

export const PopUpContainer = (props: Props) => {
  // get mandatory data
  const { show, children } = props;

  // default values for flags
  const hasBack = props.hasBack || false;
  const hasClose = props.hasClose || false;
  const hasLogo = props.hasLogo || false;

  // NEEDED: make the elements centered, fix the nav
  return (
    <Dialog open={show}>
      <DialogContent className="sm:max-w-[425px] pt-0">
        <DialogHeader className="pt-2">
          {hasClose && <X className="h-4 w-4" />}
          {hasBack && <ArrowLeft className="h-4 w-4" />}
          {/* hasLogo &&  */}
          {/* <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <div className="grid gap-4 pb-4">
          <div className="grid grid-cols-4 items-center gap-4">{children}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
