import { HttpResponse, ResponseResolver } from "msw";
import {generateUsernames} from '../../lib/generate'
export const usernameSuggestionWorker: ResponseResolver = async ({
    request,
}) => {
    const { token, username } = (await request.json()) as { token: string,username:string };
    
    // Add a delay for simulation purposes
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (username) {
        token
        return HttpResponse.json(
            {
                Suggestions: generateUsernames(username + "@")
            },
            {
                status: 200,
            }
        );
    } else {
        return HttpResponse.json(
            {
                Suggestions: ["marawanSamy99", "mroanDsad19", "mroansmay_Sdaf544", "marwan54marwan", "marwan54DXL", "samyMarwan5455ds"]
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