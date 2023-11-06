import { PopUpContainer } from "../PopUpContainer/PopUpContainer";
import { HeaderButton } from "@/models/PopUpModel";
import { DialogHeader } from "../ui/dialog";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

type Props = {};

export const EditProfilePopUp = (props: Props) => {
  const [showEditProfile, setShowEditProfile] = useState<boolean>(true);

  const saveButton = <Button>Save</Button>;

  return (
    <PopUpContainer
      show={showEditProfile}
      headerButton={HeaderButton.close}
      className="overflow-auto p-0 h-[600px] items-start justify-start"
      headerClassName="justify-between"
      title="Edit profile"
      optionalHeader={saveButton}
    >
      {/* <DialogHeader className="px-4 h-[53px] flex flex-row items-center space-y-0">
        <div>
        <span className="w-[56px]">
          <div
            className="ml-[-8px] w-9 h-9 flex justify-center items-center rounded-3xl cursor-pointer hover:bg-dark-gray hover:border-dark-gray "
            onClick={() => {
              setShowEditProfile(false);
            }}
          >
            <ArrowLeft className="h-5 w-5 inline" />
          </div>
        </span>
        </div>
      </DialogHeader> */}
    </PopUpContainer>
  );
};
