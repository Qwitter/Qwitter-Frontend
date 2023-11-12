import { PopUpContainer } from "../PopUpContainer/PopUpContainer";
import { HeaderButton } from "@/models/PopUpModel";
import { useState } from "react";
import { Button } from "../ui/button";
import { ImagePicker } from "../ImagePicker/ImagePicker";
import { TextInput } from "../TextInput/TextInput";

export const EditProfilePopUp = () => {
  const [showEditProfile, setShowEditProfile] = useState<boolean>(true);

  const saveButton = <Button className="h-8">Save</Button>;

  return (
    <PopUpContainer
      show={showEditProfile}
      headerButton={HeaderButton.close}
      className="p-0 h-[600px] items-start justify-start overflow-auto"
      headerClassName="justify-between"
      title="Edit profile"
      optionalHeader={saveButton}
      headerFunction={() => {
        setShowEditProfile(false);
      }}
    >
      <div className="w-full h-[150px]">
        <ImagePicker
          className="w-full h-[193px] rounded-none border-none"
          imageClassName="rounded-none"
        />
      </div>
      <ImagePicker className="w-[115px] h-[115px] z-20  ml-[15px] border-black bg-black p-[1px]" />

      <div className="py-3 px-4 w-full">
        <TextInput placeHolder="Name" />
      </div>
      <div className="py-3 px-4 w-full">
        <TextInput placeHolder="Bio" />
      </div>
      <div className="py-3 px-4 w-full">
        <TextInput placeHolder="Location" />
      </div>
      <div className="py-3 px-4 w-full">
        <TextInput placeHolder="Website" />
      </div>
    </PopUpContainer>
  );
};
