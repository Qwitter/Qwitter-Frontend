import SearchInput from "@/components/SearchInput/SearchInput";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { FollowCard } from "@/components/FollowCard/FollowCard";
import { TrendCard } from "@/components/TrendCard/TrendCard";
import { FollowList } from "@/components/FollowList/FollowList";
import { ProfileUser } from "./ProfileUser";

export function Profile() {
  const { username } = useParams();
  if (!username || username!.length >= 16) {
    // Redirect or handle the case when the username is too long
    return (
      <>
        <Navigate to="/home" />
      </>
    );
  }

  return (
    <>
      <div className="max-w-[600px] w-full h-full flex-grow border-r border-primary border-opacity-30 ">
        <Routes>
          <Route path="/" index element={<ProfileUser />} />
          <Route
            path="/Followers"
            element={<FollowList type={"Followers"} />}
          />
          <Route
            path="/Following"
            element={<FollowList type={"Following"} />}
          />
        </Routes>
      </div>
      <div className="max-w-[600px]  pb-16 relative flex flex-col z-0 w-[36.5%] max-largeX:hidden  h-full">
        <div className="w-full sticky top-0 z-50 bg-black   ">
          <SearchInput />
        </div>
        <div className="mt-5 rounded-lg bg-dark-gray">
          <FollowCard />
        </div>
        <div className="mt-5 rounded-lg bg-dark-gray">
          <TrendCard />
        </div>
      </div>
    </>
  );
}
