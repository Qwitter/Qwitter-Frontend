import { HttpResponse, ResponseResolver } from "msw";
import { userArray } from "../../constants";

export const getUsersSuggestionsWorkerHandler: ResponseResolver = async ({
    request,
}) => {

    // Extract query parameters from the URL
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    const name = searchParams.get("name");
    await new Promise((resolve) => setTimeout(resolve, 20));
    console.log(url);
    const filteredUsers = userArray.filter(user => user.username.includes(name || "marwan"));
    if (name![0] == '#') {
        return HttpResponse.json(
            {
                data: ["this just a hashtag", "KILLME"],
            },
            {
                status: 200,
            }
        );

    }
    return HttpResponse.json(
        {
            data: filteredUsers,
        },
        {
            status: 200,
        }
    );
};
