import { HttpResponse, ResponseResolver } from "msw";

export const verificationWorkerHandler: ResponseResolver = async ({
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

export const verificationTokenWorkerHandler: ResponseResolver = async ({
  params,
}) => {
  const { token } = params as { token: string };

  const emailsTokens = [
    {
      email: "sofa5060@gmail.com",
      token: "123456",
    },
    {
      email: "test@gmail.com",
      token: "12345",
    },
  ];

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const emailToken = emailsTokens.find(
    (emailToken) => emailToken.token === token
  );

  if (!emailToken) {
    return HttpResponse.json(
      {
        message: "Invalid token",
        data: {
          token: `${token}`,
        },
      },
      {
        status: 400,
      }
    );
  }

  return HttpResponse.json(
    {
      message: "Email verified successfully",
      data: {
        email: `${emailToken?.email}`,
      },
    },
    {
      status: 200,
    }
  );
};
