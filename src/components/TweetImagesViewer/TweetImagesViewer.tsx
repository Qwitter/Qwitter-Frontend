import { cn } from "@/lib";
import { Tweet } from "@/models/Tweet";
import { HiOutlineXMark } from "react-icons/hi2";

type TweetImagesViewerOnly = {
  mode?: "view-only";
  images: Tweet["entities"]["media"];
  removeAttachment?: (index: number) => void;
  screen?: "tweet" | "message";
};

type TweetImagesEditor = {
  mode?: "edit";
  images: Tweet["entities"]["media"];
  removeAttachment: (index: number) => void;
  screen: "tweet" | "message";
};

type TweetImagesViewerProps = TweetImagesEditor | TweetImagesViewerOnly;

const TweetImagesViewer = ({
  images,
  mode = "view-only",
  screen = "tweet",
  removeAttachment,
}: TweetImagesViewerProps) => {
  return (
    <div
      className={cn("mt-4 rounded-xl overflow-hidden w-full", {
        "max-h-[290px] pb-[290px] h-full": images.length > 1,
        "max-h-[298px]": mode === "edit" && images.length === 4,
        hidden: images.length === 0,
        "h-[200px] max-w-[400px]": screen === "message",
      })}
    >
      {images.length === 3 ? (
        <div
          className={cn("flex h-[290px] gap-0.5", { "gap-2": mode === "edit" })}
        >
          <div
            className={cn("relative flex-1 h-full w-full overflow-hidden")}
            key={images[0].value}
          >
            <img
              src={images[0].value}
              alt=""
              className={cn("h-full absolute object-cover min-w-full", {
                "rounded-xl": mode === "edit",
              })}
            />
            {mode === "edit" && (
              <HiOutlineXMark
                className="tweet-image-remover-icon"
                onClick={() => removeAttachment!(0)}
              />
            )}
          </div>
          <div
            className={cn("flex flex-col flex-1 gap-0.5", {
              "gap-2": mode === "edit",
            })}
          >
            {images.slice(1, 3).map((image, i) => (
              <div
                className="relative flex-1 h-full w-full overflow-hidden"
                key={image.value}
              >
                <img
                  src={image.value}
                  alt=""
                  className={cn("h-full absolute object-cover min-w-full", {
                    "rounded-xl": mode === "edit",
                  })}
                />
                {mode === "edit" && (
                  <HiOutlineXMark
                    className="tweet-image-remover-icon"
                    onClick={() => removeAttachment!(i + 1)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div
            className={cn("flex h-[290px] gap-px", {
              "h-full": images.length === 1,
              "h-0": images.length === 0,
              "h-[145px]": images.length >= 4,
              "gap-2": mode === "edit",
            })}
          >
            {images.slice(0, 2).map((image, i) => (
              <div
                className={cn("relative flex-1 h-full w-full overflow-hidden")}
                key={image.value}
              >
                <img
                  src={image.value}
                  alt=""
                  className={cn("h-full absolute object-cover min-w-full", {
                    static: images.length === 1,
                    "rounded-xl": mode === "edit",
                  })}
                />
                {mode === "edit" && (
                  <HiOutlineXMark
                    className="tweet-image-remover-icon"
                    onClick={() => removeAttachment!(i)}
                  />
                )}
              </div>
            ))}
          </div>
          <div
            className={cn("flex h-[145px] mt-px gap-px", {
              "h-0": images.length <= 2,
              "gap-2 mt-2": mode === "edit",
            })}
          >
            {images.slice(2, 4).map((image, i) => (
              <div
                className="relative flex-1 h-full w-full overflow-hidden"
                key={image.value}
              >
                <img
                  src={image.value}
                  alt=""
                  className={cn("h-full absolute object-cover min-w-full", {
                    static: images.length === 1,
                    "rounded-xl": mode === "edit",
                  })}
                />
                {mode === "edit" && (
                  <HiOutlineXMark
                    className="tweet-image-remover-icon"
                    onClick={() => removeAttachment!(i + 2)}
                  />
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TweetImagesViewer;
