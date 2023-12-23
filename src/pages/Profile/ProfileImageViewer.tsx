import { Dialog, DialogOverlay, DialogPortal } from "@/components/ui/dialog";
import { X } from "lucide-react";
import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib";

interface ProfileImageViewerProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  isBanner: boolean;
}

export const ProfileImageViewer = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  ProfileImageViewerProps
>(({ isBanner, ...props }, ref) => {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate(-1);
  };
  const location =useLocation();
  console.log(location.state.previousLocation?.pathname.includes('rofile'))
  const img = isBanner
    ?location.state.bannerImg
    :location.state.photo;

  return (
    <Dialog open={true}>
      <DialogPortal>
        <DialogOverlay
          onClick={handleClose}
          className="bg-black sm:bg-black/90"
        />
        <DialogPrimitive.Content
          ref={ref}
          className="duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          {...props}
        >
          <div
            onClick={handleClose}
            className="fixed left-[1.5%] top-[1.5%] z-50  w-9 h-9 flex justify-center items-center rounded-full cursor-pointer hover:bg-dark-gray/70 hover:border-dark-gray/70"
          >
            <X className="h-5 w-5 inline" />
          </div>

          <div
            className={cn(
              "fixed left-[50%] top-[50%] z-50 w-full max-w-[368px] translate-x-[-50%] translate-y-[-50%] ",
              isBanner && "max-w-none sm:aspect-[3/1]"
            )}
            // change the max-w here to change the size
            // handle responsiveness here
          >
            <div
              className={cn(
                " h-full",
                location.state.previousLocation?.pathname.includes('rofile')&& "aspect-square w-full"
              )}
            >
              <img
                src={img}
                alt="Profile Image"
                className={cn(
                  "rounded-full w-full h-full",
                  (isBanner||!location.state.previousLocation?.pathname.includes('rofile')) && "rounded-none"
                )}
              />
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
});
