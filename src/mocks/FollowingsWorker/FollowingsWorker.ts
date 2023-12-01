import { HttpResponse, ResponseResolver } from "msw";

export const FollowingsWorker: ResponseResolver = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return HttpResponse.json(
        {
            data: [
                {
                    name: "ahmed",
                    userName: "ahmed02",
                    verified: true,
                    description: "this is the fucking description",
                    profileImageUrl:
                        "https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
                    isFollowing:true,
                },
                {
                    name: "helmy",
                    userName: "helmy02",
                    verified: false,
                    description: "this is the fucking description",
                    profileImageUrl:
                        "https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
                    isFollowing: true,
                },
            ],
        },
        {
            status: 200,
        }
    );
};
