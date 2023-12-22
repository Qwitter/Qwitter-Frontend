import { cn } from "@/lib";
import { Camera, X } from "lucide-react";
import { useRef, useState } from "react";

interface ImagePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  alt?: string;
  imageClassName?: string;
  iconSize?: string;
  optionalOnChange?: () => void;
  name: string;
  image?: string;
  setImagePath: React.Dispatch<React.SetStateAction<File | undefined>>;
  isRemovable?: boolean;
  isBanner?: boolean;
  setIsDeleted?: React.Dispatch<React.SetStateAction<boolean>>;
  onDelete?: () => void;
  hasDefault?: boolean;
}

export const ImagePicker = ({
  optionalOnChange,
  setImagePath,
  iconSize = "24",
  imageClassName,
  className,
  image,
  isRemovable,
  setIsDeleted,
  onDelete,
  hasDefault,
  alt = "Uploaded Image",
}: ImagePickerProps) => {
  const [displayImage, setDisplayImage] = useState<string | undefined>(image);
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [randKey, setRandKey] = useState(new Date());

  const handleIconClick = () => {
    if (inputFileRef.current) inputFileRef.current.click();
  };

  // reads the local file of the user and display it
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsDeleted && setIsDeleted(false);

    const newPicPath = event.target.files?.[0];

    if (newPicPath) {
      setImagePath(newPicPath);
      const reader = new FileReader();

      reader.onload = (e) => {
        setDisplayImage(e.target?.result?.toString()!);
      };

      reader.readAsDataURL(newPicPath);

      if (optionalOnChange) optionalOnChange();
    }
  };

  // deletes the image from the database
  const handleImageDelete = async () => {
    if (hasDefault) setDisplayImage(image);
    else setDisplayImage(undefined);
    setRandKey(new Date());
    setIsDeleted && setIsDeleted(true);
    onDelete && onDelete();
  };

  return (
    <div
      className={cn(
        "relative rounded-full border-primary border-2 w-[192.2px] h-[192.2px] p-[2px]",
        displayImage && "bg-[#333639]",
        className
      )}
    >
      <div
        className={cn(
          "rounded-full w-full h-full bg-[#333639]",
          imageClassName
        )}
      >
        {displayImage && (
          <img
            className={cn("rounded-full w-full h-full", imageClassName)}
            src={displayImage}
            alt={alt}
          />
        )}
      </div>
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex">
          <div className="rounded-full p-2 bg-gray/80 hover:bg-gray/70 cursor-pointer">
            <Camera onClick={handleIconClick} size={iconSize} />
            <input
              ref={inputFileRef}
              onChange={handleImageChange}
              className="hidden"
              type="file"
              accept="images/*"
              name="photo"
              alt="Upload Image"
              data-testid="imageBtn"
              key={randKey.toString()}
            />
          </div>
          {isRemovable && (
            <div
              className="ml-5 rounded-full p-2 bg-gray/80 hover:bg-gray/70 cursor-pointer"
              data-testid="removePic"
            >
              <X onClick={handleImageDelete} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
