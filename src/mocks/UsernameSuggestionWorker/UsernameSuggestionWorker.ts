import { HttpResponse, ResponseResolver } from "msw";

export const UsernameSuggestionWorker: ResponseResolver = async ({
  request,
}) => {
  const body = (await request.json()) as { email: string };
  const { email } = body;

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return HttpResponse.json(
    {
      message: "Email sent successfully",
      data: {
        email: `${email}`,
        expires: "2021-10-07T16:00:00.000Z",
      },
    },
    {
      status: 201,
    }
  );
};