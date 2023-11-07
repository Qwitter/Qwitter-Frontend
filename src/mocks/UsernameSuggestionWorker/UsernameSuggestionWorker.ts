import { HttpResponse, ResponseResolver } from "msw";

export const usernameSuggestionWorker: ResponseResolver = async ({
    request,
}) => {
    const { email } = (await request.json()) as { email: string };

    await new Promise((resolve) => setTimeout(resolve, 1000));
    const usernames = [
        "mroansmay995645",
        "mroan_Dsa45",
        "samy454dsaf",
        "smay656marwan",
        "samy54marwan",

    ];
    if (usernames.includes(email)) {

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
export const usernameValidationWorker: ResponseResolver = async ({
    request,
}) => {
    const { userNameOrEmail } = (await request.json()) as { userNameOrEmail: string };

    await new Promise((resolve) => setTimeout(resolve, 1000));
    const usernames = [
        "mroansmay995645",
        "mroan_Dsa45",
        "samy454dsaf",
        "smay656marwan",
        "samy54marwan",
        "marwanSamy"

    ];
    if (usernames.includes(userNameOrEmail)) {

        return HttpResponse.json(
          {
            available: false
          },
            {
                status: 404,
            }
        );
    }
    else {
        return HttpResponse.json(
            {
              
              available: true

            },
            {
                status: 200,
            }
        );
    }
};