import { cn } from "@/lib";
import { deleteProfileImage } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { Camera, X } from "lucide-react";
import { useRef, useState } from "react";
import { useToast } from "../ui/use-toast";

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
}

export const ImagePicker = ({
  optionalOnChange,
  setImagePath,
  iconSize = "24",
  imageClassName,
  className,
  image,
  isRemovable,
  isBanner = false,
  alt = "Uploaded Image",
}: ImagePickerProps) => {
  const token = localStorage.getItem("token");
  const [displayImage, setDisplayImage] = useState<string | undefined>(image);
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const { toast } = useToast();

  const handleIconClick = () => {
    if (inputFileRef.current) inputFileRef.current.click();
  };

  // reads the local file of the user and display it
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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

  const { mutate } = useMutation({
    mutationKey: ["deleteImage", isBanner],
    mutationFn: () => deleteProfileImage(isBanner, token!),
    onSuccess: () => {
      setDisplayImage(undefined);
    },
    onError: () => {
      toast({
        variant: "secondary",
        title: "Request error",
        description: "Error deleting image",
      });
    },
  });

  // deletes the image from the database
  const handleImageDelete = async () => {
    mutate();
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
            />
          </div>
          {isRemovable && (
            <div className="ml-5 rounded-full p-2 bg-gray/80 hover:bg-gray/70 cursor-pointer">
              <X onClick={handleImageDelete} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
