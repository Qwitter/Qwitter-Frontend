import { Tweet, TweetWithReplyAndRetweet } from "@/models/Tweet";
import TweetOptionsMenu from "../TweetOptionsMenu/TweetOptionsMenu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import moment from "moment";
import { TbDiscountCheckFilled } from "react-icons/tb";
import { Link } from "react-router-dom";
import { cn, convertNumberToShortForm } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/UserContextProvider";
import { FollowButton } from "../FollowButton/FollowButton";

type TweetAuthorHeaderProps = {
  tweet: TweetWithReplyAndRetweet;
  mode?: "list" | "page";
};
const TweetAuthorHeader = ({
  tweet,
  mode = "list",
}: TweetAuthorHeaderProps) => {
  const { token, user } = useContext(UserContext);
  const [tweetClone, setTweetClone] = useState<Tweet>(tweet);
  const queryClient = useQueryClient();

  useEffect(() => {
    setTweetClone(tweet);
  }, [tweet]);

  const followLocalUser = () => {
    setTweetClone((prev: Tweet) => ({
      ...prev,
      isFollowing: true,
    }));
  };

  const unFollowLocalUser = () => {
    setTweetClone((prev: Tweet) => ({
      ...prev,
      isFollowing: false,
    }));
  };

  const followInvalidation = () => {
    if (tweetClone.isFollowing) {
      unFollowLocalUser();
    } else {
      followLocalUser();
    }

    queryClient.invalidateQueries({
      queryKey: ["profile", token, tweet.author.userName],
    });

    queryClient.invalidateQueries({
      queryKey: ["tweets"],
    });
  };

  return (
    <Link to="#" className="w-full flex items-start">
      <div className="flex flex-col w-full">
        <h3
          data-testid="authorName"
          className={cn("flex gap-1 font-semibold items-center w-full", {
            "flex-col gap-0 self-start text-start items-start": mode === "page",
          })}
        >
          <HoverCard>
            <HoverCardTrigger className="hover:underline">
              <Link to={`/profile/${tweet.author.userName}`}>
                {tweet.author.name}
              </Link>
            </HoverCardTrigger>
            <HoverCardContent className="w-72 bg-black text-start box-shadow">
              <div className="w-full cursor-default flex flex-col">
                <div className="flex w-full justify-between">
                  <Avatar className="w-16 h-16 mb-5">
                    <AvatarImage src={`${tweet.author.profileImageUrl}`} />
                    <AvatarFallback>
                      {tweet.author.userName.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  {tweet.author.userName !== user?.userName && (
                    <div onClick={(e) => e.preventDefault()}>
                      <FollowButton
                        isFollowing={tweetClone.isFollowing}
                        username={tweetClone.author.userName}
                        className={cn("h-[35px] min-w-20")}
                        onClick={followInvalidation}
                      />
                    </div>
                  )}
                </div>
                <Link
                  to={`/profile/${tweet.author.userName}`}
                  className="hover:underline self-start"
                >
                  <h3 className="font-semibold">{tweet.author.name}</h3>
                </Link>
                <span className="text-gray text-sm">
                  @{tweet.author.userName}
                </span>
                <p className="my-4">{tweet.author.description}</p>
                <div className="flex items-center">
                  <span className="text-primary">
                    {convertNumberToShortForm(tweet.author.followingCount)}{" "}
                    <span className="text-gray">Following</span>
                  </span>
                  <span className="text-primary mx-2">
                    {convertNumberToShortForm(tweet.author.followersCount)}{" "}
                    <span className="text-gray">Followers</span>
                  </span>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>

          {tweet.author.verified && (
            <TbDiscountCheckFilled className="text-blue-400 text-xl" />
          )}
          <span className="flex text-gray font-normal text-sm">
            @{tweet.author.userName}
            {mode === "list" &&
              (moment().diff(moment(tweet.createdAt), "days") >= 1
                ? ` · ${moment(tweet.createdAt).format("MMM D")}`
                : ` · ${moment(tweet.createdAt).fromNow(true)}`)}
          </span>
        </h3>
        {tweet.replyToTweet && (
          <h5 className="text-gray text-sm mb-2">
            Replying to{" "}
            <Link
              className="text-secondary hover:underline"
              to={`/Tweet/${tweet.replyToTweetId}`}
            >
              {tweet.replyToTweet.author.userName}'s tweet
            </Link>
            {/* <Link to={`/Profile/${tweet.replyToTweet.author.userName}`} className="text-secondary hover:underline">
              {tweet.replyToTweet.author ? tweet.replyToTweet.author.userName : "Loading..."}
            </Link> */}
          </h5>
        )}
      </div>
      <TweetOptionsMenu
        author={tweet.author}
        isFollowing={tweet.isFollowing}
        isMuted={tweet.isMuted}
        tweetId={tweet.id}
      />
    </Link>
  );
};
export default TweetAuthorHeader;
