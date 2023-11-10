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
      message:
        "user is created successfully for you with birthDate: " + birthDate,
    },
    {
      status: 200,
    }
  );
};
