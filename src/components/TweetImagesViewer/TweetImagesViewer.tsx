import { cn } from "@/lib";
import { Tweet } from "@/models/Tweet";

type TweetImagesViewerProps = {
  images: Tweet["entities"]["media"];
};

const TweetImagesViewer = ({ images }: TweetImagesViewerProps) => {
  return (
    <div
      className={cn("mt-4 rounded-xl overflow-hidden w-full", {
        "max-h-[290px] pb-[290px] h-full": images.length > 1,
      })}
    >
      {images.length === 3 ? (
        <div className="flex h-[290px] gap-0.5">
          <div
            className={cn("relative flex-1 h-full w-full overflow-hidden")}
            key={images[0].value}
          >
            <img
              src={images[0].value}
              alt=""
              className={cn("h-full absolute object-cover min-w-full")}
            />
          </div>
          <div className="flex flex-col flex-1 gap-0.5">
            {images.slice(1, 3).map((image) => (
              <div
                className="relative flex-1 h-full w-full overflow-hidden"
                key={image.value}
              >
                <img
                  src={image.value}
                  alt=""
                  className={cn("h-full absolute object-cover min-w-full")}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div
            className={cn("flex h-[290px] gap-px", {
              "h-full": images.length === 1,
              "h-[145px]": images.length === 4,
            })}
          >
            {images.slice(0, 2).map((image) => (
              <div
                className={cn("relative flex-1 h-full w-full overflow-hidden")}
                key={image.value}
              >
                <img
                  src={image.value}
                  alt=""
                  className={cn("h-full absolute object-cover min-w-full", {
                    static: images.length === 1,
                  })}
                />
              </div>
            ))}
          </div>
          <div className={cn("flex h-[145px] mt-px gap-px", {"h-0": images.length <= 2})}>
            {images.slice(2, 4).map((image) => (
              <div
                className="relative flex-1 h-full w-full overflow-hidden"
                key={image.value}
              >
                <img
                  src={image.value}
                  alt=""
                  className={cn("h-full absolute object-cover min-w-full", {
                    static: images.length === 1,
                  })}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TweetImagesViewer;
