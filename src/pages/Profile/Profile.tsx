import {  Navigate, Route, Routes, useParams } from "react-router-dom";

import { FollowList } from "@/components/FollowList/FollowList";
import { ProfileUser } from "./ProfileUser";

export function Profile() {
  const { username } = useParams();
  if (!username || username!.length >= 16) {
    return (
      <Navigate to={"/NotFound"} replace />
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
    </>
  );
}
