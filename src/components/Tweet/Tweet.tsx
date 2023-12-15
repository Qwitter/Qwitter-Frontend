import { TweetWithRetweet, type Tweet } from "@/models/Tweet";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link } from "react-router-dom";
import TweetInteractionsButtons from "../TweetInteractionsButtons/TweetInteractionsButtons";
import TweetImagesViewer from "../TweetImagesViewer/TweetImagesViewer";
import { cn, convertNumberToShortForm } from "@/lib/utils";
import TweetAuthorHeader from "../TweetAuthorHeader/TweetAuthorHeader";
import moment from "moment";
import CreateTweetContainer from "../CreateTweet/CreateTweetContainer";

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
  tweet: TweetWithRetweet;
  size?: "normal" | "compact";
  mode?: "list" | "page";
};

const Tweet = ({ tweet, mode = "list", size = "normal" }: TweetProps) => {
  if (tweet.retweetedTweet)
    return <Tweet tweet={tweet.retweetedTweet} mode={mode} size={size} />;

  return (
    <div data-testid="tweetDiv">
      <Link
        to={mode === "list" ? `/tweet/${tweet.id}` : "#"}
        className={cn(
          "w-full flex px-4 py-3 gap-4 transition-all cursor-default",
          { "hover:bg-[#080808] cursor-pointer  border-b border-primary border-opacity-30": mode === "list" }
        )}
      >
        {mode === "list" && (
          <Avatar>
            <AvatarImage src={`${tweet.author.profileImageUrl}`} />
            <AvatarFallback>
              {tweet.author.userName.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
        )}
        <article className="w-full">
          {mode === "page" ? (
            <div className="flex items-center w-full gap-2 mb-2">
              <Avatar>
                <AvatarImage src={`${tweet.author.profileImageUrl}`} />
                <AvatarFallback>
                  {tweet.author.userName.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <TweetAuthorHeader tweet={tweet} mode={mode} />
            </div>
          ) : (
            <TweetAuthorHeader tweet={tweet} mode={mode} />
          )}
          <>{tweetTextHighlighter(tweet.text)}</>
          {size === "normal" && (
            <TweetImagesViewer images={tweet.entities.media} />
          )}
          {mode === "page" ? (
            <div className="mt-4">
              <h3 className="text-gray font-normal text-sm mb-4">
                {moment(tweet.createdAt).format("h:mm A · MMM D, YYYY · ")}
                <span className="text-primary text-base font-bold">
                  {convertNumberToShortForm(377800)}
                </span>
                {" Views"}
              </h3>
              <div>
                <hr className="border-primary border-opacity-30" />
                <TweetInteractionsButtons
                  tweet={tweet}
                  className="my-2.5 px-4"
                />
                <hr className="border-primary border-opacity-30" />
              </div>
            </div>
          ) : (
            <TweetInteractionsButtons tweet={tweet} className="mt-4" />
          )}
        </article>
      </Link>
      {mode === "page" && <CreateTweetContainer mode="reply" replyToUser={tweet.author.userName} replyToTweetId={tweet.id}  />
      }
    </div>
  );
};

export default Tweet;
