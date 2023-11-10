import { http } from "msw";
import {
  resetPasswordVerificationTokenWorkerHandler,
  verificationTokenWorkerHandler,
  verificationWorkerHandler,
} from "./VerificationWorker/VerificationWorker";
import { emailCheckWorker } from "./EmailCheckWorker/EmailCheckWorker";
import { PasswordRestWorker } from "./PasswordRestWorker/PasswordRestWorker";
import {
  usernameSuggestionWorker,
  usernameValidationWorker,
} from "./UsernameSuggestionWorker/UsernameSuggestionWorker";
import { SignInWokerHandler } from "./SignInWorker/SignInWorker";
import { RegisterUserWorker } from "./RegisterUserWorker/RegisterUserWorker";

const { VITE_BACKEND_URL } = process.env;

export const handlers = [
  http.post(
    `${VITE_BACKEND_URL}/api/v1/auth/send-verification-email`,
    verificationWorkerHandler
  ),
  http.post(
    `${VITE_BACKEND_URL}/api/v1/auth/verify-email/:token`,
    verificationTokenWorkerHandler
  ),
  http.post(
    `${VITE_BACKEND_URL}/api/v1/auth/reset-password/:token`,
    resetPasswordVerificationTokenWorkerHandler
  ),
  http.post(`${VITE_BACKEND_URL}/api/user/find-email`, emailCheckWorker),
  http.post(`${VITE_BACKEND_URL}/api/v1/auth/change-password`, PasswordRestWorker),
  http.post(
    `${VITE_BACKEND_URL}/api/v1/auth/check-existence`,
    usernameValidationWorker
  ),
  http.post(`${VITE_BACKEND_URL}/api/v1/auth/login`, SignInWokerHandler),
  http.post(
    `${VITE_BACKEND_URL}/api/v1/auth/username-suggestions`,
    usernameSuggestionWorker
  ),
  http.post(`${VITE_BACKEND_URL}/api/v1/auth/signup`, RegisterUserWorker),
];
