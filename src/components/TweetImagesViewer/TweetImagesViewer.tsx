import { cn } from "@/lib";
import { Tweet } from "@/models/Tweet";
import { HiOutlineXMark } from "react-icons/hi2";
import { Link, useLocation } from "react-router-dom";

type TweetImagesViewerOnly = {
  mode?: "view-only";
  images: Tweet["entities"]["media"];
  removeAttachment?: (index: number) => void;
  screen?: "tweet" | "message";
  viewImage?: boolean;

};

type TweetImagesEditor = {
  mode?: "edit";
  images: Tweet["entities"]["media"];
  removeAttachment: (index: number) => void;
  screen: "tweet" | "message";
  viewImage?: boolean;
};

type TweetImagesViewerProps = TweetImagesEditor | TweetImagesViewerOnly;

const TweetImagesViewer = ({
  images,
  mode = "view-only",
  screen = "tweet",
  removeAttachment,
  viewImage
}: TweetImagesViewerProps) => {
  const location = useLocation();
  return (
    <div
      className={cn("mt-4 rounded-xl overflow-hidden w-full", {
        "max-h-[290px] pb-[290px] h-full": images.length > 1,
        "max-h-[298px]": mode === "edit" && images.length === 4,
        "h-[200px] max-w-[400px]": screen === "message",
        "hidden mt-0": !images || images.length === 0,
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
            {viewImage ?
              <Link
                to={"/flow/photo"}
                state={{ previousLocation: location, photo: images[0].value }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={images[0].value}
                  alt=""
                  className={cn("h-full absolute object-cover min-w-full cursor-pointer", {
                    "rounded-xl": mode === "edit",
                  })}
                />
              </Link> :
              <img
                src={images[0].value}
                alt=""
                className={cn("h-full absolute object-cover min-w-full ", {
                  "rounded-xl": mode === "edit",
                })}
              />
            }
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
                {viewImage ?
                  <Link
                    to={"/flow/photo"}
                    state={{ previousLocation: location, photo: image.value }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img
                      src={image.value}
                      alt=""
                      className={cn("h-full absolute object-cover min-w-full cursor-pointer", {
                        "rounded-xl": mode === "edit",
                      })}
                    />
                  </Link> :
                  <img
                    src={image.value}
                    alt=""
                    className={cn("h-full absolute object-cover min-w-full", {
                      "rounded-xl": mode === "edit",
                    })}
                  />
                }
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
              <div data-testid="messageMedia"
                className={cn("relative flex-1 h-full w-full overflow-hidden")}
                key={image.value}
              >
                {viewImage ?
                  <Link
                    to={"/flow/photo"}
                    state={{ previousLocation: location, photo: image.value }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img
                      src={image.value}
                      alt=""
                      className={cn("h-full absolute object-cover min-w-full cursor-pointer", {
                        static: images.length === 1,
                        "rounded-xl": mode === "edit",
                      })}
                    />
                  </Link> :
                  <img
                    src={image.value}
                    alt=""
                    className={cn("h-full absolute object-cover min-w-full", {
                      static: images.length === 1,
                      "rounded-xl": mode === "edit",
                    })}
                  />
                }

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
                {viewImage ?
                  <Link
                    to={"/flow/photo"}
                    state={{ previousLocation: location, photo: image.value }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img
                      src={image.value}
                      alt=""
                      className={cn("h-full absolute object-cover min-w-full cursor-pointer", {
                        static: images.length === 1,
                        "rounded-xl": mode === "edit",
                      })}
                    />
                  </Link> :
                  <img
                    src={image.value}
                    alt=""
                    className={cn("h-full absolute object-cover min-w-full", {
                      static: images.length === 1,
                      "rounded-xl": mode === "edit",
                    })}
                  />
                }
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
