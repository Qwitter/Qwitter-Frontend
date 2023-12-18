/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { MdOutlineVerified } from "react-icons/md";
import { CardContent } from "../ui/card";
import { FollowButton } from "../FollowButton/FollowButton";
import { UsersListItemProp } from "./UsersListItemProp";
import { BlockButton } from "../BlockButton/BlockButton";
import { MuteButton } from "../MuteButton/MuteButton";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContextProvider";

export function UsersListItem({
  profileImageUrl,
  name,
  username,
  verified,
  description,
  showDesc,
  isFollowing,
  listType,
}: UsersListItemProp) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  return (
    <CardContent
      onClick={() => {
        navigate("/Profile/" + username);
      }}
      className="hover:cursor-pointer py-3 hover:bg-light-gray"
      data-testid="userToFollow"
    >
      <div className="flex">
        <img
          src={profileImageUrl}
          alt="profilePic"
          className="w-[40px] h-[40px] rounded-full mr-3"
        ></img>
        <div className="flex-col flex-1 ">
          <div className="flex justify-between ">
            <div className="flex-col ">
              <div className="flex items-center ">
                <span className="mr-1">{name}</span>
                {verified && <MdOutlineVerified className="text-blue-600" />}
              </div>
              <div className="text-[#595d62]">@{username}</div>
            </div>

            {listType == "FollowList" && user?.userName! != username && (
              <FollowButton isFollowing={isFollowing} username={username} />
            )}
            {listType == "BlockList" && user?.userName! != username && (
              <BlockButton username={username} />
            )}
            {listType == "MuteList" && user?.userName! != username && (
              <MuteButton username={username} />
            )}
          </div>
          {showDesc && <div>{description}</div>}
        </div>
      </div>
    </CardContent>
  );
}
