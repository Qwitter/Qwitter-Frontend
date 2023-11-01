import React, { MouseEventHandler } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { X, ArrowLeft, Twitter } from "lucide-react";
import { HeaderButton } from "@/models/PopUpModel";

type PopUpProps = {
  show: boolean; // flag to hide and show the popup
  headerButton?: HeaderButton;
  backFunction?: MouseEventHandler<SVGSVGElement>;
  showLogo?: boolean; // flag to show the logo
  children?: React.ReactNode; // children to be displayed
};

export const PopUpContainer = (props: PopUpProps) => {
  // get mandatory data
  const { show, children, headerButton, backFunction } = props;

  const temp = {
    close: <X className="h-4 w-4 cursor-pointer" />,
    back: (
      <ArrowLeft className="h-4 w-4 cursor-pointer" onClick={backFunction} />
    ),
    none: null,
  };

  // NEEDED: make the elements centered, fix the nav
  return (
    <Dialog open={show}>
      <DialogContent className="sm:max-w-[425px] pt-0">
        <DialogHeader className="pt-2">
          {temp[headerButton || "none"]}
          <Twitter className="h-4 w-4" />
        </DialogHeader>
        <div className="flex flex-col pb-4">
          <div className="justify-center items-center">{children}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
