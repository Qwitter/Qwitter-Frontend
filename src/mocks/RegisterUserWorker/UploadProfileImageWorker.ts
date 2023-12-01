import { HttpResponse, ResponseResolver } from "msw";

export const UploadProfileImageWorker: ResponseResolver = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // if (request.headers.get("Authorization") == "Bearer abc123") {
  return HttpResponse.json(
    {
      message: "Image uploaded successfully",
      user: {
        userName: "johndoe123",
        name: "Seif Hany",
        email: "sofa5060@gmail.com",
        birthDate: "2020-03-09T22:18:26.625Z",
        url: "www.johndoe.com",
        description: "Hi i am john doe",
        protected: false,
        verified: true,
        followersCount: 12312,
        followingCount: 1932,
        createdAt: "2020-03-09T22:18:26.625Z",
        profileBannerUrl:
          "https://notdeterminedyet.com/profile_banners/819797/1348102824",
        profileImageUrl:
          "https://notdeterminedyet.com/profile_banners/819797/1348102824",
      },
    },
    { status: 200 }
  );
  // } else {
  //   return HttpResponse.json(
  //     {
  //       message: "Invalid token",
  //     },
  //     {
  //       status: 401,
  //     }
  //   );
  // }
};
