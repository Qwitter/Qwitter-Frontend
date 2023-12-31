import { useState, useContext } from "react";
import { ImagePicker } from "../ImagePicker/ImagePicker";
import { Button } from "../ui/button";
import { uploadProfileImage } from "@/lib/utils";
import { UserContext } from "@/contexts/UserContextProvider";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../ui/use-toast";
import { LoadingOverlay } from "../LoadingOverlay/LoadingOverlay";

type SignUpProfileProps = {
  nextStep: () => void;
};

export const SignUpProfile = ({ nextStep }: SignUpProfileProps) => {
  const [imagePath, setImagePath] = useState<File>();
  const [buttonText, setButtonText] = useState<string>("Skip for now");
  const { token } = useContext(UserContext);
  const { toast } = useToast();
  const [isRemovable, setIsRemovable] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationKey: ["signupProfile"],
    mutationFn: uploadProfileImage,
    onSuccess: nextStep,
    onError: () => {
      toast({
        variant: "secondary",
        title: "Request Error",
        description: "couldn't upload image",
      });
    },
  });

  // upload the last chosen image and add animation while loading
  const handleImageUpload = async () => {
    if (imagePath) {
      mutate({ picFile: imagePath, token: token! });
      return;
    }
    nextStep();
  };

  const handleChange = () => {
    setButtonText("Next");
    setIsRemovable(true);
  };

  const handleDelete = () => {
    setImagePath(undefined);
    setButtonText("Skip for now");
    setIsRemovable(false);
  };

  return (
    <>
      <div className="flex flex-col justify-between h-full w-full sm:w-[424px]">
        <div className="w-full flex flex-col justify-start items-start">
          <div className="my-5">
            <h2 className="text-3xl font-bold">Pick a profile picture</h2>
            <h5 className="text-gray text-[15px] mt-2">
              Have a favorite selfie? Upload it now.
            </h5>
          </div>
          <div className="w-full h-[320px] flex justify-center items-center">
            <ImagePicker
              name="photo"
              image="https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
              setImagePath={setImagePath}
              optionalOnChange={handleChange}
              isRemovable={isRemovable}
              onDelete={handleDelete}
              hasDefault
            />
          </div>
        </div>
        <Button
          variant={(buttonText === "Next" && "default") || "outline"}
          size="full"
          className="h-[50px] font-bold mb-1 mt-auto"
          onClick={handleImageUpload}
          data-testid="skipForNow"
        >
          {buttonText}
        </Button>
      </div>
      <LoadingOverlay show={isPending} />
    </>
  );
};
