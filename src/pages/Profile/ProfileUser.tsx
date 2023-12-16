import {
  useParams,
  Navigate,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { ProfileMain } from "./ProfileMain";
import { ArrowLeft } from "lucide-react";
import { ProfileSections } from "./ProfileSections";
import { ProfilePosts } from "./ProfilePosts";
import { ProfileReplies } from "./ProfileReplies";
import { ProfileMedia } from "./ProfileMedia";
import { ProfileLikes } from "./ProfileLikes";
import { useContext, useEffect, useState } from "react";
import { getUserProfile } from "@/lib/utils";
import { UserProfileData } from "@/models/User";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@/components/Spinner";
import { UserContext } from "@/contexts/UserContextProvider";
import { BlockedProfile } from "@/components/BlockedProfile/BlockedProfile";
import { ProfileInvalid } from "./ProfileInvalid";

/*
TODO: test  invalid username
*/

export function ProfileUser() {
  const { username } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(UserContext);
  const [blocked, setBlocked] = useState(false);

  if (!username || username!.length >= 16) {
    // Redirect or handle the case when the username is too long
    return (
      <>
        <Navigate to="/home" />
      </>
    );
  }

  const {
    data: user,
    isError,
    isPending,
  } = useQuery<UserProfileData>({
    queryKey: ["profile", token, username],
    queryFn: () => getUserProfile(token!, username!),
  });
  useEffect(() => {
    window.scrollTo(0, 0);
    setBlocked(user?.isBlocked!);
  }, []);

  if (!username || username!.length >= 15) {
    // Redirect or handle the case when the username is too long
    return (
      <>
        <Navigate to="/home" />
      </>
    );
  }

  if (isPending)
    return (
      <div className="w-full flex justify-center items-center p-3 text-center h-[134px]">
        <Spinner />
      </div>
    );

  const handleBackArrow = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="flex flex-row min-h-[53px] w-full sticky  top-[-1px] px-4 bg-black bg-opacity-60 backdrop-blur-xl z-50 border-b border-primary border-opacity-30">
        <span className="h-full my-auto w-14">
          <div className="w-[35px] h-[35px] flex justify-center items-center rounded-full transition-colors hover:bg-dark-gray cursor-pointer">
            <ArrowLeft size="1.25rem" onClick={handleBackArrow} />
          </div>
        </span>
        <span
          className="flex flex-col justify-center w-full h-full ml-3"
          // height here may change later
        >
          <span className="text-xl font-bold pt-0.5">
            {isError ? "Profile" : user?.name}
          </span>
          {!isError && (
            <span className="text-[13px] text-gray">
              {user?.tweetCount} Posts
            </span>
          )}
        </span>
      </div>
      <ProfileMain user={user || null} />

      {!isError && blocked ? (
        <BlockedProfile
          username={username!}
          ViewPostsFunction={() => setBlocked(false)}
        />
      ) : isError ? (
        <ProfileInvalid />
      ) : (
        <>
          <ProfileSections />
          <Routes>
            <Route index path="/" element={<ProfilePosts />} />
            <Route path="/with_replies" element={<ProfileReplies />} />
            <Route path="/media" element={<ProfileMedia />} />
            <Route path="/likes" element={<ProfileLikes />} />
          </Routes>
        </>
      )}
    </>
  );
}