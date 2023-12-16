import { Tweet } from "@/models/Tweet";
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

type TweetAuthorHeaderProps = {
  tweet: Tweet;
  mode?: "list" | "page";
};
const TweetAuthorHeader = ({
  tweet,
  mode = "list",
}: TweetAuthorHeaderProps) => {
  return (
    <div className="w-full flex items-center">
      <h3
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
            <Link to="#" className="w-full cursor-default flex flex-col">
              <Avatar className="w-16 h-16 mb-5">
                <AvatarImage src={`${tweet.author.profileImageUrl}`} />
                <AvatarFallback>
                  {tweet.author.userName.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
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
            </Link>
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
      <TweetOptionsMenu tweet={tweet} />
    </div>
  );
};
export default TweetAuthorHeader;
