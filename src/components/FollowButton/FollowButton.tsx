import { useState } from "react";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { FollowService, UnFollowService } from "@/lib/utils";
import { FollowRelation } from "../../models/FollowRelation";
import { PopUpContainer } from "../PopUpContainer/PopUpContainer";

export type FollowButtonProp = {
  FollowState: FollowRelation;
  username: string;
};
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
    closeDialog();
  };
  const closeDialog = () => {
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
      <PopUpContainer
        className="flex flex-col justify-center h-[325px] w-[325px]"
        show={showDialog}
        headerFunction={closeDialog}
      >
        <div className=" w-[250px]">
          <h1 className="mt-4 font-bold text-xl">Unfollow</h1>
          <h1 className="font-bold text-xl">@{username}</h1>
          <div className="mt-2 text-[#505457]">
            Their posts will no longer show up in your For You timeline. You can
            still view their profile, unless their posts are protected.
          </div>
          <Button
            onClick={confirmUnFollowButton}
            className="mt-4 w-full h-[45px] font-bold"
          >
            <span className="text-black">unfollow</span>
          </Button>
          <Button
            variant={"outline"}
            onClick={closeDialog}
            className="mt-4 w-full h-[45px] font-bold"
          >
            <span className="text-white">cancel</span>
          </Button>
        </div>
      </PopUpContainer>
    </>
  );
}
