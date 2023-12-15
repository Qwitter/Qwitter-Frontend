import { Tweet } from "@/models/Tweet";
import { HttpResponse, ResponseResolver } from "msw";

const tempTweet: Tweet = {
  createdAt: "2023-11-23 5:02:00",
  id: "1718938551163691300",
  author: {
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
  hasRetweeted: false,
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
}

export const getTweetWorker: ResponseResolver = async ({ request }) => {
  const token = request.headers.get("Authorization")?.split(" ")[1];

  if (!token)
    return HttpResponse.json({ message: "invalid token" }, { status: 404 });

  // Add a delay for simulation purposes
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return HttpResponse.json(
    {
      tweet: tempTweet,
    },
    { status: 200 }
  );
};

export const likeTweetWorker: ResponseResolver = async ({
  request,
  params,
}) => {
  const token = request.headers.get("Authorization")?.split(" ")[1];
  const { tweetId } = params as {
    tweetId: string;
  };

  if (!token)
    return HttpResponse.json({ message: "invalid token" }, { status: 404 });

  // Add a delay for simulation purposes
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return HttpResponse.json(
    {
      message: "Tweet liked successfully",
      data: { tweetId },
    },
    { status: 200 }
  );
};

export const unLikeTweetWorker: ResponseResolver = async ({
  request,
  params,
}) => {
  const token = request.headers.get("Authorization")?.split(" ")[1];
  const { tweetId } = params as {
    tweetId: string;
  };

  if (!token)
    return HttpResponse.json({ message: "invalid token" }, { status: 404 });

  // Add a delay for simulation purposes
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return HttpResponse.json(
    {
      message: "Tweet unLiked successfully",
      data: { tweetId },
    },
    { status: 200 }
  );
};

export const bookmarkTweetWorker: ResponseResolver = async ({
  request,
  params,
}) => {
  const token = request.headers.get("Authorization")?.split(" ")[1];
  const { tweetId } = params as {
    tweetId: string;
  };

  if (!token)
    return HttpResponse.json({ message: "invalid token" }, { status: 404 });

  // Add a delay for simulation purposes
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return HttpResponse.json(
    {
      message: "Tweet bookmarked successfully",
      data: { tweetId },
    },
    { status: 200 }
  );
};

export const unBookmarkTweetWorker: ResponseResolver = async ({
  request,
  params,
}) => {
  const token = request.headers.get("Authorization")?.split(" ")[1];
  const { tweetId } = params as {
    tweetId: string;
  };

  if (!token)
    return HttpResponse.json({ message: "invalid token" }, { status: 404 });

  // Add a delay for simulation purposes
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return HttpResponse.json(
    {
      message: "Tweet unBookmarked successfully",
      data: { tweetId },
    },
    { status: 200 }
  );
};

export const deleteTweetWorker: ResponseResolver = async ({
  request,
  params,
}) => {
  const token = request.headers.get("Authorization")?.split(" ")[1];
  const { tweetId } = params as {
    tweetId: string;
  };

  if (!token)
    return HttpResponse.json({ message: "invalid token" }, { status: 404 });

  // Add a delay for simulation purposes
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return HttpResponse.json(
    {
      message: "Tweet deleted successfully",
      data: { tweetId },
    },
    { status: 200 }
  );
};


export const createTweetWorker: ResponseResolver = async ({
  request,
}) => {
  const token = request.headers.get("Authorization")?.split(" ")[1];

  if (!token)
    return HttpResponse.json({ message: "invalid token" }, { status: 404 });

  // Add a delay for simulation purposes
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return HttpResponse.json(
    {
      message: "Tweet created successfully",
      data: { tweet: tempTweet },
    },
    { status: 200 }
  );
}