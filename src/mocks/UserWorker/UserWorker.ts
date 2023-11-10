import { HttpResponse, ResponseResolver } from "msw";

export const userWorker: ResponseResolver = async ({ request }) => {
  const token = request.headers.get("Authorization")?.split(" ")[1];
  if (!token)
    return HttpResponse.json({ message: "Invalid token" }, { status: 401 });

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return HttpResponse.json(
    {
      data: {
        userName: "johndoe123",
        name: "John Doe",
        birthDate: new Date().toISOString(),
        email: "sofa5060@gmail.com",
        url: "www.johndoe.com",
        description: "oh hello there",
        protected: false,
        verified: true,
        followerCount: 0,
        followingCount: 5,
        createdAt: new Date().toISOString(),
        profileBannerUrl:
          "https://notdeterminedyet.com/profile_banners/819797/1348102824",
        profileImageUrl:
          "https://notdeterminedyet.com/profile_banners/819797/1348102824",
      },
    },
    {
      status: 200,
    }
  );
};
