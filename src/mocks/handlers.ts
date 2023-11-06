import { http } from "msw";
import {
  verificationTokenWorkerHandler,
  verificationWorkerHandler,
} from "./VerificationWorker/VerificationWorker";
import { EmailCheckWorker} from "./EamilCheckWorker/EmailCheckWorker";
import { PasswordRestWorker } from "./PasswordRestWorker/PasswordRestWorker";

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
  http.post(
    `${VITE_BACKEND_URL}/api/user/find-email`,
    EmailCheckWorker
  ),
  http.post(
    `${VITE_BACKEND_URL}/api/user/RestPassword`,
    PasswordRestWorker
  ),
];
