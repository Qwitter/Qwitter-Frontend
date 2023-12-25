import { LegacyRef, useEffect, useMemo, useState } from "react";
import { Heart, User } from "lucide-react";
import { Link, useLocation, useNavigate, /*useNavigate*/ } from "react-router-dom";
import { BiRepost } from "react-icons/bi";
import Logo from "../../assets/logo.png";
import { User as UserType } from "@/models/User";
import { InfiniteData, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Tweet, TweetWithReplyAndRetweet, TweetWithRetweet } from "@/models/Tweet";
import { MessageUser } from "../../models/MessagesTypes";
import { getMentionsList, getNotificationsList } from "@/lib/utils";
import { Spinner } from "@/components/Spinner";
import moment from "moment";
import { default as TweetComponent } from "../../components/Tweet/Tweet";
import { UserNameHoverCard } from "@/components/UserNameHoverCard/UserNameHoverCard";
import { useInView } from "react-intersection-observer";
export type NotificationsType = {
  type: string;
  createdAt: string;
  reply?: TweetWithReplyAndRetweet;
  follower?: MessageUser;
  like?: TweetWithRetweet & { liker: MessageUser }
  ;
  retweet?: TweetWithRetweet & { author: MessageUser };

}
export function Notifications() {
  const { ref, inView } = useInView();
  const [active, setActive] = useState("ALL");
  const handleNotificationsPaging = ({
    pageParam
  }: {
    pageParam: number;
  }): Promise<NotificationsType[]> => {

    return getNotificationsList(pageParam, 10)
  }
  const { isPending, data: notifications, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["Notifications"],
      initialPageParam: 1,
      getNextPageParam: (data, allPages) => {
        return data.length === 10 ? allPages.length + 1 : undefined;
      },
      queryFn: handleNotificationsPaging,
    });
  useEffect(() => {
    if (hasNextPage && notifications) {
      fetchNextPage();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);
  const NotificationsList = useMemo(() => {
    console.log(notifications?.pages.flat() || [])
    return notifications?.pages.flat() || [];
  }, [notifications]);

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
        {active == "Mentions" ? <Mentions /> :
          <ShowAllNotifications NotificationsList={NotificationsList} isPending={isPending} notifications={notifications} hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage} ref={ref} />
        }
      </div>
    </div>

  );
}
function Mentions() {
  const { isPending, data } = useQuery<TweetWithReplyAndRetweet[]>({
    queryKey: ["getMentions"],
    queryFn: () => getMentionsList(),
  });

  return (
    <>
      {isPending || !data ? <div className="w-full h-[500px] p-10">
        <Spinner />
      </div> :
        data.map((tweet) => (
          <>
            <TweetComponent key={tweet.createdAt} tweet={tweet} />
          </>))
      }
    </>

  )
}
function ShowAllNotifications({ isPending, notifications, NotificationsList, hasNextPage, isFetchingNextPage, ref }:
  { isPending: boolean, notifications: InfiniteData<NotificationsType[], unknown> | undefined, NotificationsList: NotificationsType[], hasNextPage: boolean, isFetchingNextPage: boolean, ref: LegacyRef<HTMLDivElement> | undefined }) {
  return (
    <>
      {isPending || !notifications ? <div className="w-full h-[500px] p-10">
        <Spinner />
      </div> :
        NotificationsList.map((notification, i) => (
          <>
            <Notification
              key={notification.createdAt}
              createdAt={notification.createdAt}
              retweet={notification.retweet}
              reply={notification.reply}
              like={notification.like}
              follower={notification.follower}
              type={notification.type}
            />
            {(hasNextPage || isFetchingNextPage) && i === NotificationsList.length - 1 && (
              <div className="py-10">
                <div ref={ref}></div>
                <Spinner />
              </div>
            )}
          </>
        ))

      }</>

  )
}

function Notification({ type, createdAt, follower, retweet, reply, like }: NotificationsType) {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user")!) as UserType;
  const { VITE_DEFAULT_IMAGE } = import.meta.env;
  const handleUrl = () => {
    if (type == "follow")
      navigate('/profile/' + follower!.userName)
    else if (type == "like")
      navigate('/tweet/' + like!.id)
    else if (type == "retweet")
      navigate('/tweet/' + retweet!.id)

  }
  const location = useLocation();
  const formatDateMonthYear = (dateString: string) => {
    const date = moment(dateString);
    return date.format('MMM DD, YYYY');
  };
  if (type == 'reply') {
    return (

      <TweetComponent
        tweet={reply!}
      />

    )
  }
  return (
    <div className="px-4 py-3 cursor-pointer flex flex-row border-b border-primary border-opacity-30" onClick={handleUrl}>
      <div className=" mr-3 w-10 h-full flex justify-end basis-10">
        {
          type == 'follow' && <User className="text-transparent w-8 h-8" fill="#1d9bf0" />}
        {
          type == 'retweet' && <BiRepost className="text-transparent w-9 h-[38px]" fill="#00ba7c" />
        }
        {
          type == 'like' && <Heart className="text-transparent w-8 h-8" fill="#f91880" />
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
              <img className="w-10 aspect-square p-1 rounded-full " src={follower?.profileImageUrl || like?.liker.profileImageUrl || VITE_DEFAULT_IMAGE} alt="" />
            </div>
          </div>
            <div>
              <div className="flex flex-row items-center gap-1 transition-all">
                <UserNameHoverCard
                  name={(follower || like?.liker || retweet?.author)?.name || ""}
                  isFollowing={(follower || like?.liker || retweet?.author)?.isFollowing || false}
                  description={(follower || like?.liker || retweet?.author)?.description || ""}
                  userName={(follower || like?.liker || retweet?.author)?.userName || ""}
                  followersCount={(follower || like?.liker || retweet?.author)?.followersCount || 0}
                  followingCount={(follower || like?.liker || retweet?.author)?.followingCount || 0}
                  profileImageUrl={(follower || like?.liker || retweet?.author)?.profileImageUrl || VITE_DEFAULT_IMAGE}
                />
                <p > {type == 'follow' ? "followed you" : type == 'retweet' ? "reposted your post" : "liked your post"}</p>
              </div>
              {type == "like" && <p className="text-sm text-gray mt-2 w-full max-sm:w-[50vw]"><p className="max-w-[88%] truncate">{like!.text}</p> <span className="break-words">{like!.entities.media.length > 0 && ' ' + like!.entities.media[0].value.substring(0, 70) + '...'} </span></p>}
              {type == "retweet" && <p className="text-sm text-gray mt-2 w-full max-sm:w-[50vw] "><span className="max-w-[10vw] truncate">{retweet!.retweetedTweet!.text}</span>
                <span className="break-words ">{retweet!.retweetedTweet!.entities.media.length > 0 && ' ' + retweet!.retweetedTweet!.entities.media[0].value.substring(0, 70) + '...'}</span> </p>}
            </div></>}
      </div>
    </div>
  )
}

