import { http } from "msw";
import {
  verificationTokenWorkerHandler,
  verificationWorkerHandler,
} from "./VerificationWorker/VerificationWorker";

const { VITE_BACKEND_URL } = process.env;

export const handlers = [
  http.post(
    `${VITE_BACKEND_URL}/api/user/verify-email`,
    verificationWorkerHandler
  ),
  http.get(
    `${VITE_BACKEND_URL}/api/user/verify-email/:token`,
    verificationTokenWorkerHandler
  ),
];
