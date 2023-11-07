import { HttpResponse, ResponseResolver } from "msw";

export const emailCheckWorker: ResponseResolver = async ({
    request,
}) => {
    const { email } = (await request.json()) as { email: string };

    await new Promise((resolve) => setTimeout(resolve, 1000));
    const emails = [
        "sofa5060@gmail.com",
        "test@gmail.com",
        "marwanSamy998@gmail.com",
        "mroan.samy99@gmail.com",

    ];
    if (emails.includes(email)) {

        return HttpResponse.json(
            {
                message: "Email is Found successfully",
                data: true
            },
            {
                status: 200,
            }
        );
    }
    else {
        return HttpResponse.json(
            {
                message: "Email is not Found",
                data: false
            },
            {
                status: 200,
            }
        );
    }
};