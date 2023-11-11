import { UserContext } from "@/contexts/UserContextProvider";
import { cn } from "@/lib";
import { uploadImage } from "@/lib/utils";
import axios from "axios";
import { Camera } from "lucide-react";
import { useContext, useRef, useState } from "react";

interface ImagePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  defaultImage?: string;
  alt?: string;
  imageClassName?: string;
  iconSize?: string;
  isBanner?: boolean;
  optionalOnChange?: () => void;
}

export const ImagePicker = ({
  optionalOnChange,
  iconSize = "24",
  imageClassName,
  className,
  isBanner = false,
  defaultImage = "https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
  alt = "Upladed Image",
}: ImagePickerProps) => {
  const [profilePic, setProfilePic] = useState<string>(defaultImage);
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const { token } = useContext(UserContext);

  const handleImageSubmit = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log("submitted");

    event.preventDefault();
    const newPicPath = event.target.files?.[0];

    if (newPicPath) {
      const userDataUpdated = await uploadImage(newPicPath, token!);

      console.log(userDataUpdated);

      if (userDataUpdated !== null) {
        if (isBanner) {
          setProfilePic(userDataUpdated.profileBannerUrl);
        } else {
          console.log("changed pic", userDataUpdated.profileImageUrl);
          setProfilePic(userDataUpdated.profileImageUrl);
        }
      }
    }

    if (optionalOnChange) optionalOnChange();
  };

  const handleIconClick = () => {
    if (inputFileRef.current) inputFileRef.current.click();
  };

  const handleImageChange = () => {
    formRef.current?.submit();
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
        src={`http://${profilePic}`}
        alt={alt}
      />
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-2 bg-gray/80 hover:bg-gray/70 cursor-pointer">
        <Camera onClick={handleIconClick} size={iconSize} />
        <form
          encType="multipart/form-data"
          // onSubmit={handleImageSubmit}
          ref={formRef}
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
