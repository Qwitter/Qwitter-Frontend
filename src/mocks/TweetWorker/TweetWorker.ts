import { HttpResponse, ResponseResolver } from "msw";

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
