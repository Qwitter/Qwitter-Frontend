import { Button } from "@/components";
import { UserContext } from "@/contexts/UserContextProvider";
import { UserProfileData } from "@/models/User";
import { Cake, CalendarDays, MapPin } from "lucide-react";
import { useContext } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

/*
TODO: change button if it's not the user's profile
TODO: following and followers go to another page
TODO: location????????? backend (location is in edit profile api) (needed also in the schema)
TODO: options menu and message menu
*/

type ProfileMainProps = {
  user: UserProfileData;
};

export const ProfileMain = ({ user }: ProfileMainProps) => {
  const location = useLocation();
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

  return (
    <div>
      <Link
        to={`/${username}/header_photo`}
        state={{ bannerImg: user.profileBannerUrl }}
        className="w-full"
      >
        <img
          src={user?.profileBannerUrl}
          alt="user banner image"
          className="w-full aspect-[3/1] max-h-[200px] cursor-pointer"
        />
      </Link>
      <div className="pt-3 px-4 mb-4">
        <div className="h-[69px] flex flex-row justify-between">
          <Link
            to={`/${username}/photo`}
            state={{ profileImg: user.profileImageUrl }}
            className="rounded-full cursor-pointer mt-[-15%] mb-3"
          >
            <div>
              <img
                src={user?.profileImageUrl}
                alt="user profile image"
                className="rounded-full w-[20vw] aspect-square sm:w-[142px] bg-black p-0.5 sm:p-1"
              />
            </div>
          </Link>
          {contextUser?.userName == username ? (
            <Button className="h-[35px]">
              {"Follow" /*check if profile is followed be user*/}
            </Button>
          ) : (
            <Link
              to="settings/profile"
              state={{ previousLocation: location }}
              className="h-[35px]"
            >
              <Button variant="outline" className="h-full">
                Edit profile
              </Button>
            </Link>
          )}
        </div>
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
              <Link to="" className="hover:underline">
                <span className="font-bold">{user?.followingCount}</span>
                <span className="text-gray"> Following</span>
              </Link>
            </span>
            <span className="mr-5 text-sm">
              <Link to="" className="hover:underline">
                <span className="font-bold">{user?.followersCount}</span>
                <span className="text-gray"> Followers</span>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
