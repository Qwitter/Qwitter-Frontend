import { NavBar } from "../../components";
import { Route, Routes, useLocation } from "react-router-dom";
import { Settings } from "../Settings/Settings";
import { Home } from "../home/Home";
import { Notifications } from "../Notifications/Notifications";
import { Messages } from "../Messages/Messages";
import { cn } from "@/lib/utils";
import { MessagesAccordion } from "../Messages/MessagesAccordion";
import { Profile } from "../Profile/Profile";
import { ExploreList } from "@/components/ExploreList/ExploreList.";
import TweetDetails from "../TweetDetails/TweetDetails";
import { socket } from "@/lib/socketInit";
import { useEffect } from "react";
import { EVENTS } from "../Messages/types/MessagesTypes";
import { LikeRetweetList } from "@/components/LikeRetweetList/LikeRetweetList";

export function PagesContainer() {
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;
  const user = JSON.parse(localStorage.getItem("user")!);
  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      console.log("connected -----------");
    });
    console.log(socket.connected);
    socket.emit(EVENTS.CLIENT.JOIN_ROOM, user.userName);
    socket.on(EVENTS.SERVER.NOTIFICATION, async (notification) => {
      console.log(notification);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

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
                <Route path="/tweet/:tweetId" element={<TweetDetails />} />
                <Route
                  path="/:username/:tweetId/Likers"
                  element={<LikeRetweetList type={"Likers"} />}
                />
                <Route
                  path="/:username/:tweetId/Retweeters"
                  element={<LikeRetweetList type={"Retweeters"} />}
                />
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
