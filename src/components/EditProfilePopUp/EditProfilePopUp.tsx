import { PopUpContainer } from "../PopUpContainer/PopUpContainer";
import { HeaderButton } from "@/models/PopUpModel";
import { useContext, useState } from "react";
import { Button } from "../ui/button";
import { ImagePicker } from "../ImagePicker/ImagePicker";
import { TextInput } from "../TextInput/TextInput";
import axios from "axios";
import { UserContext } from "@/contexts/UserContextProvider";
import { useForm } from "react-hook-form";
import BirthDayInput from "../BirthDayInput/BirthDayInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditUserSchema } from "@/models/User";
import { useToast } from "../ui/use-toast";
import { DiscardProfileChanges } from "./DiscardProfileChanges";
import { uploadProfileImage } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

type EditProfileProps = {
  onSave?: () => void;
  onClose?: () => void;
};

/*
NEEDED:
  set values in the context
  may move functionality to utils (ask seif)
*/

export const EditProfilePopUp = ({ onSave, onClose }: EditProfileProps) => {
  const [showEditProfile, setShowEditProfile] = useState<boolean>(true);
  const [profileImage, setProfileImage] = useState<File>();
  const [profileBanner, setProfileBanner] = useState<File>();
  const [showDiscardChanges, setShowDiscardChanges] = useState<boolean>(false);
  const { user, token } = useContext(UserContext); // token will be used for authorization
  const { toast } = useToast();
  const navigate = useNavigate();

  const contextBirthDate = new Date(user?.birthDate!);
  const birthDay = contextBirthDate.getDate();
  const birthMonth = contextBirthDate.toLocaleString("default", {
    month: "long",
  });
  const birthYear = contextBirthDate.getFullYear();

  const form = useForm<any>({
    resolver: zodResolver(EditUserSchema),
    defaultValues: {
      name: user?.name,
      bio: user?.bio,
      location: user?.location,
      website: user?.website,
      day: birthDay,
      month: birthMonth,
      year: birthYear,
    },
  });

  const isChanged = (): boolean => {
    return !(
      form.getValues().name == user?.name &&
      form.getValues().bio == user?.bio &&
      form.getValues().location == user?.location &&
      form.getValues().website == user?.website &&
      form.getValues().birthDate == user?.birthDate
    );
  };

  const handleDiscardChanges = (): void => {
    if (isChanged()) {
      setShowDiscardChanges(true);
      return;
    }
    handleClose();
  };

  const handleClose = (): void => {
    setShowEditProfile(false);
    if (onClose) onClose();
    navigate(-1);
  };

  // NEEDED: handle loading state
  const handleSave = async (): Promise<void> => {
    // check for errors first
    await form.trigger();
    if (Object.keys(form.formState.errors).length > 0) {
      if (form.formState.errors.website) {
        toast({
          variant: "secondary",
          title: "Account Update Failed",
          description: form.formState.errors.website?.message?.toString(),
        });
      }
      return;
    }

    if (profileImage) {
      await uploadProfileImage(profileImage, token!);
    }

    if (profileBanner) {
      await uploadProfileImage(profileBanner, token!, true);
    }

    // code here may go to utils <---------------------------------------------------------------------------

    if (!isChanged()) {
      if (onSave) onSave();
      handleClose();
      return;
    }

    const birthDate = new Date(
      `${form.getValues().year.toString()}-${form.getValues().month}-${form
        .getValues()
        .day.toString()}`
    );
    const birthDateISO = birthDate.toISOString();

    try {
      await axios.put(
        `${VITE_BACKEND_URL}/api/v1/user/profile`,
        {
          name: form.getValues().name,
          description: form.getValues().bio,
          Location: form.getValues().location,
          url: form.getValues().website,
          birth_date: birthDateISO,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "object",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
      return;
    }

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
      className="p-0 max-h-[full] h-full sm:h-[600px] w-full items-start justify-start overflow-auto"
      headerClassName="justify-between"
      title="Edit profile"
      optionalHeader={saveButton}
      headerFunction={handleDiscardChanges}
    >
      <DiscardProfileChanges
        showDiscardChanges={showDiscardChanges}
        setShowDiscardChanges={setShowDiscardChanges}
        handleClose={handleClose}
      />

      <div className="w-full h-[150px]">
        <ImagePicker
          // Banner
          name="photo"
          setImagePath={setProfileBanner}
          image={user?.profileBannerUrl}
          className="w-full h-[193px] rounded-none border-none"
          imageClassName="rounded-none"
        />
      </div>
      <ImagePicker
        // Profile
        name="photo"
        setImagePath={setProfileImage}
        image={user?.profileImageUrl}
        className="w-[115px] h-[115px] z-20  ml-[15px] border-black bg-black p-[1px]"
        imageClassName="w-[110px] h-[110px]"
      />

      <div className="px-4 w-full">
        <TextInput
          // Name
          {...form.register("name", {})}
          placeHolder="Name"
          errorMessage={form.formState.errors.name?.message?.toString()}
        />
      </div>
      <div className="px-4 w-full">
        <TextInput
          // Bio
          {...form.register("bio", {})}
          placeHolder="Bio"
          errorMessage={form.formState.errors.bio?.message?.toString()}
        />
      </div>
      <div className="px-4 w-full">
        <TextInput
          // Location
          {...form.register("location", {})}
          placeHolder="Location"
        />
      </div>
      <div className="px-4 w-full">
        <TextInput
          // Website
          {...form.register("website", {})}
          placeHolder="Website"
        />
      </div>
      <div className="p-4 w-full">
        <span className="text-gray text-[17px]">Birth date</span>
        <div className="text-[20px]">
          {`${birthMonth} ${birthDay}, ${birthYear}`}
          <BirthDayInput form={form} className="py-3" />
        </div>
      </div>
    </PopUpContainer>
  );
};
