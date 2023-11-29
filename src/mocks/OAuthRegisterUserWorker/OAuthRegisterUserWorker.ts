import { HttpResponse, ResponseResolver } from "msw";

export const OAuthRegisterUserWorker: ResponseResolver = async ({
  request,
}) => {
  const { birthDate } = (await request.json()) as { birthDate: string };
  const token = request.headers.get("Authorization")?.split(" ")[1];
  if (!token)
    return HttpResponse.json(
      {
        message: "invalid token",
      },
      {
        status: 404,
      }
    );
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return HttpResponse.json(
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZmNTgyOGMyLTBkYzUtNDNlMS1hZmQzLWFhODI3ZmQxODRiYSIsImlhdCI6MTY5OTI3MjE0MiwiZXhwIjoxNzA3MDQ4MTQyfQ.s4Bgs8RJr9U242CdG9cJyiVK6N7_VAVw9mziMdAkFrM",
      "data": {
        "userName": "johndoe123",
        "name": "Ahmed Zahran",
        "birthDate": birthDate,
        "url": "www.johndoe.com",
        "description": "Hi i am john doe",
        "protected": false,
        "verified": true,
        "followersCount": 12312,
        "followingCount": 1932,
        "createdAt": "2020-03-09T22:18:26.625Z",
        "profileBannerUrl": "https://notdeterminedyet.com/profile_banners/819797/1348102824",
        "profileImageUrl": "https://notdeterminedyet.com/profile_banners/819797/1348102824",
        "email": "<string>",
        "username": "<string>"
      }
    },
    {
      status: 200,
    }
  );
};
