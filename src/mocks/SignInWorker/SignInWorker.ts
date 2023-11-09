import { HttpResponse, ResponseResolver } from "msw";

export const SignInWokerHandler: ResponseResolver = async ({
    request,
}) => {
    const { email, password } = (await request.json()) as { email: string, password: string };
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const accounts = [
        { email: "yousef@gmail.com", password: "YousefOsama2025" },
        { email: "seif@gmail.com", password: "456" },
        { email: "atef@gmail.com", password: "789" },
        { email: "maro@gmail.com", password: "100" },
    ];
    var flag: boolean = false;
    accounts.forEach(currAccount => {
        if (currAccount.email == email) {
            if (currAccount.password == password) {
                flag = true;
            }
            else {
                flag = false;
            }
        }
    });
    debugger;
    if (flag) {
        return HttpResponse.json(
            {
                message: "Correct Password",
                avalible: true
            },
            {
                status: 200,
            }
        );
    }
    else {
        return HttpResponse.json(
            {
                message: "Wrong Password",
                avalible: false
            },
            {
                status: 200,
            }
        );
    }
};