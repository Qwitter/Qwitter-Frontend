import { Tweet } from "@/models/Tweet";
import { BiRepost } from "react-icons/bi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsBookmarkFill } from "react-icons/bs";
import { BsBookmark } from "react-icons/bs";
import { GoComment } from "react-icons/go";
import { IoMdStats } from "react-icons/io";
import { cn, convertNumberToShortForm } from "@/lib/utils";
import { useState } from "react";

type TweetInteractionsButtonsProps = {
  tweet: Tweet;
};

const TweetInteractionsButtons = ({ tweet }: TweetInteractionsButtonsProps) => {
  const [tweetClone, setTweetClone] = useState<Tweet>(tweet);

  const likeTweet = () => {
    setTweetClone((prev: Tweet) => ({
      ...prev,
      liked: true,
      likesCount: prev.likesCount + 1,
    }));
  };

  const unLikeTweet = () => {
    setTweetClone((prev: Tweet) => ({
      ...prev,
      liked: false,
      likesCount: prev.likesCount - 1,
    }));
  };

  const bookmarkTweet = () => {
    setTweetClone((prev: Tweet) => ({
      ...prev,
      bookmarked: true,
    }));
  };

  const unBookmarkTweet = () => {
    setTweetClone((prev: Tweet) => ({
      ...prev,
      bookmarked: false,
    }));
  };

  return (
    <div className="flex gap-4 mt-4 text-gray justify-between">
      <div className="tweet-icon-container group">
        <div className="relative">
          <div className="tweet-icon-radius group-hover:bg-secondary"></div>
          <GoComment className="tweet-icon group-hover:text-secondary" />
        </div>
        <span className="text-gray-500 transition-all group-hover:text-secondary">
          {convertNumberToShortForm(tweetClone.replyCount)}
        </span>
      </div>
      <div className="tweet-icon-container group">
        <div className="relative">
          <div className="tweet-icon-radius group-hover:bg-[#00ba7c]"></div>
          <BiRepost className="tweet-icon group-hover:text-[#00ba7c]" />
        </div>
        <span className="text-gray-500 transition-all group-hover:text-[#00ba7c]">
          {convertNumberToShortForm(tweetClone.retweetCount)}
        </span>
      </div>
      <div
        className="tweet-icon-container group"
        onClick={tweetClone.liked ? unLikeTweet : likeTweet}
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
            "text-gray-500 transition-all group-hover:text-[#f91880]",
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
        <span className="text-gray-500 transition-all group-hover:text-secondary">
          {convertNumberToShortForm(13000)}
        </span>
      </div>
      <div className="relative cursor-pointer group" onClick={tweetClone.bookmarked ? unBookmarkTweet : bookmarkTweet}>
        <div className="tweet-icon-radius group-hover:bg-secondary"></div>
        {tweetClone.bookmarked ? (
          <BsBookmarkFill
            className="tweet-icon fill-secondary"
            onClick={unBookmarkTweet}
          />
        ) : (
          <BsBookmark
            className="tweet-icon group-hover:text-secondary"
            onClick={bookmarkTweet}
          />
        )}
      </div>
    </div>
  );
};
export default TweetInteractionsButtons;
