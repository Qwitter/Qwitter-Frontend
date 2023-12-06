import { HttpResponse, ResponseResolver } from "msw";

export const FollowUserWorker: ResponseResolver = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return HttpResponse.json({
    status: 200,
  });
};

export const UnFollowUserWorker: ResponseResolver = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return HttpResponse.json({
    status: 200,
  });
};
