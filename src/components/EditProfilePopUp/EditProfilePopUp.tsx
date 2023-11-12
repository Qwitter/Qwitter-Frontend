import { PopUpContainer } from "../PopUpContainer/PopUpContainer";
import { HeaderButton } from "@/models/PopUpModel";
import { useContext, useState } from "react";
import { Button } from "../ui/button";
import { ImagePicker } from "../ImagePicker/ImagePicker";
import { TextInput } from "../TextInput/TextInput";
import axios from "axios";
import { UserContext } from "@/contexts/UserContextProvider";
import { useForm } from "react-hook-form";

type EditProfileProps = {
  onSave?: () => void;
  onClose?: () => void;
};

/*
NEEDED:
  will this popup take user data from the parent or the context
*/

export const EditProfilePopUp = ({ onSave, onClose }: EditProfileProps) => {
  const [showEditProfile, setShowEditProfile] = useState<boolean>(true);
  const [profileImage, setProfileImage] = useState<File>();
  const [profileBanner, setProfileBanner] = useState<File>();
  const { user, token } = useContext(UserContext); // token will be used for authorization
  const form = useForm();

  const handleClose = () => {
    console.log("called: handleClose");
    setShowEditProfile(false);

    if (onClose) onClose();
  };

  const handleSave = () => {
    // code here may go to utils
    // endpoints may change in the future
    console.log("called: handleSave");

    if (profileImage) {
      // send request to update the profile and update the context
    }

    if (profileBanner) {
      // send request to update the banner and update the context
    }

    if (
      user?.name != form.getValues().name ||
      user?.location != form.getValues().location
      // || user?.bio != form.getValues().bio ||   NEEDED: not in context now
      // user?.website != form.getValues().website    NEEDED: not in context now
    ) {
      // send put request to update user data and update the context
    }

    // may need more rethinking
    if (onSave) onSave();
    handleClose();
  };

  const saveButton = (
    <Button onClick={handleSave} className="h-8">
      Save
    </Button>
  );

  return (
    <PopUpContainer
      show={showEditProfile}
      headerButton={HeaderButton.close}
      className="p-0 h-[600px] items-start justify-start overflow-auto"
      headerClassName="justify-between"
      title="Edit profile"
      optionalHeader={saveButton}
      headerFunction={handleClose}
    >
      <div className="w-full h-[150px]">
        <ImagePicker
          //banner
          name="photo"
          setImagePath={setProfileBanner}
          // image={user.profileBannerUrl}    NEEDED: banner isn't in the context
          className="w-full h-[193px] rounded-none border-none"
          imageClassName="rounded-none"
        />
      </div>
      <ImagePicker
        // profile
        name="photo"
        setImagePath={setProfileImage}
        image={user?.profileImageUrl}
        className="w-[115px] h-[115px] z-20  ml-[15px] border-black bg-black p-[1px]"
      />
      <form onSubmit={form.handleSubmit(handleSave)}></form>

      <div className="py-3 px-4 w-full">
        <TextInput
          {...form.register("name", {
            value: user?.name,
          })}
          placeHolder="Name"
        />
      </div>
      <div className="py-3 px-4 w-full">
        <TextInput
          {...form.register("bio", {
            // value: user.bio    NEEDED: user bio isn't in the context
          })}
          placeHolder="Bio"
        />
      </div>
      <div className="py-3 px-4 w-full">
        <TextInput
          {...form.register("location", {
            value: user?.location,
          })}
          placeHolder="Location"
        />
      </div>
      <div className="py-3 px-4 w-full">
        <TextInput
          {...form.register("website", {
            // value: user.website    NEEDED: website isn't in the context
          })}
          placeHolder="Website"
        />
      </div>
    </PopUpContainer>
  );
};
