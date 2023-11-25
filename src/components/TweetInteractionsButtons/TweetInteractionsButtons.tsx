import { Tweet } from "@/models/Tweet";
import { BiRepost } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
// import { RiReplyLine } from "react-icons/ri";
// import { BsBookmarkFill } from "react-icons/bs";
import { BsBookmark } from "react-icons/bs";
import { GoComment } from "react-icons/go";
import { IoMdStats } from "react-icons/io";
import { convertNumberToShortForm } from "@/lib/utils";

type TweetInteractionsButtonsProps = {
  tweet: Tweet;
};

const TweetInteractionsButtons = ({ tweet }: TweetInteractionsButtonsProps) => {
  return (
    <div className="flex gap-4 mt-4 text-gray justify-between">
      <div className="tweet-icon-container group">
        <div className="relative">
          <div className="tweet-icon-radius group-hover:bg-secondary"></div>
          <GoComment className="tweet-icon group-hover:text-secondary" />
        </div>
        <span className="text-gray-500 transition-all group-hover:text-secondary">
          {convertNumberToShortForm(tweet.replyCount)}
        </span>
      </div>
      <div className="tweet-icon-container group">
        <div className="relative">
          <div className="tweet-icon-radius group-hover:bg-[#00ba7c]"></div>
          <BiRepost className="tweet-icon group-hover:text-[#00ba7c]" />
        </div>
        <span className="text-gray-500 transition-all group-hover:text-[#00ba7c]">
          {convertNumberToShortForm(tweet.retweetCount)}
        </span>
      </div>
      <div className="tweet-icon-container group">
        <div className="relative">
          <div className="tweet-icon-radius group-hover:bg-[#f91880]"></div>
          <AiOutlineHeart className="tweet-icon group-hover:text-[#f91880]" />
        </div>
        <span className="text-gray-500 transition-all group-hover:text-[#f91880]">
          {convertNumberToShortForm(tweet.likesCount)}
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
      <div className="relative cursor-pointer group">
        <div className="tweet-icon-radius group-hover:bg-secondary"></div>
        <BsBookmark className="tweet-icon group-hover:text-secondary" />
      </div>
    </div>
  );
};
export default TweetInteractionsButtons;
