import { MouseEventHandler } from "react";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { X, ArrowLeft } from "lucide-react";
import { HeaderButton } from "@/models/PopUpModel";
import { cn } from "../../lib/utils";
import Logo from "../../assets/logo.png";

type PopUpProps = {
  show: boolean; // flag to hide and show the popup
  headerButton?: HeaderButton;
  headerFunction?: MouseEventHandler<HTMLDivElement>;
  title?: string | boolean | null;
  showLogo?: boolean; // flag to show the logo
  children?: React.ReactNode; // children to be displayed
  className?: string;
  headerClassName?: string;
  optionalHeader?: React.ReactNode;
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

  const dialogContentHeight = className?.includes("h-full")
    ? "sm:h-[650px]"
    : "sm:h-auto";

  return (
    <Dialog open={show}>
      <DialogContent
        className={`min-w-[350px] max-w-full sm:min-w-[425px] sm:max-w-[600px] h-full sm:max-h-[650px] ${dialogContentHeight} p-0`}
      >
        {(headerButton || showLogo || title) && (
          <DialogHeader
            className={cn(
              "px-4 h-[53px] flex flex-row items-center space-y-0",
              props.headerClassName
            )}
          >
            <div className="flex flex-row">
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
              {title && <span className="text-xl font-bold">{title}</span>}
            </div>
            {showLogo && (
              <div className="flex flex-row items-center justify-center w-full">
                <img
                  src={Logo}
                  className="relative right-[28px] w-[53px] h-[53px]"
                />
              </div>
            )}
            {props.optionalHeader}
          </DialogHeader>
        )}
        <div
          className={cn(
            "flex flex-col h-[597px] min-h-[147px] max-h-[597px] w-full pb-5 px-[80px] justify-center items-center",
            className
          )}
        >
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};
