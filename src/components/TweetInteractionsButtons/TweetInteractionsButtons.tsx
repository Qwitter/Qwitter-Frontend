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
import { useContext, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserContext } from "@/contexts/UserContextProvider";
import { toast } from "../ui/use-toast";
import { useNavigate, useParams } from "react-router-dom";

type TweetInteractionsButtonsProps = {
  tweet: Tweet;
  className?: string;
  mode?: "list" | "page";
  userRetweetId?: string;
};

const TweetInteractionsButtons = ({
  tweet,
  className,
  mode = "list",
}: TweetInteractionsButtonsProps) => {
  const { tweetId } = useParams<{ tweetId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [tweetClone, setTweetClone] = useState<Tweet>(tweet);
  const [isRetweeted, setIsRetweeted] = useState<boolean>(
    !!tweet.currentUserRetweetId
  );
  const { token } = useContext(UserContext);

  useEffect(() => {
    setTweetClone(tweet);
    setIsRetweeted(!!tweet.currentUserRetweetId);
  }, [tweet]);

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

      queryClient.invalidateQueries({
        queryKey: ["tweets"],
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

      queryClient.invalidateQueries({
        queryKey: ["tweets"],
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
      retweetCount: prev.retweetCount + 1,
    }));

    setIsRetweeted(true);
  };

  const unRetweetLocalTweet = () => {
    setTweetClone((prev: Tweet) => ({
      ...prev,
      retweetCount: prev.retweetCount - 1,
    }));

    setIsRetweeted(false);
  };

  const { mutate: retweetTweetMutate } = useMutation({
    mutationFn: token
      ? (tweetId: string) => retweet(tweetId, token)
      : undefined,
    onMutate: () => {
      retweetLocalTweet();
    },
    onSettled(data, error) {
      console.log(data);
      if (error) {
        toast({ title: error.message });
        if (isRetweeted) unRetweetLocalTweet();
        return;
      }

      setTweetClone((prev: Tweet) => ({
        ...prev,
        currentUserRetweetId: data?.tweet.retweetedTweet.currentUserRetweetId,
      }));

      console.log(data?.tweet.retweetedTweet.currentUserRetweetId);

      toast({ title: "Retweeted Successfully" });

      queryClient.invalidateQueries({
        queryKey: ["tweet", tweet.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["tweets"],
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
    onSettled: async (_, error) => {
      if (error) {
        toast({ title: error.message });
        if (!isRetweeted) retweetLocalTweet();
        return;
      }

      toast({ title: "Removed Retweet Successfully" });

      console.log(tweet.id);

      await queryClient.invalidateQueries({
        queryKey: ["tweet", tweet.id],
      });

      await queryClient.invalidateQueries({
        queryKey: ["tweets"],
      });

      if (tweetId && tweetClone.currentUserRetweetId! === tweetId) {
        navigate("/home");
      }
    },
  });

  return (
    <div className={cn("flex gap-4 text-gray justify-between", className)}>
      <div
        className="tweet-icon-container group"
        data-testid="Comment"
        onClick={(e) => {
          e.preventDefault();
          if (mode === "page") {
            console.log("same route");
            return;
          }
          navigate(`/tweet/${tweet.id}`);
        }}
      >
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
          isRetweeted
            ? () => unRetweetTweetMutate(tweetClone.currentUserRetweetId!)
            : () => retweetTweetMutate(tweetClone.id)
        }
      >
        <div className="relative">
          <div
            className={cn("tweet-icon-radius group-hover:bg-[#00ba7c]")}
          ></div>
          <BiRepost
            className={cn("tweet-icon group-hover:text-[#00ba7c]", {
              "text-[#00ba7c]": isRetweeted,
            })}
          />
        </div>
        <span
          className={cn(
            "text-gray transition-all group-hover:text-[#00ba7c] duration-200 ease-in-out",
            {
              "text-[#00ba7c]": isRetweeted,
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
          {convertNumberToShortForm(tweetClone.readCount)}
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
