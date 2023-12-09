import { HttpResponse, ResponseResolver } from "msw";

export const BlockUserWorker: ResponseResolver = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return HttpResponse.json({
        status: 200,
    });
};

export const UnBlockUserWorker: ResponseResolver = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return HttpResponse.json({
        status: 200,
    });
};
