import {  Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import { FollowList } from "@/components/FollowList/FollowList";
import { ProfileUser } from "./ProfileUser";

export function Profile() {
  const { username } = useParams();
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;
  if (!username || username!.length >= 16) {
    return (
      <Navigate to={"/NotFound"} replace />
    );
  }

  return (
    <>
      <div className="max-w-[600px] w-full h-full flex-grow border-r border-primary border-opacity-30 max-sm:w-[280px] ">
        <Routes  location={previousLocation || location}>
          <Route
            path="/Followers"
            element={<FollowList type={"Followers"} />}
          />
          <Route
            path="/Following"
            element={<FollowList type={"Following"} />}
          />
          <Route path="/*" index element={<ProfileUser />} />
        </Routes>
      </div>
    </>
  );
}
