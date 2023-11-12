import { cn } from "@/lib";
import { Camera } from "lucide-react";
import { useRef, useState } from "react";

interface ImagePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  alt?: string;
  imageClassName?: string;
  iconSize?: string;
  optionalOnChange?: () => void;
  name: string;
  image?: string;
  setImagePath: React.Dispatch<React.SetStateAction<File | undefined>>;
}

/*
NEEDED:
  this component will only read the image and display it and show when it's loading
  while reading the image display a loading icon
  when loading is finished use the setImage to send the image to the parent

  2- add x button and it's functionality (will need a state)
  3- add loading animation
*/

export const ImagePicker = ({
  optionalOnChange,
  setImagePath,
  iconSize = "24",
  imageClassName,
  className,
  image = "https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
  alt = "Upladed Image",
}: ImagePickerProps) => {
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [displayImage, setDisplayImage] = useState<string>(image);
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const handleIconClick = () => {
    if (inputFileRef.current) inputFileRef.current.click();
  };

  // reads the local file of the user and display it
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newPicPath = event.target.files?.[0];
    setIsloading(true);

    if (newPicPath) {
      setImagePath(newPicPath);
      const reader = new FileReader();

      reader.onload = (e) => {
        setDisplayImage(e.target?.result?.toString() || image);
        setIsloading(false);
      };

      reader.readAsDataURL(newPicPath);

      if (optionalOnChange) optionalOnChange();
    }
  };

  return (
    <div
      className={cn(
        "relative rounded-full border-primary border-2 w-[192.2px] h-[192.2px] p-[2px]",
        className
      )}
    >
      <img
        className={cn("rounded-full w-full h-full", imageClassName)}
        src={displayImage}
        alt={alt}
      />
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-2 bg-gray/80 hover:bg-gray/70 cursor-pointer">
        <Camera onClick={handleIconClick} size={iconSize} />
        <input
          ref={inputFileRef}
          onChange={handleImageChange}
          className="hidden"
          type="file"
          accept="images/*"
          name="photo"
          alt="Upload Image"
        />
      </div>
    </div>
  );
};
