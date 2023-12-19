import { TweetWithRetweet, type Tweet } from "@/models/Tweet";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link } from "react-router-dom";
import TweetInteractionsButtons from "../TweetInteractionsButtons/TweetInteractionsButtons";
import TweetImagesViewer from "../TweetImagesViewer/TweetImagesViewer";
import { cn, convertNumberToShortForm } from "@/lib/utils";
import TweetAuthorHeader from "../TweetAuthorHeader/TweetAuthorHeader";
import moment from "moment";
import { BigPlayButton, Player } from "video-react";
import "video-react/dist/video-react.css";
import { BiRepost } from "react-icons/bi";
import { UserContext } from "@/contexts/UserContextProvider";
import { useContext, useMemo } from "react";
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
  const words: string[] = temp.split(" ");
  console.log(words);

  return (
    <p className="text-gray-700">
      {words.map((word, i) => {
        if (word.match(regex)) {
          if (word.includes("\n")) {
            // maybe more than one \n
            const temp = word.split("\n");
            return (
              <span key={i}>
                {temp.map((w, i) => {
                  if (w.match(regex)) {
                    return <span key={i}>{convertWordToAnchor(w)} </span>;
                  }
                  return w + " ";
                })}
              </span>
            );
          }
          return <span key={i}>{convertWordToAnchor(word)} </span>;
        }
        return word + " ";
      })}
    </p>
  );
};

type TweetProps = {
  tweet: TweetWithRetweet;
  size?: "normal" | "compact";
  mode?: "list" | "page";
  retweeter?: Tweet["author"];
};

const Tweet = ({
  tweet,
  mode = "list",
  size = "normal",
  retweeter,
}: TweetProps) => {
  const { user } = useContext(UserContext);

  const highlightedTweet = useMemo(() => {
    return tweetTextHighlighter(tweet.text);
  }, [tweet.text]);

  if (tweet.retweetedTweet)
    return (
      <Tweet
        tweet={tweet.retweetedTweet}
        mode={mode}
        size={size}
        retweeter={tweet.author}
      />
    );

  return (
    <div data-testid="tweetDiv">
      <Link
        to={mode === "list" ? `/tweet/${tweet.id}` : "#"}
        className={cn(
          "w-full flex px-4 py-3 gap-4 transition-all cursor-default",
          {
            "hover:bg-[#080808] cursor-pointer  border-b border-primary border-opacity-30":
              mode === "list",
          }
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
        <article className="w-full overflow-hidden">
          {mode === "page" ? (
            <div>
              {retweeter && (
                <div className="flex items-center w-full gap-2 mb-2 ml-4">
                  <BiRepost className="text-gray text-xl" />
                  <span className="text-gray text-xm">
                    {retweeter.userName === user?.userName
                      ? "You"
                      : retweeter.name}{" "}
                    Retweeted
                  </span>
                </div>
              )}
              <div className="flex items-center w-full gap-2 mb-2">
                <Avatar>
                  <AvatarImage src={`${tweet.author.profileImageUrl}`} />
                  <AvatarFallback>
                    {tweet.author.userName.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <TweetAuthorHeader tweet={tweet} mode={mode} />
              </div>
            </div>
          ) : (
            <>
              {retweeter && (
                <div className="flex items-center w-full gap-2 mb-2">
                  <BiRepost className="text-gray text-xl" />
                  <span className="text-gray text-xm">
                    {retweeter.userName === user?.userName
                      ? "You"
                      : retweeter.name}{" "}
                    Retweeted
                  </span>
                </div>
              )}
              <TweetAuthorHeader tweet={tweet} mode={mode} />
            </>
          )}
          <p className="max-w-full w-full break-words">{highlightedTweet}</p>
          {size === "normal" && tweet.entities &&
            (tweet.entities.media?.[0]?.type === "video" ? (
              <div
                className="my-4 rounded-lg overflow-hidden"
                onClick={(e) => e.preventDefault()}
              >
                <Player
                  playsInline
                  poster="/assets/poster.png"
                  src={tweet.entities.media?.[0].value}
                >
                  <BigPlayButton position="center" />
                </Player>
              </div>
            ) : (
              <TweetImagesViewer images={tweet.entities.media} />
            ))}
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
                <div onClick={(e) => e.preventDefault()}>
                  <TweetInteractionsButtons
                    tweet={tweet}
                    className="my-2.5 px-4"
                    mode={mode}
                  />
                </div>
                <hr className="border-primary border-opacity-30" />
              </div>
            </div>
          ) : (
            <div onClick={(e) => e.preventDefault()}>
              <TweetInteractionsButtons tweet={tweet} className="mt-4" mode={mode}/>
            </div>
          )}
        </article>
      </Link>
      {mode === "page" && (
        <CreateTweetContainer
          mode="reply"
          replyToUser={tweet.author.userName}
          replyToTweetId={tweet.id}
        />
      )}
    </div>
  );
};

export default Tweet;
