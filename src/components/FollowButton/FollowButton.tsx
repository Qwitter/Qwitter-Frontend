import { useState } from "react";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { FollowService, UnFollowService } from "@/lib/utils";
import { FollowRelation } from "../../models/FollowRelation";

export type FollowButtonProp = {
  FollowState: FollowRelation;
  username: string;
};
export function FollowButton({ username, FollowState }: FollowButtonProp) {
  const [isHovered, setIsHovered] = useState(false);
  const [state, setstate] = useState(FollowState);
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
  const unhandleFollowButton = () => {
    unFollowServiceFn(username);
    setstate(FollowRelation.notfollowing);
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
          onClick={unhandleFollowButton}
          className="text-sm w-[100px] h-[30px] font-bold"
          variant={"danger"}
        >
          <span className="text-white">
            {isHovered ? "Unfollow" : "Following"}
          </span>
        </Button>
      )}
    </>
  );
}
