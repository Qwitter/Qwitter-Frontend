import { HttpResponse, ResponseResolver } from "msw";

export const EditProfileWorker: ResponseResolver = async ({ request }) => {
  const body = (await request.json()) as any;

  const { name, description, Location, url, birth_date } = body;
  console.log(body);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (name && birth_date) {
    return HttpResponse.json(
      {
        name: name,
        description: description,
        Location: Location,
        url: url,
        birth_date: birth_date,
      },
      { status: 200 }
    );
  } else {
    return HttpResponse.json(
      {
        message: { name, description, location, url, birth_date },
      },
      {
        status: 400,
        statusText: "Invalid data",
      }
    );
  }
};
