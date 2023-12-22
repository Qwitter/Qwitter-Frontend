import { useState } from "react";
import { Heart, User } from "lucide-react";
import { Link, useLocation, /*useNavigate*/ } from "react-router-dom";
import { BiRepost } from "react-icons/bi";
import Logo from "../../assets/logo.png";
import { User as UserType } from "@/models/User";
import { useQuery } from "@tanstack/react-query";
import { TweetWithRetweet } from "@/models/Tweet";
import { MessageUser } from "../../models/MessagesTypes";
import { getNotificationsList } from "@/lib/utils";
import { Spinner } from "@/components/Spinner";
import moment from "moment";
import { default as TweetComponent } from "../../components/Tweet/Tweet";
import { UserNameHoverCard } from "@/components/UserNameHoverCard/UserNameHoverCard";
type NotificationsType = {
  type: string;
  createdAt: string;
  reply?: TweetWithRetweet;
  follower?: MessageUser;
  retweet?: TweetWithRetweet;

}
export function Notifications() {
  const [active, setActive] = useState("ALL");
  const {
    isPending,
    data: notifications,
  } = useQuery<NotificationsType[]>({
    queryKey: ["Notifications"],
    queryFn: () => getNotificationsList()
    ,
  });

  return (
    <div className="max-w-[600px] w-full h-full flex-grow border-r border-primary border-opacity-30 ">
      <div className="flex flex-col min-h-[50px] w-full sticky backdrop-blur-2xl top-[-1px] bg-black  z-50 border-b border-primary border-opacity-20">
        <div className="px-4 w-full h-[53px]">
          <div className="w-full h-full flex  items-center">
            <h2 className="font-bold text-xl">Notifications</h2>
          </div>
        </div>
        <div className="flex flex-row min-h-[50px] w-full sticky  top-[-1px]  z-50 border-b border-primary border-opacity-30">
          <div
            className="w-full  flex justify-center items-center  px-4 py-0 min-w-[56px] hover:bg-[#181818] transition-all cursor-pointer"
            onClick={() => setActive("ALL")}
          >
            <span
              className={`${active == "ALL"
                ? "text-primary border-b-4 font-bold py-3 border-solid border-secondary "
                : "text-gray"
                } text-base  `}
            >
              ALL
            </span>
          </div>

          <div
            className="w-full  flex justify-center items-center  px-4 py-0 min-w-[56px]  hover:bg-[#181818] transition-all cursor-pointer "
            onClick={() => setActive("Mentions")}
          >
            <span
              className={`${active == "Mentions"
                ? "text-primary border-b-4 font-bold py-3 border-solid border-secondary "
                : "text-gray"
                } text-base  `}
            >
              Mentions
            </span>
          </div>
        </div>
      </div>
      <div className="relative min-h-[60vh]">
        {isPending || !notifications ? <div className="w-full h-[500px] p-10">
          <Spinner />
        </div> : notifications.map((notification) => (
          <Notification
            key={notification.createdAt}
            createdAt={notification.createdAt}
            retweet={notification.retweet}
            reply={notification.reply}
            follower={notification.follower}
            type={notification.type}
          />
        ))}
      </div>
    </div>

  );
}

function Notification({ type, createdAt, follower, reply }: NotificationsType) {
  // const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user")!) as UserType;
  const { VITE_DEFAULT_IMAGE } = import.meta.env;

  const location = useLocation();
  const formatDateMonthYear = (dateString: string) => {
    const date = moment(dateString);
    return date.format('MMM DD, YYYY');
  };
  if (type == 'reply' || type == "retweet") {
    return (

        <TweetComponent
          tweet={reply!}
        />

    )
  }
  return (
    <div className="px-4 py-3 cursor-pointer flex flex-row border-b border-primary border-opacity-30" /*onClick={() => navigate(url)}*/>
      <div className=" mr-3 w-10 h-full flex justify-end basis-10">
        {
          type == 'follow' && <User className="text-transparent w-8 h-8" fill="#1d9bf0" />}
        {
          type == 'retweet' && <BiRepost className="text-transparent w-9 h-[38px]" fill="#00ba7c" />
        }
        {
          type == 'love' && <Heart className="text-transparent w-8 h-8" fill="#f91880" />
        }
        {
          type == 'login' && <img src={Logo} className="text-transparent w-9 h-9" />
        }
      </div>
      <div className="flex flex-col w-full">
        {type == "login" ? <Link
          to={"/Notification/login"}
          state={{ previousLocation: location }}
          className="font-semibold break-words">
          There was a login to your account @{user.userName} from a new device on {formatDateMonthYear(createdAt)}. Review it now.
        </Link> :
          <><div className="mb-3 pr-5">
            <div className="flex flex-row">
              <img className="w-10 aspect-square p-1 rounded-full " src={follower?.profileImageUrl||VITE_DEFAULT_IMAGE} alt="" />
            </div>
          </div>
            <div>
              <div className="flex flex-row items-center gap-1 transition-all">
                <UserNameHoverCard name={follower?.name||""} isFollowing={follower?.isFollowing||false} description={follower?.description||""} userName={follower?.userName||""} followersCount={follower?.followersCount||0} followingCount={follower?.followingCount||0} profileImageUrl={follower?.profileImageUrl||VITE_DEFAULT_IMAGE} />
              <Link to={type=='follow'&&`/Profile/${follower?.userName}`||"#"}> {type == 'follow' ? "followed you" : type == 'retweet' ? "reposted your post" : "liked your post"}</Link>
                </div>
                {type=="love"&&<p className="text-sm text-gray mt-2">post text , img or video url</p>}
            </div></>}
      </div>
    </div>
  )
}

