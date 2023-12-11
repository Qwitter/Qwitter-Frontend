import { HttpResponse, ResponseResolver } from "msw";

export const userProfileWorker: ResponseResolver = async ({ request }) => {
  const token = request.headers.get("Authorization")?.split(" ")[1];

  if (!token)
    return HttpResponse.json({ message: "Invalid token" }, { status: 401 });

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return HttpResponse.json(
    {
      data: {
        userName: "johndoe123",
        name: "Mohamed Atef",
        birthDate: new Date().toISOString(),
        email: "sofa5060@gmail.com",
        url: "www.atef.com",
        description: "working on profile page",
        protected: false,
        verified: true,
        followersCount: 0,
        followingCount: 5,
        location: "Giza, Egypt",
        createdAt: new Date().toISOString(),
        profileBannerUrl:
          "https://cdnb.artstation.com/p/assets/images/images/069/047/351/large/daito_-img-1285-20231030-023232.jpg?1699242054",
        profileImageUrl: "https://avatars.githubusercontent.com/u/124599?v=4",
      },
    },
    {
      status: 200,
    }
  );
};
