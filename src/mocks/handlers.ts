import { http } from "msw";
import {
  verificationTokenWorkerHandler,
  verificationWorkerHandler,
} from "./VerificationWorker/VerificationWorker";
import { emailCheckWorker } from "./EmailCheckWorker/EmailCheckWorker";
import { PasswordRestWorker } from "./PasswordRestWorker/PasswordRestWorker";
import { usernameValidationWorker } from "./UsernameSuggestionWorker/UsernameSuggestionWorker";
import { SignInWokerHandler } from "./SignInWorker/SignInWorker";

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
  http.post(
    `${VITE_BACKEND_URL}/api/v1/auth/check-existence`,
    usernameValidationWorker
  ),
  http.post(
    `${VITE_BACKEND_URL}/api/v1/auth/login`,
    SignInWokerHandler
  ),
];
