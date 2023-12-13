import { PopUpContainer } from "../PopUpContainer/PopUpContainer";
import { HeaderButton } from "@/models/PopUpModel";
import { useContext, useState } from "react";
import { Button } from "../ui/button";
import { ImagePicker } from "../ImagePicker/ImagePicker";
import { TextInput } from "../TextInput/TextInput";
import { UserContext } from "@/contexts/UserContextProvider";
import { useForm } from "react-hook-form";
import BirthDayInput from "../BirthDayInput/BirthDayInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditUserSchema, User } from "@/models/User";
import { useToast } from "../ui/use-toast";
import { DiscardProfileChanges } from "./DiscardProfileChanges";
import { editUserProfile, uploadProfileImage } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

type EditProfileProps = {
  onSave?: () => void;
  onClose?: () => void;
};

export const EditProfilePopUp = ({ onSave, onClose }: EditProfileProps) => {
  const [showEditProfile, setShowEditProfile] = useState<boolean>(true);
  const [profileImage, setProfileImage] = useState<File>();
  const [profileBanner, setProfileBanner] = useState<File>();
  const [showDiscardChanges, setShowDiscardChanges] = useState<boolean>(false);
  const { user, token,setUser } = useContext(UserContext);
  const { toast } = useToast();
  const navigate = useNavigate();

  const contextBirthDate = new Date(user?user.birthDate:"");
  const birthDay = contextBirthDate.getDate();
  const birthMonth = contextBirthDate.toLocaleString("default", {
    month: "long",
  });
  const birthYear = contextBirthDate.getFullYear();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const form = useForm<any>({
    resolver: zodResolver(EditUserSchema),
    defaultValues: {
      name: user?.name,
      description: user?.description,
      location: user?.location,
      url: user?.url,
      day: birthDay.toString(),
      month: birthMonth.toString(),
      year: birthYear.toString(),
    },
  });

  const getFormDate = () => {
    return new Date(
      `${form.getValues().year.toString()}-${form.getValues().month}-${form
        .getValues()
        .day.toString()}`
    );
  };

  const isChanged = (): boolean => {
    const contextBD = new Date(user?.birthDate ?? "").toISOString();

    return !(
      form.getValues().name == user?.name &&
      form.getValues().description == user?.description &&
      form.getValues().location == user?.location &&
      form.getValues().url == user?.url &&
      getFormDate().toISOString() == contextBD
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

  const callEditUserData = useMutation<User>({
    mutationFn: (editedUserData:User) => {
      profileImage&& uploadProfileImage(profileImage!, token!)
      profileBanner&&uploadProfileImage(profileBanner!, token!, true)
      return editUserProfile(editedUserData, token!);
    },
    onSuccess:(editedUserData)=>{
      console.log(editedUserData)
      setUser({
        name: editedUserData.name,
        email: user?.email ?? "",
        birthDate: editedUserData.birthDate,
        userName: user?.userName ?? "",
        createdAt: user?.createdAt ?? "",
        location: editedUserData.location,
        description: editedUserData.description,
        url: editedUserData.url,
        passwordChangedAt: user?.passwordChangedAt ?? "",
        id: user?.id ?? "",
        google_id: user?.google_id ?? "",
        profileImageUrl: editedUserData.profileImageUrl,
        profileBannerUrl: `http://${editedUserData.profileBannerUrl}`,
        verified:editedUserData.verified??false,
        isFollowing:editedUserData.isFollowing??false,
      });
    },
    onError:()=>{
      console.log("error")
    }
  });


  const handleSave = async (): Promise<void> => {
    // check for errors first
    await form.trigger();
    if (Object.keys(form.formState.errors).length > 0) {
      if (form.formState.errors.url) {
        toast({
          variant: "secondary",
          title: "Account Update Failed",
          description: form.formState.errors.url?.message?.toString(),
        });
      }
      return;
    }

    if (!isChanged()) {
      if (onSave) onSave();
      handleClose();
      return;
    }

    const editedUserData = {
      name: form.getValues().name,
      description: form.getValues().description,
      Location: form.getValues().location,
      url: form.getValues().url,
      day: form.getValues().day,
      month: form.getValues().month.toString(),
      year: form.getValues().year.toString(),
      birthDate: getFormDate().toISOString(),
    };

    callEditUserData.mutate(editedUserData);

    //TODO: proceed when request is fulfilled
    //TODO: we can set the user with the response instead
  

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
          maxLength={50}
        />
      </div>
      <div className="px-4 w-full">
        <TextInput
          // Bio
          {...form.register("description", {})}
          placeHolder="Bio"
          errorMessage={form.formState.errors.description?.message?.toString()}
          maxLength={160}
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
          {...form.register("url", {})}
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

