import { type Tweet } from "@/models/Tweet";
import { default as TweetComponent } from "../Tweet/Tweet";

const tempTweets: Tweet[] = [
  {
    createdAt: "2023-10-27 10:43:00",
    id: "1718938551163691300",
    userName: "AhmedZahran2025",
    replyCount: 0,
    retweetCount: 0,
    qouteCount: 0,
    likesCount: 0,
    text: "this is a tweet string",
    source: "Iphone",
    coordinates: "30.037072,31.206344",
    replyToTweetId: "1718938551163691300",
    retweetedId: "1718938551163691300",
    qouteTweetedId: "1718938551163691300",
    sensitive: false,
    entities: {
      hasthtags: [
        {
          value: "#Palestine",
        },
      ],
      media: [
        {
          value: "qwitter/photos/213902323",
          type: "photo",
        },
      ],
      mentions: [
        {
          mentionedUsername: "ahmedoshelmy",
        },
      ],
      urls: [
        {
          value: "qwitter/photos/213902323",
        },
      ],
    },
  },
];

type TweetsListProps = {
  tweets?: Tweet[];
};

const TweetsList = ({ tweets = tempTweets }: TweetsListProps) => {
  return (
    <div className="max-w-[600px] mx-auto">
      {tweets.map((tweet) => (
        <TweetComponent tweet={tweet} key={tweet.id} />
      ))}
    </div>
  );
};

export default TweetsList;
