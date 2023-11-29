import { MdOutlineVerified } from "react-icons/md";
import { CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { FollowService } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export enum FollowRelation {
  follower,
  following,
}
export type UsersListItemProp = {
  showDesc: boolean;
  itemType: FollowRelation;
  verified: boolean;
  profileImageUrl: string;
  name: string;
  username: string;
  description: string;
};
export function UsersListItem({
  profileImageUrl,
  name,
  username,
  verified,
  description,
  showDesc,
}: UsersListItemProp) {
  const [isHovered, setIsHovered] = useState(false);
  const {
    mutateAsync: FollowServiceFn,
    // isPending: FollowServicePending,
  } = useMutation({
    mutationFn: FollowService,
  });
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <CardContent className="hover:cursor-pointer py-3 hover:bg-light-gray">
      <div className="flex ">
        <img
          src={profileImageUrl}
          alt="profilePic"
          className="w-[40px] h-[40px] rounded-full mr-3"
        ></img>
        <div className="flex-col flex-1">
          <div className="flex justify-between ">
            <div className="flex-col">
              <div className="flex items-center">
                <span className="mr-1">{name}</span>
                {verified && <MdOutlineVerified className="text-blue-600" />}
              </div>
              <div className="text-[#595d62]">{username}</div>
            </div>
            <Button
              onClick={() => {
                FollowServiceFn(username);
              }}
              className="text-sm w-[100px] h-[30px] font-bold"
            >
              <span className="text-black">Follow</span>
            </Button>
            <Button
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="text-sm w-[100px] h-[30px] font-bold"
              variant={"danger"}
            >
              <span className="text-white">
                {isHovered ? "Unfollow" : "Following"}
              </span>
            </Button>
          </div>
          {showDesc && <div>{description}</div>}
        </div>
      </div>
    </CardContent>
  );
}
