import { http, HttpResponse } from "msw";
import { setupWorker } from 'msw/browser'

const { VITE_BACKEND_URL } = process.env;

const oAuthWorker = setupWorker(
  http.get(
    `${VITE_BACKEND_URL}/api/v1/auth/google`,
    ({ request, params, cookies }) => {
      console.log("request", request);
      console.log("params", params);
      console.log("cookies", cookies);
      return HttpResponse.json(["Tom", "Jerry", "Spike"]);
    }
  )
);

oAuthWorker.start();