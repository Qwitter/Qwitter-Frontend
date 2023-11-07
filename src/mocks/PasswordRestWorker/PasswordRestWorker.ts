import { HttpResponse, ResponseResolver } from "msw";

export const PasswordRestWorker: ResponseResolver = async ({
    request,
}) => {
    const { password} = (await request.json()) as { password: string };

    await new Promise((resolve) => setTimeout(resolve, 1000));
    password    

        return HttpResponse.json(
            {
                message: "password is changed successfully"
            },
            {
                status: 200,
            }
        );
};