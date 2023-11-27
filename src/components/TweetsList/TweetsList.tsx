import { type Tweet } from "@/models/Tweet";
import { default as TweetComponent } from "../Tweet/Tweet";

const tempTweets: Tweet[] = [
  {
    createdAt: "2023-11-23 5:02:00",
    id: "1718938551163691300",
    user: {
      userName: "AhmedZahran2025",
      name: "Ahmed Zahran",
      profileImageUrl: "qwitter/photos/213902323",
      profileBannerUrl: "qwitter/photos/213902323",
      birthDate: "1999-10-27 10:43:00",
      description: "this is a description",
      createdAt: "2023-10-27 10:43:00",
      email: "test@gmail.com",
      followersCount: 0,
      followingCount: 0,
      verified: false,
      protected: false,
      url: "https://www.google.com",
    },
    replyCount: 0,
    retweetCount: 0,
    qouteCount: 0,
    likesCount: 1,
    text: "this is a tweet string @ahmedoshelmy #Palestine",
    source: "Iphone",
    liked: true,
    bookmarked: false,
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
          value:
            "https://pbs.twimg.com/media/F_u8-DtXkAA7pKd?format=jpg&name=large",
          type: "photo",
        },
        {
          value:
            "https://pbs.twimg.com/media/F_u8-DsWMAAFSPl?format=jpg&name=large",
          type: "photo",
        },
        // {
        //   value:
        //     "https://pbs.twimg.com/media/F_u8-DvWUAAqnkf?format=jpg&name=large",
        //   type: "photo",
        // },
        // {
        //   value:
        //     "https://pbs.twimg.com/media/F_u8-DwXAAAXrkN?format=jpg&name=large",
        //   type: "photo",
        // },
        {
          value:
            "https://pbs.twimg.com/media/F_u9Wq4XkAAj0qU?format=jpg&name=large",
          type: "photo",
        },
        {
          value:
            "https://pbs.twimg.com/media/F_u9S-Eb0AACw7j?format=jpg&name=large",
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
  {
    createdAt: "2023-11-23 5:02:00",
    id: "1718938551163691301",
    user: {
      userName: "AhmedZahran2025",
      name: "Ahmed Zahran",
      profileImageUrl: "qwitter/photos/213902323",
      profileBannerUrl: "qwitter/photos/213902323",
      birthDate: "1999-10-27 10:43:00",
      description: "this is a description",
      createdAt: "2023-10-27 10:43:00",
      email: "test@gmail.com",
      followersCount: 0,
      followingCount: 0,
      verified: false,
      protected: false,
      url: "https://www.google.com",
    },
    replyCount: 0,
    retweetCount: 0,
    qouteCount: 0,
    likesCount: 0,
    text: "this is a tweet string @ahmedoshelmy #Palestine",
    source: "Iphone",
    coordinates: "30.037072,31.206344",
    liked: false,
    bookmarked: false,
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
      media: [],
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
    <div className="max-w-[600px] mx-auto border-primary border-opacity-30 border-t">
      {tweets.map((tweet) => (
        <TweetComponent tweet={tweet} key={tweet.id} />
      ))}
    </div>
  );
};

export default TweetsList;
