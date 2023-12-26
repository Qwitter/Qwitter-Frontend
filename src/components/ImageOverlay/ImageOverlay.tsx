import React, {  useState } from "react";
import { Sheet, SheetContent, SheetOverlay } from "../ui/sheet";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import TweetInteractionsButtons from "../TweetInteractionsButtons/TweetInteractionsButtons";
import {  TweetWithReplyAndRetweet } from "@/models/Tweet";
import { useLocation, useNavigate } from "react-router-dom";
import TweetDetails from "@/pages/TweetDetails/TweetDetails";

export const ImageOverlay = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const tweet = location.state?.tweet as TweetWithReplyAndRetweet;
  const index = location.state?.index as number;
  const imageArr = tweet['entities']['media'];
  const [imageIndex, setImageIndex] = useState<number>(index);

  const stopProp = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const closeOverlay = (event: React.MouseEvent<HTMLDivElement>) => {
    stopProp(event);
    navigate(-1);
   
  };


  const prevImage = (event: React.MouseEvent<HTMLDivElement>) => {
    stopProp(event);
    setImageIndex(imageIndex - 1);
  };

  const nextImage = (event: React.MouseEvent<HTMLDivElement>) => {
    stopProp(event);
    setImageIndex(imageIndex + 1);
  };

  return (
    <Sheet open={true}>
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
            className="flex flex-col justify-between h-full w-[80%] lg:max-w-[1024px]"
          >
            <img src={imageArr[imageIndex]?.value} className="w-full h-[calc(100vh-60px)] " />
            <TweetInteractionsButtons tweet={tweet} mode="page" className="h-10 my-2 items-center" />
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
        <TweetDetails compact />
      </SheetContent>
    </Sheet>
  );
};
