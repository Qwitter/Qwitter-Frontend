import { NavBar } from "../../components";
import { Route, Routes, useLocation } from "react-router-dom";
import { Settings } from "../Settings/Settings";
import { Home } from "../home/Home";
import { Notifications, NotificationsType } from "../Notifications/Notifications";
import { Messages } from "../Messages/Messages";
import { cn, getPageFromUrl, getUserData } from "@/lib/utils";
import { MessagesAccordion } from "../Messages/MessagesAccordion";
import { Profile } from "../Profile/Profile";
import TweetDetails from "../TweetDetails/TweetDetails";
import { socket } from "@/lib/socketInit";
import { useContext, useEffect } from "react";
import { EVENTS } from "../../models/Events";
import { LikeRetweetList } from "@/components/LikeRetweetList/LikeRetweetList";
import SideBar from "../SideBar/SideBar";
import NotFound from "../NotFound/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import { Explore } from "@/pages/Explore/Explore";
import ConnectionList from "@/components/ConnectionList/ConnectionList";
import { toast } from "@/components/ui/use-toast";
import { InfiniteData, useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "@/models/User";
import { UserContext } from "@/contexts/UserContextProvider";
import { TweetPage } from "../TweetDetails/TweetPage";

export function PagesContainer() {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const previousLocation = location.state?.previousLocation;
  const user = JSON.parse(localStorage.getItem("user")!);
  const {setUser} = useContext(UserContext)
  const queryClient = useQueryClient();
  const handleNotificationText = (notification: NotificationsType) => {
    if (notification.type == "follow")
      return `New Follower ${notification.follower!.name} `;
    else if (notification.type == "like")
      return `${notification.like!.liker!.name} liked your tweet`;
    else if (notification.type == "retweet")
      return `${notification.retweet?.author.name} retweeted your tweet`;
    else if (notification.type == "reply")
      return `${notification.reply!.author!.name} replied to your tweet`;
    else return "unknown"

  }
  const {  data } = useQuery<User>({
    queryKey: ["getUser"],
    queryFn: () => getUserData(token!),
  });
  const handleComingNotification = (notification: NotificationsType) => {
    const notificationText =handleNotificationText(notification);
    queryClient.invalidateQueries({ queryKey: ["Notifications"] });
    if(notificationText=="unknown") return;
    queryClient.setQueryData(["Notifications"], (old: InfiniteData<NotificationsType[], unknown>) => {
      if (old) {
        old.pages[0] = [notification, ...old.pages[0]];
      }
      return old;
    });

    if (document.visibilityState == "hidden" && Notification.permission === 'granted') {
      new Notification(notificationText);

    }
    else {
      toast({
        description: notificationText,
        variant: "secondary",
        duration: 2000,
        className: "py-4",
      });
    }
  }
  useEffect(()=>{
    data&&setUser(data);
  },[data])

  useEffect(() => {
    try {
      if (!user) return;
      socket.connect();

      socket.on("connect", () => {
        console.log("connected -----------");
      });
      socket.emit(EVENTS.CLIENT.JOIN_ROOM, user.userName);
      socket.on(EVENTS.SERVER.NOTIFICATION, async (notification: NotificationsType) => {
        handleComingNotification(notification);

      });
    } catch (e) {
      toast({
        description: "Oops something went wrong,try again later",
        variant: "destructive"
      });
    }
    return () => {
      console.log('disconnecting....................')
      socket.disconnect();
    };
  }, []);


  return (
    <>
      {location.pathname !== "/" && (
        <div className="w-full flex flex-row min-h-[750px] z-0 justify-center">
          <NavBar />

          <div className=" border-l-[0.5px] border-primary border-opacity-30 max-mobile:w-full">
            <div
              className={cn(
                `w-auto mobile:w-[920px] h-full flex flex-row justify-between large2X:w-[990px] max-largeX:max-w-[600px] flex-shrink-1 flex-grow-2`,
                getPageFromUrl(location.pathname.toLowerCase()) == "messages" &&
                "large2X:w-[1025px]"
              )}
            >
              <Routes location={previousLocation || location}>
                {/* this is the main routs*/}
                <Route
                  path="/Settings/*"
                  element={
                    <ProtectedRoute token={token}>
                      <Settings />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/Messages/*"
                  element={
                    <ProtectedRoute token={token}>
                      {" "}
                      <Messages />{" "}
                    </ProtectedRoute>
                  }
                />
                <Route
                  index
                  path="/Home"
                  element={
                    <ProtectedRoute token={token}>
                      {" "}
                      <Home />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/Notifications"
                  element={
                    <ProtectedRoute token={token}>
                      {" "}
                      <Notifications />{" "}
                    </ProtectedRoute>
                  }
                />
                <Route path="/Profile/:username/*" element={<Profile />} />
                <Route
                  path="/Explore/*"
                  element={
                    <ProtectedRoute token={token}>
                      {" "}
                      <Explore />{" "}
                    </ProtectedRoute>
                  }
                />
                <Route path="/Tweet/:tweetId/*" element={<TweetPage />} />
                <Route
                  path="/Connection"
                  element={
                    <ProtectedRoute token={token}>
                      {" "}
                      <ConnectionList />{" "}
                    </ProtectedRoute>
                  }
                />
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
              {!(
                getPageFromUrl(location.pathname.toLowerCase()) == "settings" ||
                getPageFromUrl(location.pathname.toLowerCase()) == "unknown" ||
                getPageFromUrl(location.pathname.toLowerCase()) == "messages"
              ) && (
                  <SideBar
                    page={getPageFromUrl(location.pathname.toLowerCase())}
                  />
                )}
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