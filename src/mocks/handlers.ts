import { http } from "msw";
import {
  verificationTokenWorkerHandler,
  verificationWorkerHandler,
} from "./VerificationWorker/VerificationWorker";
import { emailCheckWorker} from "./EmailCheckWorker/EmailCheckWorker";
import { PasswordRestWorker } from "./PasswordRestWorker/PasswordRestWorker";

const { VITE_BACKEND_URL } = process.env;

export const handlers = [
  http.post(
    `${VITE_BACKEND_URL}/api/user/verify-email`,
    verificationWorkerHandler
  ),
  http.post(
    `${VITE_BACKEND_URL}/api/user/verify-email/:token`,
    verificationTokenWorkerHandler
  ),
  http.post(
    `${VITE_BACKEND_URL}/api/user/find-email`,
    emailCheckWorker
  ),
  http.post(
    `${VITE_BACKEND_URL}/api/user/RestPassword`,
    PasswordRestWorker
  ),
];
