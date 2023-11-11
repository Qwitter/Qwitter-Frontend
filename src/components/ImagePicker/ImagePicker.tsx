import { UserContext } from "@/contexts/UserContextProvider";
import { cn } from "@/lib";
import { uploadImage } from "@/lib/utils";
import { Camera } from "lucide-react";
import { useContext, useRef, useState } from "react";

interface ImagePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  defaultImage?: string;
  alt?: string;
  imageClassName?: string;
  iconSize?: string;
  isBanner?: boolean;
  optionalOnChange?: () => void;
  setPicChanged?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ImagePicker = ({
  optionalOnChange,
  setPicChanged,
  id,
  iconSize = "24",
  imageClassName,
  className,
  // isBanner = false,
  defaultImage = "https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
  alt = "Upladed Image",
}: ImagePickerProps) => {
  const [profilePic, setProfilePic] = useState<
    string | ArrayBuffer | null | undefined
  >(defaultImage);
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const { token } = useContext(UserContext);

  const handleImageSubmit = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    const newPicPath = event.target.files?.[0];

    if (newPicPath) {
      const userData = await uploadImage(newPicPath, token!);
      setProfilePic(`http://${userData.profileImageUrl}`);
    }

    if (optionalOnChange) optionalOnChange();
  };

  const handleIconClick = () => {
    if (inputFileRef.current) inputFileRef.current.click();
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newPicPath = event.target.files?.[0];

    if (newPicPath) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePic(e.target?.result);
      };

      reader.readAsDataURL(newPicPath);
      if (setPicChanged) setPicChanged(true);
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
        src={profilePic?.toString()}
        alt={alt}
      />
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-2 bg-gray/80 hover:bg-gray/70 cursor-pointer">
        <Camera onClick={handleIconClick} size={iconSize} />
        <form
          encType="multipart/form-data"
          // id={id}
          // onSubmit={handleImageSubmit}
        >
          <input
            ref={inputFileRef}
            onChange={handleImageSubmit}
            className="hidden"
            type="file"
            accept="images/*"
            name="photo"
            alt="Upload Image"
          />
        </form>
      </div>
    </div>
  );
};
