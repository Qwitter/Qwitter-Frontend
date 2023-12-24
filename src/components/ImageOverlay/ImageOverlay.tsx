import React, { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetOverlay, SheetTrigger } from "../ui/sheet";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import TweetInteractionsButtons from "../TweetInteractionsButtons/TweetInteractionsButtons";
import { Tweet, TweetWithReplyAndRetweet } from "@/models/Tweet";
import { default as TweetComponent } from "../Tweet/Tweet";

type ImageOverlayProps = {
  tweet: TweetWithReplyAndRetweet;
  imageArr: Tweet["entities"]["media"];
  children: React.ReactNode;
  index?: number;
};

export const ImageOverlay = ({
  children,
  imageArr,
  tweet,
  index = 0,
}: ImageOverlayProps) => {
  const [imageIndex, setImageIndex] = useState<number>(index);
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);

  console.log(children);
  console.log(imageArr);

  useEffect(() => {
    setImageIndex(0);
  }, [sheetOpen]);

  const stopProp = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const closeOverlay = (event: React.MouseEvent<HTMLDivElement>) => {
    stopProp(event);
    setSheetOpen(false);
  };

  const openOverlay = () => {
    setSheetOpen(true);
  };

  const prevImage = (event: React.MouseEvent<HTMLDivElement>) => {
    stopProp(event);
    setImageIndex(imageIndex - 1);
  };

  const nextImage = (event: React.MouseEvent<HTMLDivElement>) => {
    stopProp(event);
    setImageIndex(imageIndex + 1);
    console.log(imageIndex);
  };

  return (
    <Sheet open={sheetOpen}>
      <SheetTrigger onClick={openOverlay}>{children}</SheetTrigger>
      <SheetOverlay
        onClick={closeOverlay}
        className="bg-black/90 lg:bg-black/90"
      >
        <SheetContent
          side="left"
          className=" flex flex-row justify-between px-3 items-center outline-none"
          style={{ pointerEvents: "auto" }}
        >
          <div className="h-full py-3 flex flex-col justify-between items-center">
            <div
              onClick={closeOverlay}
              className="w-[35px] h-[35px] flex justify-center items-center rounded-full hover:bg-dark-gray/70 cursor-pointer"
            >
              <X size={20} />
            </div>
            <div className=" w-[35px] h-[35px]">
              {imageIndex != 0 && (
                <div
                  onClick={prevImage}
                  className="flex justify-center items-center w-full h-full rounded-full hover:bg-dark-gray/70 cursor-pointer"
                >
                  <ArrowLeft size={20} />
                </div>
              )}
            </div>
            <div></div>
          </div>

          <div
            onClick={stopProp}
            className="flex flex-col justify-start h-full w-[80%] lg:max-w-[1024px]"
          >
            <img src={imageArr[imageIndex]?.value} className="w-full h-full" />
            <TweetInteractionsButtons tweet={tweet} mode="page" />
          </div>

          <div className=" w-[35px] h-[35px]">
            {imageIndex != imageArr.length - 1 && (
              <div
                onClick={nextImage}
                className="flex justify-center items-center w-full h-full rounded-full hover:bg-dark-gray/70 cursor-pointer"
              >
                <ArrowRight size={20} />
              </div>
            )}
          </div>
        </SheetContent>
      </SheetOverlay>
      <SheetContent className="outline-none">
        <TweetComponent tweet={tweet} size="compact" />
      </SheetContent>
    </Sheet>
  );
};
