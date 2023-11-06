import { FieldValues, useForm } from "react-hook-form";
import { ImagePicker } from "../ImagePicker/ImagePicker";
import { PopUpContainer } from "../PopUpContainer/PopUpContainer";
import { Button } from "../ui/button";
import { useRef } from "react";

export const SignUpProfile = () => {
  const formRef = useRef();

  const form = useForm();

  const onSubmit = (data: FieldValues) => {
    // NEEDED: send photo to backend
  };

  return (
    <PopUpContainer show={true} showLogo={true} className="justify-between">
      <div className="w-full flex flex-col justify-start items-start">
        <div className="my-5">
          <h2 className="text-3xl font-bold">Pick a profile picture</h2>
          <h5 className="text-gray text-[15px] mt-2">
            Have a favorite selfie? Upload it now.
          </h5>
        </div>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full h-[320px] flex justify-center items-center"
        >
          <ImagePicker
            {...form.register}
            defaultImage="https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
          />
        </form>
      </div>
      <Button variant="outline" size="full" className="h-[50px] font-bold my-1">
        Skip for now
      </Button>
    </PopUpContainer>
  );
};
