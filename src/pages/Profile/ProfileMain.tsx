import { Button } from "@/components";
import { UserContext } from "@/contexts/UserContextProvider";
import { UserProfileData } from "@/models/User";
import { Cake, CalendarDays, MapPin } from "lucide-react";
import { useContext, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { FollowButton } from "@/components/FollowButton/FollowButton";
import { BlockButton } from "@/components/BlockButton/BlockButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

/*
TODO: options menu and message menu
TODO: may need to revalidate the cache after edit, follow and unfollow
*/

type ProfileMainProps = {
  user: UserProfileData | null;
};

export const ProfileMain = ({ user }: ProfileMainProps) => {
  const location = useLocation();
  const { username } = useParams();
  const { user: contextUser } = useContext(UserContext);

  const [buttonContent] = useState<string>(
    contextUser?.userName == username
      ? "Edit profile"
      : user?.isFollowing
      ? "Following"
      : "Follow"
  );

  const birthDate = user
    ? new Date(user.birthDate).toLocaleDateString("en-Us", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";
  const joinDate = user
    ? new Date(user.createdAt).toLocaleDateString("en-Us", {
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <div>
      <div className="w-full aspect-[3/1] max-h-[200px] bg-[#333639]">
        {user?.profileBannerUrl && (
          <Link
            to={`/${username}/header_photo`}
            state={{ bannerImg: user?.profileBannerUrl }}
            className="w-full"
          >
            <img
              src={`http://${user?.profileBannerUrl}`}
              alt="user banner image"
              className="w-full h-full"
            />
          </Link>
        )}
      </div>
      <div className="pt-3 px-4 mb-4">
        <div className="h-[69px] flex flex-row justify-between">
          {
            <Avatar className="rounded-full cursor-pointer mt-[-15%] mb-3 w-[20vw] h-auto aspect-square sm:w-[142px] bg-black p-0.5 sm:p-1 border-solid block">
              <Link
                to={`/${username}/photo`}
                state={{ profileImg: user?.profileImageUrl }}
                className="w-full h-full"
              >
                <AvatarImage
                  className="rounded-full"
                  src={`${user?.profileImageUrl}`}
                  alt="user profile image"
                />
              </Link>
              <AvatarFallback className="text-4xl">
                {user?.userName.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
          }

          {user != null && user.isBlocked ? (
            <BlockButton username={user.userName} />
          ) : (
            <>
              {contextUser?.userName == username ? (
                <Link
                  to="settings/profile"
                  state={{ previousLocation: location }}
                  className="h-[35px]"
                >
                  <Button variant="outline" className="h-full">
                    {buttonContent}
                  </Button>
                </Link>
              ) : (
                <FollowButton
                  isFollowing={user?.isFollowing!}
                  username={user?.userName!}
                />
              )}
            </>
          )}
        </div>

        {user == null ? ( //needs checking
          <div className="w-full mt-1 mb-3">
            <span className="text-xl leading-5 font-bold">@{username}</span>
          </div>
        ) : (
          <div>
            <div className="w-full flex flex-col mt-1 mb-3">
              <span className="text-xl leading-5 font-bold">{user?.name}</span>
              <span className="text-gray text-[15px] mt-1">
                @{user?.userName}
              </span>
            </div>
            <div className="mb-3">{user?.description}</div>
            <div className="flex flex-wrap leading-4 mb-3">
              {user?.location && (
                <span className="text-[15px] text-gray mr-3">
                  <MapPin size="1.1rem" className="inline mr-1 mb-1" />
                  {user.location}
                </span>
              )}

              {user?.birthDate && (
                <span className="text-[15px] text-gray mr-3">
                  <Cake size="1.1rem" className="inline mr-1 mb-1" />
                  Born {birthDate}
                </span>
              )}

              {user?.createdAt && (
                <span className="text-[15px] text-gray mr-3">
                  <CalendarDays size="1.1rem" className="inline mr-1 mb-1" />
                  Joined {joinDate}
                </span>
              )}
            </div>
            <div className="leading-3">
              <span className="mr-5 text-sm">
                <Link to={`/${username}/following`} className="hover:underline" data-testid="following">
                  <span className="font-bold" data-testid="followingCount">{user?.followingCount}</span>
                  <span className="text-gray"> Following</span>
                </Link>
              </span>
              <span className="mr-5 text-sm">
                <Link to={`/${username}/followers`} className="hover:underline" data-testid="followers">
                  <span className="font-bold" data-testid="followersCount">{user?.followersCount}</span>
                  <span className="text-gray"> Followers</span>
                </Link>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
