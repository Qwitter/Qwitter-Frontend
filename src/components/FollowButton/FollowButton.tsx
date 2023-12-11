import { useContext, useState } from "react";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { FollowService, UnFollowService } from "@/lib/utils";
import { WarningPopUp } from "../WarningPopUp/WarningPopUp";
import { FollowButtonProp } from "./FollowButtonProp";
import { UserContext } from "@/contexts/UserContextProvider";

export function FollowButton({ username, isFollowing }: FollowButtonProp) {
  const [isHovered, setIsHovered] = useState(false);
  const [state, setstate] = useState(isFollowing);
  const [showDialog, setshowDialog] = useState(false);
  const { token } = useContext(UserContext);
  const { mutateAsync: FollowServiceFn } = useMutation({
    mutationFn: token
      ? (username: string) => FollowService(username, token)
      : undefined,
  });
  const { mutateAsync: unFollowServiceFn } = useMutation({
    mutationFn: token
      ? (username: string) => UnFollowService(username, token)
      : undefined,
  });
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleFollowButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    FollowServiceFn(username);
    setstate(true);
  };
  const handleunFollowButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setshowDialog(true);
  };
  const confirmUnFollowButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    unFollowServiceFn(username);
    setstate(false);
    setshowDialog(false);
  };
  return (
    <>
      {state === false && (
        <Button
          onClick={handleFollowButton}
          className="text-sm w-[100px] h-[30px] font-bold"
        >
          <span className="text-black">Follow</span>
        </Button>
      )}
      {state === true && (
        <Button
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleunFollowButton}
          className="text-sm w-[100px] h-[30px] font-bold"
          variant={"danger"}
        >
          <span className="text-white">
            {isHovered ? "Unfollow" : "Following"}
          </span>
        </Button>
      )}
      <WarningPopUp
        headerFunction={() => {
          setshowDialog(false);
        }}
        UserAction="Unfollow"
        username={username}
        PopUpshow={showDialog}
        ButtonVariant={"default"}
        ButtonFunc={confirmUnFollowButton}
        desc="Their posts will no longer show up in your For You timeline. You can
            still view their profile, unless their posts are protected."
      />
    </>
  );
}
