import { Button } from "@/components";
import { UserContext } from "@/contexts/UserContextProvider";
import { UserProfileData } from "@/models/User";
import { Cake, CalendarDays, LinkIcon, Mail, MapPin } from "lucide-react";
import { useContext } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FollowButton } from "@/components/FollowButton/FollowButton";
import { BlockButton } from "@/components/BlockButton/BlockButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CreateConversation, cn, convertNumberToShortForm } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import TweetOptionsMenu from "@/components/TweetOptionsMenu/TweetOptionsMenu";

type ProfileMainProps = {
  user: UserProfileData | null;
};

export const ProfileMain = ({ user }: ProfileMainProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");
  const { username } = useParams();
  const { user: contextUser } = useContext(UserContext);

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

  const { mutate } = useMutation({
    mutationFn: CreateConversation,
    onSuccess: (data) => {
      if (data) {
        navigate("/Messages/" + data.id);
      }
    },
    onError: (data) => {
      console.log(data);
    },
  });

  const handleMessageClick = () => {
    mutate({
      token: token!,
      users: [username!],
    });
  };

  const handleFollow_Block = () => {
    queryClient.invalidateQueries({ queryKey: ["profile", token, username] });
  };

  return (
    <div>
      <div className="w-full aspect-[3/1] max-h-[200px] bg-[#333639]">
        {user?.profileBannerUrl && (
          <Link
            to={`header_photo`}
            state={{ bannerImg: user?.profileBannerUrl, previousLocation: location }}
            className="w-full"
          >
            <img
              src={user?.profileBannerUrl}
              alt="user banner image"
              className="w-full h-full"
            />
          </Link>
        )}
      </div>
      <div className="pt-3 px-4 mb-4">
        <div className="h-[69px] flex flex-row justify-between">
          {
            <Avatar className="rounded-full mt-[-15%] mb-3 w-[20vw] h-auto aspect-square sm:w-[142px] bg-black p-0.5 sm:p-1 border-solid block">
              <Link
                to={'/flow/photo'}
                state={{ photo: user?.profileImageUrl, previousLocation: location }}
                className="w-full h-full cursor-pointer"
              >
                <AvatarImage
                  className="rounded-full"
                  src={`${user?.profileImageUrl}`}
                  alt="user profile image"
                />
              </Link>
              {user ? (
                <AvatarFallback className="text-4xl">
                  {user?.userName.substring(0, 2)}
                </AvatarFallback>
              ) : (
                <div className="w-full h-full rounded-full bg-[#16181c]"></div>
              )}
            </Avatar>
          }

          {user && user.isBlocked ? (
            <BlockButton
              username={user.userName}
              onClick={handleFollow_Block}
              className="h-[35px]"
            />
          ) : (
            <>
              {contextUser?.userName == username ? (
                <Link
                  to="settings/profile"
                  state={{ previousLocation: location }}
                  className="h-[35px]"
                >
                  <Button variant="outline" className="h-full">
                    Edit profile
                  </Button>
                </Link>
              ) : (
                user && (
                  <div className="flex justify-start align-start">
                    <TweetOptionsMenu
                      mode="profile"
                      author={user}
                      isMuted={user?.isMuted || false}
                      isFollowing={user?.isFollowing || false}
                      className="w-[35px] h-[35px] mb-3 mr-2 flex justify-center items-center rounded-full border border-[#536471] hover:bg-[#eff3f4]/10 text-white hover:text-white outline-none"
                      linkClassName="outline-none cursor-default"
                    />

                    {!user.isBlocked && (
                      <div
                        onClick={handleMessageClick}
                        className="w-[35px] h-[35px] mb-3 mr-2 cursor-pointer flex justify-center items-center rounded-full border border-[#536471] hover:bg-[#eff3f4]/10"
                      >
                        <Mail size={20} />
                      </div>
                    )}

                    <FollowButton
                      isFollowing={user?.isFollowing!}
                      username={user?.userName!}
                      className={cn(
                        "h-[35px] min-w-20",
                        user?.isFollowing && "w-[100px]"
                      )}
                      onClick={handleFollow_Block}
                    />
                  </div>
                )
              )}
            </>
          )}
        </div>

        {!user ? (
          <div className="w-full mt-1 mb-3">
            <span className="text-xl leading-5 font-bold">@{username}</span>
          </div>
        ) : (
          <div>
            <div className="w-full flex flex-col mt-1 mb-3">
              <span className="text-xl leading-5 font-bold" data-testid="name">
                {user?.name}
              </span>
              <span className="text-gray text-[15px] mt-1" data-testid="username">
                @{user?.userName}
              </span>
            </div>
            <div className="mb-3" data-testid="bio">
              {user?.description}
            </div>
            <div className="flex flex-wrap leading-4 mb-3">
              {!user.isBlocked && user?.location && (
                <span className="text-[15px] text-gray mr-3">
                  <MapPin size="1.1rem" className="inline mr-1 mb-1" />
                  {user.location}
                </span>
              )}

              {!user.isBlocked && user?.url && (
                <span className="mr-3">
                  <LinkIcon
                    size="1.1rem"
                    className="text-gray inline mr-1 mb-1"
                  />
                  <Link
                    to={user.url}
                    className="text-[15px] text-[#1D9BF0] hover:underline"
                    target="blank"
                  >
                    {user.url.indexOf("www.") == -1
                      ? user.url.slice(user.url.indexOf("://") + 3)
                      : user.url.slice(user.url.indexOf("www.") + 4)}
                  </Link>
                </span>
              )}

              {!user.isBlocked && user?.birthDate && (
                <span
                  className="text-[15px] text-gray mr-3"
                  data-testid="birthDate"
                >
                  <Cake size="1.1rem" className="inline mr-1 mb-1" />
                  Born {birthDate}
                </span>
              )}

              {!user.isBlocked && user?.createdAt && (
                <span className="text-[15px] text-gray mr-3">
                  <CalendarDays size="1.1rem" className="inline mr-1 mb-1" />
                  Joined {joinDate}
                </span>
              )}
            </div>
            <div className="leading-3">
              <span className="mr-5 text-sm">
                <Link
                  to={`/Profile/${username}/following`}
                  className="hover:underline"
                  data-testid="following"
                >
                  <span className="font-bold" data-testid="followingCount">
                    {convertNumberToShortForm(user?.followingCount)}
                  </span>
                  <span className="text-gray"> Following</span>
                </Link>
              </span>
              <span className="mr-5 text-sm">
                <Link
                  to={`/Profile/${username}/followers`}
                  className="hover:underline"
                  data-testid="followers"
                >
                  <span className="font-bold" data-testid="followersCount">
                    {convertNumberToShortForm(user?.followersCount)}
                  </span>
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
