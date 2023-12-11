import { MdOutlineVerified } from "react-icons/md";
import { CardContent } from "../ui/card";
import { FollowButton } from "../FollowButton/FollowButton";
import { UsersListItemProp } from "./UsersListItemProp";
import { BlockButton } from "../BlockButton/BlockButton";
import { MuteButton } from "../MuteButton/MuteButton";
import { useNavigate } from "react-router-dom";

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
  return (
    <CardContent
      onClick={() => {
        navigate("/" + username);
      }}
      className="hover:cursor-pointer py-3 hover:bg-light-gray"
    >
      <div className="flex">
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
              <div className="text-[#595d62]">@{username}</div>
            </div>

            {listType == "FollowList" && (
              <FollowButton isFollowing={isFollowing} username={username} />
            )}
            {listType == "BlockList" && <BlockButton username={username} />}
            {listType == "MuteList" && <MuteButton username={username} />}
          </div>
          {showDesc && <div>{description}</div>}
        </div>
      </div>
    </CardContent>
  );
}
