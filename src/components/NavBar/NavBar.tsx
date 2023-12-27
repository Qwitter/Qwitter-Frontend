import { useContext, useEffect, useState } from "react";
import { navLinks } from "../../constants";
import { Button } from "..";
import { Feather, LogOut } from "lucide-react";
import Logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "@/contexts/UserContextProvider";
import { useLocation } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { AvatarFallback } from "../ui/avatar";
import { getPageFromUrl } from "@/lib/utils";
import { socket } from "@/lib/socketInit";
import { EVENTS } from "@/models/Events";
import { useQueryClient } from "@tanstack/react-query";

export function NavBar() {
  const { user } = useContext(UserContext);
  const [isShown, setIsShown] = useState(false);
  const [NotificationsCount, setNotificationCount] = useState(0);
  const [conversationsCount, setConversationsCount] = useState(0);
  const [homeNewPosts, setHomeNewPosts] = useState(0);
  const navigation = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState(getPageFromUrl(location.pathname.toLowerCase()));
  const queryClient = useQueryClient();
  useEffect(() => {
      /* istanbul ignore next */
    try {
      socket.on(EVENTS.SERVER.NOTIFICATION_COUNT, async (notificationCount) => {
        setNotificationCount(notificationCount);
      });
      socket.on(EVENTS.SERVER.UNREAD_CONVERSATIONS, async (conversationsCount: number) => {
        setConversationsCount(conversationsCount);
      });
      socket.emit(EVENTS.CLIENT.JOIN_ROOM, "ALL");
      socket.on(EVENTS.SERVER.FEED, async () => {

        queryClient.invalidateQueries({
          queryKey: ["tweets"]
        });
        console.log(active)
        if (getPageFromUrl(location.pathname.toLowerCase()) != "home" || active != 'Home')
          setHomeNewPosts(1);
      });
    } catch (e) {
      e
    }
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia("(max-width: 1280px)");
      setIsShown(mediaQuery.matches);
      const handleMediaQueryChange = (event: {
        matches: boolean | ((prevState: boolean) => boolean);
      }) => {
        setIsShown(event.matches);
      };
      mediaQuery.addEventListener("change", handleMediaQueryChange);
      return () => {
        mediaQuery.removeEventListener("change", handleMediaQueryChange);
      };
    }
  }, []);

  useEffect(() => {
    const page = getPageFromUrl(location.pathname.toLowerCase());
    if (active === "Notifications"||page== "notifications") {
      setNotificationCount(0);
    } else if (active === "Home"||page== "home") {
      setHomeNewPosts(0);
    } else if (active === "Messages"||page == "messages") {
      setConversationsCount(0);
    }
  }, [active,location])
  useEffect(() => {
    if (user) {
      setConversationsCount(user.unSeenConversation!);
      setNotificationCount(user.notificationCount!)
    }
  }, [user])

  return (
    <div className="items-end flex flex-col min-w-[80px] max-h-[100vh] sticky top-0">
      <div className="flex flex-col items-start xl:w-[275px] px-2 h-full min-h-[100vh] justify-between ">
        <div data-testid='navbar' className="flex items-start w-full flex-col">
          <Link to="/Home">
            <img
              src={Logo}
              alt="logo"
              data-testid="logo"
              className="w-16 h-16 p-[6px] mt-1 transition-all hover:bg-[#191919] hover:rounded-full font-extrabold"
              onClick={() => {
                setActive("");
              }}
            />
          </Link>
          <NavElements active={active} conversationsCount={conversationsCount} setActive={setActive} NotificationsCount={NotificationsCount} homeNewPosts={homeNewPosts} />
          <Link
            to={"/compose/tweet"}
            state={{ previousLocation: location }}
            className="w-full"
            data-testid="composeTweet"
          >
            <Button variant="secondary" className="w-11/12 py-4 font-bold mt-3">
              {" "}
              {isShown ? <Feather /> : "Post"}
            </Button>
          </Link>
        </div>

        <div className="my-3 p-3 w-full flex flex-row justify-between items-center hover:bg-[#191919] transition-all hover:rounded-full">
          <div data-testid="userdata" className="flex flex-row gap-0">
            <Popover>
              <PopoverTrigger>
                <Avatar className="w-10 h-10 rounded-full border-[#ffffee62] border-[1px] border-solid block">
                  <AvatarImage
                    src={`${user?.profileImageUrl}`}
                    alt="profilePic"
                    className="rounded-full w-10 h-10"
                  />
                  <AvatarFallback>
                    {user?.userName.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent
                className="w-[240px] cursor-pointer hover:bg-[#16181c] p-3 text-primary"
                onClick={() => {
                  navigation("/i/flow/logout");
                }}
              >
                Log out {user?.userName}
              </PopoverContent>
            </Popover>
            <div className=" flex-col mx-3 hidden xl:flex">
              <h3 className="font-semibold tracking-[2px] text-[15px]">
                {user?.name}
              </h3>
              <span className="text-gray text-[15px]">@{user?.userName}</span>
            </div>
          </div>
          <div
            className="row justify-end hidden xl:flex "
            data-testid="logout"
            onClick={() => {
              navigation("/i/flow/logout");
            }}
          >
            <LogOut className="cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}
function NavElements({
  active,
  setActive,
  NotificationsCount,
  homeNewPosts,
  conversationsCount
}: {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
  NotificationsCount: number;
  homeNewPosts: number;
  conversationsCount: number;
}) {
  const { user } = useContext(UserContext);
  return (
    <ul className="flex flex-col w-full ">
      {navLinks.map((link) => (
        <Link
          to={`/${link.title != "Profile" ? link.title : "Profile/" + user?.userName}`}
          key={link.id}
          className="group"
          onClick={() => setActive(link.title)}
        >
          <div
            className="flex flex-row p-[10px] items-center max-xl:justify-center group-hover:bg-[#191919]  group-hover:rounded-full transition-all "
            data-testid={`${link.title}`}
          >
            <div className="relative">
              <link.icon {...(active.slice(1) == link.title.slice(1) ? link.clicked : {})} />
              {NotificationsCount > 0 && link.title == "Notifications" && (
                <div className="absolute top-[-6px] right-[-6px] bg-secondary rounded-full w-[17px] h-[17px] flex items-center justify-center text-white text-[11px]">
                  {NotificationsCount > 9 ? "+9" : NotificationsCount}
                </div>
              )}
              {conversationsCount > 0 && link.title == "Messages" && (
                <div className="absolute top-[-6px] right-[-6px] bg-secondary rounded-full w-[17px] h-[17px] flex items-center justify-center text-white text-[11px]">
                  {conversationsCount > 9 ? "+9" : conversationsCount}
                </div>
              )}
              {homeNewPosts > 0 && link.title == "Home" && (
                <div className="absolute top-[-5px] right-[-1px] bg-secondary rounded-full w-[10px] h-[10px] flex items-center justify-center text-white text-[11px]">
                </div>
              )}
            </div>
            <li
              className={
                active == link.title
                  ? "text-xl text-primary ml-5 mr-4 font-bold hidden xl:block"
                  : `text-xl text-primary ml-5 mr-4 hidden xl:block`
              }
            >
              {link.title}
            </li>
          </div>
        </Link>
      ))}
    </ul>
  );
}
