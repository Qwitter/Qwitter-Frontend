import React, { MouseEventHandler } from "react";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { X, ArrowLeft, Twitter } from "lucide-react";
import { HeaderButton } from "@/models/PopUpModel";
import { cn } from "../../lib/utils";

type PopUpProps = {
  show: boolean; // flag to hide and show the popup
  headerButton?: HeaderButton;
  headerFunction?: MouseEventHandler<HTMLDivElement>;
  title?: string;
  showLogo?: boolean; // flag to show the logo
  children?: React.ReactNode; // children to be displayed
  className?: string;
};

export const PopUpContainer = (props: PopUpProps) => {
  // get necessary data
  const { show, children, headerButton, title, className } = props;
  const headerFunction =
    headerButton != HeaderButton.none ? props.headerFunction : () => {};
  const showLogo = props.showLogo || false;

  // manage the header content
  const headerContent = {
    close: <X className="h-5 w-5 inline" role="PopUpIcon" />,
    back: <ArrowLeft className="h-5 w-5 inline" role="PopUpIcon" />,
    none: <span className="h-5 w-5 cursor-default"></span>,
  };

  return (
    <Dialog open={show}>
      <DialogContent className="sm:max-w-[425px] p-0 min-h-[400px] max-h-[90vh] h-[650px] min-w-[600px]">
        {(headerButton || showLogo || title) && (
          <DialogHeader className="px-4 h-[53px] flex flex-row items-center space-y-0">
            <span className="w-[56px]">
              <div
                className={`ml-[-8px] w-9 h-9 flex justify-center items-center rounded-3xl ${
                  headerButton &&
                  "cursor-pointer hover:bg-dark-gray hover:border-dark-gray "
                }`}
                onClick={headerFunction}
              >
                {headerContent[headerButton || "none"]}
              </div>
            </span>
            {showLogo && (
              <div className="flex flex-row items-center justify-center w-full">
                <Twitter
                  className="relative right-[28px] w-8 h-[53px]"
                  role="PopUpIcon"
                />
              </div>
            )}
            {title && <span className="text-xl font-bold">{title}</span>}
          </DialogHeader>
        )}
        <div
          className={cn(
            "flex flex-col w-full pb-5 px-[80px] justify-center items-center",
            className
          )}
        >
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};
