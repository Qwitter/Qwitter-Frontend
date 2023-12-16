import { Tweet } from "@/models/Tweet";
import { BiRepost } from "react-icons/bi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsBookmarkFill } from "react-icons/bs";
import { BsBookmark } from "react-icons/bs";
import { GoComment } from "react-icons/go";
import { IoMdStats } from "react-icons/io";
import {
  bookmarkTweet,
  cn,
  convertNumberToShortForm,
  deleteTweet,
  likeTweet,
  retweet,
  unBookmarkTweet,
  unlikeTweet,
} from "@/lib/utils";
import { useContext,  useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserContext } from "@/contexts/UserContextProvider";
import { toast } from "../ui/use-toast";

type TweetInteractionsButtonsProps = {
  tweet: Tweet;
  className?: string;
};

const TweetInteractionsButtons = ({
  tweet,
  className,
}: TweetInteractionsButtonsProps) => {
  const queryClient = useQueryClient();
  const [tweetClone, setTweetClone] = useState<Tweet>(tweet);
  const { token } = useContext(UserContext);

  const likeLocalTweet = () => {
    setTweetClone((prev: Tweet) => ({
      ...prev,
      liked: true,
      likesCount: prev.likesCount + 1,
    }));
  };

  const unLikeLocalTweet = () => {
    setTweetClone((prev: Tweet) => ({
      ...prev,
      liked: false,
      likesCount: prev.likesCount - 1,
    }));
  };

  const { mutate: likeTweetMutate } = useMutation({
    mutationFn: token
      ? (tweetId: string) => likeTweet(tweetId, token)
      : undefined,
    onMutate: () => {
      likeLocalTweet();
    },
    onSettled(_, error) {
      if (error) {
        toast({ title: error.message });
        if (tweetClone.liked) unLikeLocalTweet();
      }

      queryClient.invalidateQueries({
        queryKey: ["tweet", tweet.id],
      });
    },
  });

  const { mutate: unLikeTweetMutate } = useMutation({
    mutationFn: token
      ? (tweetId: string) => unlikeTweet(tweetId, token)
      : undefined,
    onMutate: () => {
      unLikeLocalTweet();
    },
    onSettled(_, error) {
      if (error) {
        toast({ title: error.message });
        if (!tweetClone.liked) likeLocalTweet();
      }

      queryClient.invalidateQueries({
        queryKey: ["tweet", tweet.id],
      });
    },
  });

  const bookmarkLocalTweet = () => {
    setTweetClone((prev: Tweet) => ({
      ...prev,
      bookmarked: true,
    }));
  };

  const unBookmarkLocalTweet = () => {
    setTweetClone((prev: Tweet) => ({
      ...prev,
      bookmarked: false,
    }));
  };

  const { mutate: bookmarkTweetMutate } = useMutation({
    mutationFn: token
      ? (tweetId: string) => bookmarkTweet(tweetId, token)
      : undefined,
    onMutate: () => {
      bookmarkLocalTweet();
    },
    onSettled(_, error) {
      if (error) {
        unBookmarkLocalTweet();
        toast({ title: error.message });
      }

      queryClient.invalidateQueries({
        queryKey: ["tweet", tweet.id],
      });
    },
  });

  const { mutate: unBookmarkTweetMutate } = useMutation({
    mutationFn: token
      ? (tweetId: string) => unBookmarkTweet(tweetId, token)
      : undefined,
    onMutate: () => {
      unBookmarkLocalTweet();
    },
    onSettled(_, error) {
      if (error) {
        bookmarkLocalTweet();
        toast({ title: error.message });
      }

      queryClient.invalidateQueries({
        queryKey: ["tweet", tweet.id],
      });
    },
  });

  const retweetLocalTweet = () => {
    setTweetClone((prev: Tweet) => ({
      ...prev,
      hasRetweeted: true,
      retweetCount: prev.retweetCount + 1,
    }));
  };

  const unRetweetLocalTweet = () => {
    setTweetClone((prev: Tweet) => ({
      ...prev,
      hasRetweeted: false,
      retweetCount: prev.retweetCount - 1,
    }));
  };

  const { mutate: retweetTweetMutate } = useMutation({
    mutationFn: token
      ? (tweetId: string) => retweet(tweetId, token)
      : undefined,
    onMutate: () => {
      retweetLocalTweet();
    },
    onSettled(_, error) {
      if (error) {
        toast({ title: error.message });
        if (tweetClone.hasRetweeted) unRetweetLocalTweet();
      }

      queryClient.invalidateQueries({
        queryKey: ["tweet", tweet.id],
      });
    },
  });

  const { mutate: unRetweetTweetMutate } = useMutation({
    mutationFn: token
      ? (tweetId: string) => deleteTweet(tweetId, token)
      : undefined,
    onMutate: () => {
      unRetweetLocalTweet();
    },
    onSettled(_, error) {
      if (error) {
        toast({ title: error.message });
        if (!tweetClone.hasRetweeted) retweetLocalTweet();
      }

      queryClient.invalidateQueries({
        queryKey: ["tweet", tweet.id],
      });
    },
  });

  return (
    <div className={cn("flex gap-4 text-gray justify-between", className)}>
      <div className="tweet-icon-container group" data-testid="Comment">
        <div className="relative">
          <div className="tweet-icon-radius group-hover:bg-secondary"></div>
          <GoComment className="tweet-icon group-hover:text-secondary" />
        </div>
        <span className="text-gray transition-all group-hover:text-secondary duration-200 ease-in-out">
          {convertNumberToShortForm(tweetClone.replyCount)}
        </span>
      </div>

      <div
        className="tweet-icon-container group"
        data-testid="Retweet"
        onClick={
          tweetClone.hasRetweeted
            ? () => unRetweetTweetMutate(tweet.id)
            : () => retweetTweetMutate(tweet.id)
        }
      >
        <div className="relative">
          <div
            className={cn("tweet-icon-radius group-hover:bg-[#00ba7c]", {
              "bg-[#00ba7c]": tweetClone.hasRetweeted,
            })}
          ></div>
          <BiRepost
            className={cn("tweet-icon group-hover:text-[#00ba7c]", {
              "text-[#00ba7c]": tweetClone.hasRetweeted,
            })}
          />
        </div>
        <span
          className={cn(
            "text-gray transition-all group-hover:text-[#00ba7c] duration-200 ease-in-out",
            {
              "text-[#00ba7c]": tweetClone.hasRetweeted,
            }
          )}
        >
          {convertNumberToShortForm(tweetClone.retweetCount)}
        </span>
      </div>
      <div
        className="tweet-icon-container group"
        onClick={
          tweetClone.liked
            ? () => unLikeTweetMutate(tweet.id)
            : () => likeTweetMutate(tweet.id)
        }
        data-testid="Like"
      >
        <div className="relative">
          <div className="tweet-icon-radius group-hover:bg-[#f91880]"></div>
          {tweetClone.liked ? (
            <AiFillHeart className="tweet-icon fill-[#f91880]" />
          ) : (
            <AiOutlineHeart className="tweet-icon group-hover:text-[#f91880]" />
          )}
        </div>
        <span
          className={cn(
            "text-gray transition-all group-hover:text-[#f91880] duration-200 ease-in-out",
            { "text-[#f91880]": tweetClone.liked }
          )}
        >
          {convertNumberToShortForm(tweetClone.likesCount)}
        </span>
      </div>
      <div className="tweet-icon-container group">
        <div className="relative">
          <div className="tweet-icon-radius group-hover:bg-secondary"></div>
          <IoMdStats className="tweet-icon group-hover:text-secondary" />
        </div>
        <span className="text-gray transition-all group-hover:text-secondary duration-200 ease-in-out">
          {convertNumberToShortForm(13000)}
        </span>
      </div>
      <div
        className="relative cursor-pointer group"
        onClick={
          tweetClone.bookmarked
            ? () => unBookmarkTweetMutate(tweet.id)
            : () => bookmarkTweetMutate(tweet.id)
        }
      >
        <div className="tweet-icon-radius group-hover:bg-secondary"></div>
        {tweetClone.bookmarked ? (
          <BsBookmarkFill className="tweet-icon fill-secondary" />
        ) : (
          <BsBookmark className="tweet-icon group-hover:text-secondary" />
        )}
      </div>
    </div>
  );
};
export default TweetInteractionsButtons;
