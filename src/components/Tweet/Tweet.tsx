import { type Tweet } from "@/models/Tweet";
import { Avatar, AvatarFallback } from "../ui/avatar";

type TweetProps = {
  tweet: Tweet;
};

const Tweet = ({ tweet }: TweetProps) => {
  return (
    <div className="w-full">
      <Avatar>
        <AvatarFallback>{tweet.userName.substring(0, 2)}</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default Tweet;
