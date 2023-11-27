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
import { sendResetPasswordVerificationTokenWorker } from "./SendResetPasswordVerificationTokenWorker/SendResetPasswordVerificationTokenWorker";
import { userWorker } from "./UserWorker/UserWorker";
import { OAuthRegisterUserWorker } from "./OAuthRegisterUserWorker/OAuthRegisterUserWorker";
import { UploadProfileWorker } from "./RegisterUserWorker/UploadProfileWorker";
import {
  bookmarkTweetWorker,
  likeTweetWorker,
  unBookmarkTweetWorker,
  unLikeTweetWorker,
} from "./TweetWorker/TweetWorker";

const { VITE_BACKEND_URL } = import.meta.env;

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
  http.post(
    `${VITE_BACKEND_URL}/api/v1/auth/change-password`,
    PasswordRestWorker
  ),
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
  http.post(
    `${VITE_BACKEND_URL}/api/v1/auth/forgot-password`,
    sendResetPasswordVerificationTokenWorker
  ),
  http.get(`${VITE_BACKEND_URL}/api/user`, userWorker),
  http.post(
    `${VITE_BACKEND_URL}/api/v1/auth/signup/google`,
    OAuthRegisterUserWorker
  ),
  http.post(
    `${VITE_BACKEND_URL}/api/v1/user/profile_picture`,
    UploadProfileWorker
  ),
  http.post(`${VITE_BACKEND_URL}/api/v1/tweets/like`, likeTweetWorker),
  http.delete(`${VITE_BACKEND_URL}/api/v1/tweets/like`, unLikeTweetWorker),
  http.post(`${VITE_BACKEND_URL}/api/v1/bookmarks`, bookmarkTweetWorker),
  http.delete(`${VITE_BACKEND_URL}/api/v1/bookmarks`, unBookmarkTweetWorker),
];
