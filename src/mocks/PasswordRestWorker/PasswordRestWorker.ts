import { HttpResponse, ResponseResolver } from "msw";

export const PasswordRestWorker: ResponseResolver = async ({
    request,
}) => {
    const { password} = (await request.json()) as { password: string};
    const token =request.headers.get('Authorization')?.split(" ")[1]
    if(!token) 
    return HttpResponse.json(
        {
            message: "invalid token"
        },
        {
            status: 404,
        }
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));
    password    
        return HttpResponse.json(
            {
                message: "password is changed successfully for you"
            },
            {
                status: 200,
            }
        );
};