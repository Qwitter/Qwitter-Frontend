import { SignUpDataSchema } from "@/models/SignUp";
import { HttpResponse, ResponseResolver } from "msw";
import { z } from "zod";

interface SignUpDataSchemaWithBirthdate
  extends z.infer<typeof SignUpDataSchema> {
  birthDate: string;
}

export const RegisterUserWorker: ResponseResolver = async ({ request }) => {
  const body = (await request.json()) as SignUpDataSchemaWithBirthdate;
  const { name, email, birthDate } = body;
  const date = new Date();

  await new Promise((resolve) => setTimeout(resolve, 1000));
  return HttpResponse.json(
    {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZmNTgyOGMyLTBkYzUtNDNlMS1hZmQzLWFhODI3ZmQxODRiYSIsImlhdCI6MTY5OTI3MjE0MiwiZXhwIjoxNzA3MDQ4MTQyfQ.s4Bgs8RJr9U242CdG9cJyiVK6N7_VAVw9mziMdAkFrM",
      data: {
        userName: "johndoe123",
        name: name,
        birthDate: birthDate,
        email: email,
        url: "www.johndoe.com",
        description: "oh hello there",
        protected: false,
        verified: true,
        followerCount: 0,
        followingCount: 5,
        createdAt: date.toISOString(),
        profileBannerUrl:
          "https://notdeterminedyet.com/profile_banners/819797/1348102824",
        profileImageUrl:
          "https://notdeterminedyet.com/profile_banners/819797/1348102824",
      },
      suggestions: ["usernameSuggestion1", "usernameSuggestion2"],
    },
    {
      status: 200,
    }
  );
};
