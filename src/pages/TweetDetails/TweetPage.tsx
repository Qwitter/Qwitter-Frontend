import { Route, Routes, useLocation } from "react-router-dom";
import TweetDetails from "./TweetDetails";
import { LikeRetweetList } from "@/components/LikeRetweetList/LikeRetweetList";

export function TweetPage() {
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;

  return (
    <>
      <div className="max-w-[600px] w-full h-full flex-grow border-r border-primary border-opacity-30 max-sm:w-[280px] ">
        <Routes location={previousLocation || location}>
          <Route
            path="/engagements"
            element={<LikeRetweetList type="Likers" />}
          />
          <Route path="/*" index element={<TweetDetails />} />
        </Routes>
      </div>
    </>
  );
}
