import { HttpResponse, ResponseResolver } from "msw";

export const PasswordRestWorker: ResponseResolver = async ({
    request,
}) => {
    const { password,email} = (await request.json()) as { password: string,email:string };

    await new Promise((resolve) => setTimeout(resolve, 1000));
    password    
    email
        return HttpResponse.json(
            {
                message: "password is changed successfully for "+email
            },
            {
                status: 200,
            }
        );
};