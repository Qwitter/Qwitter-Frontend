import { http, HttpResponse } from "msw";
import { setupWorker } from 'msw/browser'

const { VITE_BACKEND_URL } = import.meta.env;

const TempWorker = setupWorker(
  http.get(
    `${VITE_BACKEND_URL}/api/v1/temp`,
    ({ request, params, cookies }) => {
      console.log("request", request);
      console.log("params", params);
      console.log("cookies", cookies);
      return HttpResponse.json(["Tom", "Jerry", "Spike"]);
    }
  )
);

TempWorker.start();