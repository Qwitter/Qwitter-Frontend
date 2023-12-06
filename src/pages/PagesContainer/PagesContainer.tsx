import { NavBar } from "../../components";
import { Route, Routes, useLocation } from "react-router-dom";
import { Settings } from "../Settings/Settings";
import { Home } from "../home/Home";
import { Notifications } from "../Notifications/Notifications";
import { Messages } from "../Messages/Messages";
import { cn } from "@/lib/utils";
import { MessagesAccordion } from "../Messages/MessagesAccordion";
import { Profile } from "../Profile/Profile";
import { FollowList } from "@/components/FollowList/FollowList";
import { ExploreList } from "@/components/ExploreList/ExploreList.";

export function PagesContainer() {
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;
  return (
    <>
      {" "}
      {location.pathname !== "/" && (
        <div className="w-full flex flex-row min-h-[750px] z-0 justify-center">
          <NavBar />

          <div className=" border-l-[0.5px] border-primary border-opacity-30 max-mobile:w-full">
            <div
              className={cn(
                `w-auto mobile:w-[920px] h-full flex flex-row justify-between large2X:w-[990px] max-largeX:max-w-[600px] flex-shrink-1 flex-grow-2`,
                location.pathname.includes("Messages")
                  ? "large2X:w-[1025px]"
                  : ""
              )}
            >
              <Routes location={previousLocation || location}>
                {/* this is the main routs*/}
                <Route path="/Settings/*" element={<Settings />} />
                <Route index path="/home" element={<Home />} />
                <Route path="/Notification" element={<Notifications />} />
                <Route path="/Messages/*" element={<Messages />} />
                <Route path="/:username/*" element={<Profile />} />
                <Route path="/Explore" element={<ExploreList />} />
                <Route
                  path="/Followers"
                  element={<FollowList type={"Followers"} />}
                />
                <Route
                  path="/Following"
                  element={<FollowList type={"Following"} />}
                />
                <Route path="/Muted" element={<FollowList type={"Muted"} />} />
              </Routes>
            </div>
          </div>
          {!previousLocation?.pathname.toLowerCase().includes("/messages") &&
            !location.pathname.toLowerCase().includes("/messages") && (
              <MessagesAccordion />
            )}
        </div>
      )}
    </>
  );
}
