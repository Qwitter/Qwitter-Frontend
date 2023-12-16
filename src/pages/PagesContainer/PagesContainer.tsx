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
import SideBar from "../SideBar/SideBar";
import NotFound from "../NotFound/NotFound";
import ProtectedRoute from "./ProtectedRoute";

export function PagesContainer() {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const previousLocation = location.state?.previousLocation;
  const user = JSON.parse(localStorage.getItem("user")!)

  useEffect(() => {
    if(!user) return;
    socket.connect()
    socket.on('connect', () => {
      console.log("connected -----------")
    })
    console.log(socket.connected)
    socket.emit(EVENTS.CLIENT.JOIN_ROOM, user.userName);
    socket.on(EVENTS.SERVER.NOTIFICATION, async (notification) => {
      console.log(notification);
    });
    return () => {
      socket.disconnect();
    };
  }, [])
  const getPageFromUrl = (pathname: string) => {
    if (pathname.includes("home")) {
      return "home";
    } else if (pathname.includes("profile")) {
      return "profile";
    } else if (pathname.includes("explore")) {
      return "explore";
    } else if (pathname.includes("settings")) {
      return "settings";
    } else if (pathname.includes("notification")) {
      return "notification";
    } else if (pathname.includes("messages")) {
      return "messages";
    } else if (pathname.includes("tweet")) {
      return "tweet";
    } else {
      return "unknown";
    }
  };
  return (
    <>
      {location.pathname !== "/" && (
        <div className="w-full flex flex-row min-h-[750px] z-0 justify-center">
          <NavBar />

          <div className=" border-l-[0.5px] border-primary border-opacity-30 max-mobile:w-full">
            <div
              className={cn(
                `w-auto mobile:w-[920px] h-full flex flex-row justify-between large2X:w-[990px] max-largeX:max-w-[600px] flex-shrink-1 flex-grow-2`,
                getPageFromUrl(location.pathname.toLowerCase()) == "messages" && "large2X:w-[1025px]"
              )}
            >
              <Routes location={previousLocation || location}>
                {/* this is the main routs*/}
                <Route path="/Settings/*" element={<ProtectedRoute token={token}><Settings /></ProtectedRoute>} />
                <Route path="/Messages/*" element={<ProtectedRoute token={token}> <Messages /> </ProtectedRoute>} />
                <Route index path="/Home" element={<ProtectedRoute token={token}> <Home /></ProtectedRoute>} />
                <Route path="/Notification" element={<ProtectedRoute token={token}> <Notifications /> </ProtectedRoute>} />
                <Route path="/Profile/:username/*" element={<Profile />} />
                <Route path="/Explore" element={<ProtectedRoute token={token}> <ExploreList /> </ProtectedRoute>} />
                <Route path="/Tweet/:tweetId" element={<TweetDetails />} />
                <Route
                  path="/:username/:tweetId/Likers"
                  element={<LikeRetweetList type={"Likers"} />}
                />
                <Route
                  path="/:username/:tweetId/Retweeters"
                  element={<LikeRetweetList type={"Retweeters"} />}
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
              {!(getPageFromUrl(location.pathname.toLowerCase()) == "settings" || getPageFromUrl(location.pathname.toLowerCase()) == "unknown" || getPageFromUrl(location.pathname.toLowerCase()) == "messages") &&
                <SideBar page={getPageFromUrl(location.pathname.toLowerCase())} />
              }
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
