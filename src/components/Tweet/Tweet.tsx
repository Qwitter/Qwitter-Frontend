import { type Tweet } from "@/models/Tweet";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import moment from "moment";
import { Link } from "react-router-dom";
import { TbDiscountCheckFilled } from "react-icons/tb";
import TweetInteractionsButtons from "../TweetInteractionsButtons/TweetInteractionsButtons";
import TweetImagesViewer from "../TweetImagesViewer/TweetImagesViewer";
import TweetOptionsMenu from "../TweetOptionsMenu/TweetOptionsMenu";

const convertWordToAnchor = (word: string): JSX.Element => {
  if (word.startsWith("@")) {
    return (
      <Link
        to={`/user/${word.substring(1).toLowerCase()}`}
        className="text-secondary"
      >
        {word}
      </Link>
    );
  } else {
    return (
      <Link to={`/search/?q=${word.substring(1)}`} className="text-secondary">
        {word}
      </Link>
    );
  }
};

const tweetTextHighlighter = (text: string): JSX.Element => {
  const regex = /(@|#)([a-zA-Z0-9_]+)/g;
  const matches = text.match(regex);
  if (!matches) return <p className="text-gray-700">{text}</p>;
  const temp = text;
  const words = temp.split(" ");
  return (
    <p className="text-gray-700">
      {words.map((word, i) => {
        if (word.match(regex))
          return <span key={i}>{convertWordToAnchor(word)} </span>;
        return word + " ";
      })}
    </p>
  );
};

type TweetProps = {
  tweet: Tweet;
};

const Tweet = ({ tweet }: TweetProps) => {
  return (
    <div className="w-full flex px-4 py-3 gap-4 border-b border-primary border-opacity-30">
      <Avatar>
        <AvatarImage src={`${tweet.author.profileImageUrl}`} />
        <AvatarFallback>{tweet.author.userName.substring(0, 2)}</AvatarFallback>
      </Avatar>
      <article className="w-full">
        <h3 className="flex gap-1 font-semibold items-center">
          {tweet.author.name}
          {tweet.author.verified && (
            <TbDiscountCheckFilled className="text-blue-400 text-xl" />
          )}
          <span className="flex text-gray font-normal">
            @{tweet.author.userName} ·{" "}
            {moment().diff(moment(tweet.createdAt), "days") >= 1
              ? moment(tweet.createdAt).format("MMM D")
              : moment(tweet.createdAt).fromNow(true)}
          </span>
          <TweetOptionsMenu tweet={tweet} />
        </h3>
        <>{tweetTextHighlighter(tweet.text)}</>
        <TweetImagesViewer images={tweet.entities.media} />
        <TweetInteractionsButtons tweet={tweet} />
      </article>
    </div>
  );
};

export default Tweet;
