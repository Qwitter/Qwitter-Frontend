import { Skeleton } from "@/components/ui/skeleton";
import SearchInput from "@/components/SearchInput/SearchInput";
import { useParams, Navigate, Routes, Route } from "react-router-dom";
import { ProfileMain } from "./ProfileMain";
import { ArrowLeft } from "lucide-react";
import { ProfileSections } from "./ProfileSections";
import { ProfilePosts } from "./ProfilePosts";
import { ProfileReplies } from "./ProfileReplies";
import { ProfileMedia } from "./ProfileMedia";
import { ProfileLikes } from "./ProfileLikes";
import {  useEffect, useState } from "react";
import { getUserProfile } from "@/lib/utils";
import { UserProfileData } from "@/models/User";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@/components/Spinner";

/*
TODO: handle invalid username
*/

export function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState<UserProfileData | null>();
  const token = localStorage.getItem('token')
  const getUser = async () => {
    const user = await getUserProfile(token!, username!);
    console.log(user)
    setUser(user);
    return user;
  };

  const { refetch } = useQuery({
    queryKey: ["profile", username],
    queryFn: getUser,
  });

  useEffect(() => {
    if (token) refetch();
  }, [token, refetch]);

  if (!username || username!.length >= 15) {
    // Redirect or handle the case when the username is too long
    return (
      <>
        <Navigate to="/home" />
      </>
    );
  }


  if (!user)
    return (
      <div className="w-full flex justify-center items-center p-3 text-center h-[134px]">
        <Spinner />
      </div>
    );

  return (
    <>
      <div className="max-w-[600px] w-full h-full flex-grow border-r border-primary border-opacity-30 ">
        <div className="flex flex-row min-h-[53px] w-full sticky  top-[-1px] px-4 bg-black bg-opacity-60 backdrop-blur-xl z-50 border-b border-primary border-opacity-30">
          <span className="h-full my-auto w-14">
            <div className="w-[35px] h-[35px] flex justify-center items-center rounded-full transition-colors hover:bg-dark-gray cursor-pointer">
              <ArrowLeft size="1.25rem" />
            </div>
          </span>
          <span className="flex flex-col w-full ml-3">
            <span className="text-xl font-bold pt-0.5">{user?.name}</span>
            <span className="text-[13px] text-gray">{user?.tweetCount}</span>
          </span>
        </div>
        <ProfileMain user={user!} />

        <ProfileSections />

        <div className="">
          <Routes>
            <Route index path="/" element={<ProfilePosts />} />
            <Route path="/with_replies" element={<ProfileReplies />} />
            <Route path="/media" element={<ProfileMedia />} />
            <Route path="/likes" element={<ProfileLikes />} />
          </Routes>
        </div>
      </div>
      <div className="max-w-[600px]  pb-16 relative flex flex-col z-0 w-[36.5%] max-largeX:hidden  h-full">
        <div className="w-full sticky top-0 z-50 bg-black   ">
          <SearchInput />
        </div>
        <div className="px-4 py-3 rounded-lg mt-5 bg-dark-gray">
          <Skeleton className="w-full  h-[120px] " />
        </div>
        <div className="px-4 py-3 rounded-lg mt-5 bg-dark-gray">
          <Skeleton className="w-full  h-[500px] " />
        </div>
        <div className="px-4 py-3 rounded-lg mt-5 bg-dark-gray">
          <Skeleton className="w-full  h-[300px] " />
        </div>
      </div>
    </>
  );
}
