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
      <DialogContent className="sm:max-w-[425px] p-0 min-h-[400px] max-h-[90vh] h-[650px] min-w-[600px]">
        <DialogHeader className="pt-2 px-4">
          {temp[headerButton || "none"]}
          {/* <Twitter className="h-[300px] w-[300px]" />*/}
        </DialogHeader>
        <div className="flex flex-col pb-5 px-[80px]">
          <div className="justify-center items-center">{children}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
