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
    console.log(name);
    const filteredUsers = userArray.filter(user => user.username.includes(name||"marwan"));

    return HttpResponse.json(
        {
            data: filteredUsers,
        },
        {
            status: 200,
        }
    );
};
