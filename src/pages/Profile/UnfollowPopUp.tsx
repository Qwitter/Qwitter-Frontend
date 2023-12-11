import { Button, PopUpContainer } from "@/components";
import { UserContext } from "@/contexts/UserContextProvider";
import { unfollow } from "@/lib/utils";
import { HeaderButton } from "@/models/PopUpModel";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

type UnfollowPopUpProps = {
  username: string;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

/*
TODO: fix height
*/

export const UnfollowPopUp = ({
  username,
  show,
  setShow,
}: UnfollowPopUpProps) => {
  const { token } = useContext(UserContext);

  const callUnfollow = useMutation({
    mutationFn: () => {
      return unfollow(username, token!);
    },
  });
  const handleUnfollow = () => {
    callUnfollow.mutate();
    handleClose();
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <PopUpContainer
      show={show}
      headerButton={HeaderButton.none}
      className="p-8 h-[260px] sm:w-[320px] sm:h-[260px] justify-between"
      isCompact={true}
      dialogClassName="w-[320px] max-w-[80vw] h-[260px]"
    >
      <div>
        <h3 className="mb-2 leading-6 text-xl font-bold">
          Unfollow @{username}
        </h3>
        <p className="text-[15px] leading-5 text-gray">
          Their posts will no longer show up in your For You timeline. You can
          still view their profile, unless their posts are protected.
        </p>
      </div>
      <div className="w-full">
        <Button onClick={handleUnfollow} size="full" className="mb-3 h-[44px]">
          Unfollow
        </Button>
        <Button
          variant="outline"
          onClick={handleClose}
          size="full"
          className="h-[44px]"
        >
          Cancel
        </Button>
      </div>
    </PopUpContainer>
  );
};
