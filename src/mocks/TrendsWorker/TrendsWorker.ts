import { HttpResponse, ResponseResolver } from "msw";

export const TrendsWorker: ResponseResolver = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return HttpResponse.json(
        {
            data: [
                {
                    location: "Egypt",
                    trend: "trend1",
                    count:100
                },
                {
                    location: "Egypt",
                    trend: "trend2",
                    count: 200
                },
                {
                    location: "Egypt",
                    trend: "trend3",
                    count: 300
                },
            ]
        },
        {
            status: 200,
        }
    );
};