import { useParams, Routes, Route, useNavigate } from "react-router-dom";
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

export function ProfileUser() {
  const { username } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(UserContext);
  const [blocked, setBlocked] = useState(false);

  const { data: user, isPending } = useQuery<UserProfileData>({
    queryKey: ["profile", token, username],
    queryFn: () => getUserProfile(token!, username!),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    setBlocked(user?.isBlocked!);
  }, [user]);

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
          <div
            onClick={handleBackArrow}
            className="w-[35px] h-[35px] flex justify-center items-center rounded-full transition-colors hover:bg-dark-gray cursor-pointer"
            data-testid="backHome"
          >
            <ArrowLeft size="1.25rem" />
          </div>
        </span>
        <span className="flex flex-col justify-center w-full h-[52px] ml-3">
          <span className="text-xl font-bold">
            {user == null ? "Profile" : user?.name}
          </span>
          {!(user == null) && (
            <span className="text-[13px] text-gray">
              {user?.tweetCount} Posts
            </span>
          )}
        </span>
      </div>
      <ProfileMain user={user || null} />

      {!(user == null) && blocked ? (
        <BlockedProfile
          username={username!}
          ViewPostsFunction={() => setBlocked(false)}
        />
      ) : user == null ? (
        <ProfileInvalid />
      ) : (
        <>
          <ProfileSections />
          <Routes>
            <Route path="/" element={<ProfilePosts />} />
            <Route path="/with_replies" element={<ProfileReplies />} />
            <Route path="/media" element={<ProfileMedia />} />
            <Route path="/likes" element={<ProfileLikes />} />
          </Routes>
        </>
      )}
    </>
  );
}
