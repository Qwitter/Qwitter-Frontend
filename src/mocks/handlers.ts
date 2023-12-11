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
import { getUsersSuggestionsWorkerHandler } from "./GetUsersSuggetions/GetUsersSuggetionsWorker";
import { EditProfileWorker } from "./EditProfileWorker/EditProfileWorker";
import { TimelineTweetsWorker } from "./TimelineTweetsWorker/TimelineTweetsWorkers";
import {
  bookmarkTweetWorker,
  deleteTweetWorker,
  likeTweetWorker,
  unBookmarkTweetWorker,
  unLikeTweetWorker,
} from "./TweetWorker/TweetWorker";
import { UploadProfileImageWorker } from "./RegisterUserWorker/UploadProfileImageWorker";
import { userProfileWorker } from "./UserWorker/UserProfileWorker";
import { FollowSuggestionsWorker } from "./FollowSuggestionsWorker/FollowSuggestionsWorker";
import { FollowUserWorker, UnFollowUserWorker } from "./FollowUserWorker/FollowUserWorker";
import { TrendsWorker } from "./TrendsWorker/TrendsWorker";
import { FollowersWorker } from "./FollowersWorker/FollowersWorker";
import { FollowingsWorker } from "./FollowingsWorker/FollowingsWorker";
import { BlockUserWorker, UnBlockUserWorker } from "./BlockUserWorker/BlockUserWorker";
import { BlockedWorker } from "./BlockedWorker/BlockedWorker";

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
  http.get(`${VITE_BACKEND_URL}/api/v1/user`, userWorker),
  http.post(
    `${VITE_BACKEND_URL}/api/v1/auth/signup/google`,
    OAuthRegisterUserWorker
  ),
  http.post(
    `${VITE_BACKEND_URL}/api/v1/user/profile_picture`,
    UploadProfileImageWorker
  ),
  http.post(
    `${VITE_BACKEND_URL}/api/v1/user/profile_banner`,
    UploadProfileImageWorker
  ),
  http.get(
    `${VITE_BACKEND_URL}/api/v1/user/lookup`,
    getUsersSuggestionsWorkerHandler
  ),
  http.put(`${VITE_BACKEND_URL}/api/v1/user/profile`, EditProfileWorker),
  http.get(
    `${VITE_BACKEND_URL}/api/v1/tweets?page=1&limit=10`,
    TimelineTweetsWorker
  ),
  http.post(`${VITE_BACKEND_URL}/api/v1/tweets/:tweetId/like`, likeTweetWorker),
  http.delete(
    `${VITE_BACKEND_URL}/api/v1/tweets/:tweetId/like`,
    unLikeTweetWorker
  ),
  http.post(
    `${VITE_BACKEND_URL}/api/v1/tweets/:tweetId/bookmark`,
    bookmarkTweetWorker
  ),
  http.delete(
    `${VITE_BACKEND_URL}/api/v1/tweets/:tweetId/bookmark`,
    unBookmarkTweetWorker
  ),
  http.delete(`${VITE_BACKEND_URL}/api/v1/tweets/:tweetId`, deleteTweetWorker),
  http.get(`${VITE_BACKEND_URL}/api/v1/user/johndoe123`, userProfileWorker),
  http.get(`${VITE_BACKEND_URL}/api/v1/user/samy`, userProfileWorker),
  http.get(
    `${VITE_BACKEND_URL}/api/v1/tweets/user/johndoe123/media?page=1&limit=10`,
    TimelineTweetsWorker
  ),
  http.get(
    `${VITE_BACKEND_URL}/api/v1/tweets/user/johndoe123/like?page=1&limit=10`,
    TimelineTweetsWorker
  ),
  http.get(
    `${VITE_BACKEND_URL}/api/v1/tweets/user/johndoe123/replies?page=1&limit=10`,
    TimelineTweetsWorker
  ),
  http.get(
    `${VITE_BACKEND_URL}/api/v1/tweets/user/johndoe123?page=1&limit=10`,
    TimelineTweetsWorker
  ),
  http.get(`${VITE_BACKEND_URL}/api/v1/user/suggestions`, FollowSuggestionsWorker),
  http.post(`${VITE_BACKEND_URL}/api/v1/user/follow/:username`, FollowUserWorker),
  http.delete(`${VITE_BACKEND_URL}/api/v1/user/follow/:username`, UnFollowUserWorker),
  http.get(`${VITE_BACKEND_URL}/api/v1/trends`, TrendsWorker),
  http.get(`${VITE_BACKEND_URL}/api/v1/user/followers`, FollowersWorker),
  http.get(`${VITE_BACKEND_URL}/api/v1/user/follow`, FollowingsWorker),
  http.post(`${VITE_BACKEND_URL}/api/v1/user/block/:username`, BlockUserWorker),
  http.delete(`${VITE_BACKEND_URL}/api/v1/user/block/:username`, UnBlockUserWorker),
  http.get(`${VITE_BACKEND_URL}/api/v1/user/block`, BlockedWorker),
];
