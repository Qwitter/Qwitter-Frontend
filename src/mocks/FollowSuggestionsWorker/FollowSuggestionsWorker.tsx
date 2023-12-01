import { HttpResponse, ResponseResolver } from "msw";

export const FollowSuggestionsWorker: ResponseResolver = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return HttpResponse.json(
    {
      data: [
        {
          name: "yousef",
          userName: "yousef02",
          verified: true,
          description: "this is the fucking description",
          profileImageUrl:
            "https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          isFollowing: false,
        },
        {
          name: "osama",
          userName: "osama02",
          verified: false,
          description: "this is the fucking description",
          profileImageUrl:
            "https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          isFollowing: false,
        },
      ],
    },
    {
      status: 200,
    }
  );
};
