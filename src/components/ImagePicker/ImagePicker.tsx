import { cn } from "@/lib";
import { Camera } from "lucide-react";
import { useRef, useState } from "react";

interface ImagePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  defaultImage?: string;
  alt?: string;
  imageClassName?: string;
  iconSize?: string;
  optionalOnChange?: Function;
}

export const ImagePicker = ({
  optionalOnChange,
  iconSize = "24",
  imageClassName,
  className,
  defaultImage = "",
  alt = "Upladed Image",
  ...props
}: ImagePickerProps) => {
  const [profilePic, setProfilePic] = useState<
    string | ArrayBuffer | null | undefined
  >(
    "https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
  );
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPicPath = event.target.files?.[0];

    if (newPicPath) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePic(e.target?.result);
      };

      // NEEDED: send image to backend and get the url then use setProfilePic
      reader.readAsDataURL(newPicPath);
    }

    if (optionalOnChange) optionalOnChange();
  };

  const handleIconClick = () => {
    if (inputFileRef.current) inputFileRef.current.click();
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
        src={profilePic?.toString()}
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
          alt="Upload Image"
        />
      </div>
    </div>
  );
};
