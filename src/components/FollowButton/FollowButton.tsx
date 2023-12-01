import { useState } from "react";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { FollowService, UnFollowService } from "@/lib/utils";
import { FollowRelation } from "../../models/FollowRelation";
import { WarningPopUp } from "../WarningPopUp/WarningPopUp";
import { FollowButtonProp } from "./FollowButtonProp";


export function FollowButton({ username, FollowState }: FollowButtonProp) {
  const [isHovered, setIsHovered] = useState(false);
  const [state, setstate] = useState(FollowState);
  const [showDialog, setshowDialog] = useState(false);
  const {
    mutateAsync: FollowServiceFn,
    // isPending: FollowServicePending,
  } = useMutation({
    mutationFn: FollowService,
  });
  const {
    mutateAsync: unFollowServiceFn,
    // isPending: FollowServicePending,
  } = useMutation({
    mutationFn: UnFollowService,
  });
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleFollowButton = () => {
    FollowServiceFn(username);
    setstate(FollowRelation.following);
  };
  const handleunFollowButton = () => {
    setshowDialog(true);
  };
  const confirmUnFollowButton = () => {
    unFollowServiceFn(username);
    setstate(FollowRelation.notfollowing);
    setshowDialog(false);
  };
  return (
    <>
      {state === FollowRelation.notfollowing && (
        <Button
          onClick={handleFollowButton}
          className="text-sm w-[100px] h-[30px] font-bold"
        >
          <span className="text-black">Follow</span>
        </Button>
      )}
      {state === FollowRelation.following && (
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
