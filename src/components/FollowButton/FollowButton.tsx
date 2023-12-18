import { useContext, useState } from "react";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { FollowService, UnFollowService, cn } from "@/lib/utils";
import { WarningPopUp } from "../WarningPopUp/WarningPopUp";
import { FollowButtonProp } from "./FollowButtonProp";
import { UserContext } from "@/contexts/UserContextProvider";

export function FollowButton({
  username,
  isFollowing,
  className,
  onClick,
}: FollowButtonProp) {
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
  const handleFollowButton = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    await FollowServiceFn(username);
    setstate(true);
    onClick && onClick();
  };
  const handleunFollowButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setshowDialog(true);
    onClick && onClick();
  };
  const confirmUnFollowButton = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    await unFollowServiceFn(username);
    setstate(false);
    setshowDialog(false);
    onClick && onClick();
  };
  return (
    <>
      {state === false && (
        <Button
          data-testid="followUnfollow"
          onClick={handleFollowButton}
          className={cn("text-sm w-[100px] h-[30px] font-bold", className)}
        >
          <span className="text-black">Follow</span>
        </Button>
      )}
      {state === true && (
        <Button
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleunFollowButton}
          className={cn("text-sm w-[100px] h-[30px] font-bold", className)}
          variant={"danger"}
          data-testid="followUnfollow"
        >
          <span className={cn("text-white", isHovered && "text-danger")}>
            {isHovered ? "Unfollow" : "Following"}
          </span>
        </Button>
      )}
      <WarningPopUp
        headerFunction={() => {
          setshowDialog(false);
        }}
        data-testid="UnfollowPopUp"
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
