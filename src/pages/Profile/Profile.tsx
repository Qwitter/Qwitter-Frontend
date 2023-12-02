import { Skeleton } from "@/components/ui/skeleton";
import SearchInput from "@/components/SearchInput/SearchInput";
import {
  useParams,
  Navigate,
  useLocation,
  Link,
  Routes,
  Route,
} from "react-router-dom";
import { EditProfilePopUp } from "@/components/EditProfilePopUp/EditProfilePopUp";
import { ProfileMain } from "./ProfileMain";
import { ArrowLeft } from "lucide-react";
import { ProfileSections } from "./ProfileSections";

/*
NEEDED:
  display tweets and data conditionally
*/

export function Profile() {
  //   const location = useLocation();
  const { username } = useParams();
  if (username!.length > 20) {
    // Redirect or handle the case when the username is too long
    return (
      <>
        <Navigate to="/home" />
      </>
    );
  }

  return (
    <>
      {/* this is the first col */}
      <div className="max-w-[600px] w-full h-full flex-grow border-r border-primary border-opacity-30 ">
        <div className="flex flex-row min-h-[53px] w-full sticky  top-[-1px] px-4 bg-black bg-opacity-60 backdrop-blur-xl z-50 border-b border-primary border-opacity-30">
          <span className="h-full my-auto w-14">
            <div className="w-[35px] h-[35px] flex justify-center items-center rounded-full transition-colors hover:bg-dark-gray cursor-pointer">
              <ArrowLeft size="1.25rem" />
            </div>
          </span>
          <span className="flex flex-col w-full ml-3">
            <span className="text-xl font-bold pt-0.5">Mohamed</span>
            <span className="text-[13px] text-gray">0 posts</span>
          </span>
        </div>
        <ProfileMain
          profile="https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
          banner="https://images.unsplash.com/photo-1589656966895-2f33e7653819?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />

        <ProfileSections />

        {/* this will be the routs and the bottom nav do it tomorrow */}
        <div className="">
          <Routes>
            {/* add components here to display them */}
            <Route index path="/" element={<></>} />
            <Route path="/with_replies" element={<></>} />
            <Route path="/media" element={<></>} />
            <Route path="/likes" element={<></>} />
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
