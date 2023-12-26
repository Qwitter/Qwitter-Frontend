import { HttpResponse, ResponseResolver } from "msw";

export const BlockedWorker: ResponseResolver = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return HttpResponse.json(
        {
            data: [
                {
                    name: "seif",
                    userName: "seif02",
                    verified: true,
                    description: "this is the fucking description",
                    profileImageUrl:
                        "https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
                },
                {
                    name: "mrawan",
                    userName: "mrawan02",
                    verified: false,
                    description: "this is the fucking description",
                    profileImageUrl:
                        "https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
                },
            ],
        },
        {
            status: 200,
        }
    );
};
