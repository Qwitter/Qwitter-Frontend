import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

if (import.meta.env.MODE === "development") {
  const mockServer = setupWorker();
  mockServer.use(...handlers);
  mockServer.start();
}
