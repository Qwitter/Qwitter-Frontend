import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import { z } from "zod";
import {
  PasswordChangeEmailVerificationTokenSchema,
  SignUpEmailVerificationTokenSchema,
} from "@/models/EmailVerification";
import { SignUpDataSchema } from "@/models/SignUp";
import { BirthDay, MONTHS } from "@/models/BirthDay";
import { EditUserSchema, UserDataSchema } from "@/models/User";
import moment from "moment";

const VITE_BACKEND_URL = process.env.VITE_BACKEND_URL as string;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * @description Get the user data from the backend using the token
 * @param token
 * @return object represents the user data
 */
export const getUserData = async (token: string) => {
  try {
    const res = await axios.get(`${VITE_BACKEND_URL}/api/v1/user`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

/**
 * @description Get the user profile data from the backend using username
 * @param username - the username of the user
 * @returns object represents the user profile data
 */
export const getUserProfileData = async (username: string) => {
  try {
    const res = await axios.get(`${VITE_BACKEND_URL}/api/v1/user/${username}`);
    const userData = res.data;

    const parseResult = UserDataSchema.safeParse(userData);
    if (!parseResult.success) throw new Error("Invalid user data");

    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

/**
 * @description Check if the user whose birthday is on date is at least 18 years ago
 * @param date
 * @returns boolean
 */
export const isAtLeast18YearsAgo = (date: Date): boolean => {
  const parseResult = z.date().safeParse(date);
  if (!parseResult.success) return false;

  const now = new Date();
  const eighteenYearsAgo = new Date(
    now.getFullYear() - 18,
    now.getMonth(),
    now.getDate()
  );
  return date <= eighteenYearsAgo;
};

/**
 * @description Check if the email is valid
 * @param email
 * @returns  true if found the email ,false otherwise  or null
 */
export const findEmail = async (email: string) => {
  const parseResult = z.string().email().safeParse(email);
  if (!parseResult.success) return null;

  try {
    const res = await axios.post(
      `${VITE_BACKEND_URL}/api/v1/auth/check-existence`,
      {
        userNameOrEmail: email,
      }
    );
    return { available: !res.data.available };
  } catch (err) {
    return { available: true };
  }
};

/**
 * @description Check if the userNameOrEmail is available
 * @param userNameOrEmail
 * @returns  true if founded ,false otherwise  or null
 */
export const isAvailableUserNameOrEmail = async (userNameOrEmail: string) => {
  const parseResult = z.string().safeParse(userNameOrEmail);
  if (!parseResult.success) return null;

  try {
    const res = await axios.post(
      `${VITE_BACKEND_URL}/api/v1/auth/check-existence`,
      {
        userNameOrEmail: userNameOrEmail,
      }
    );
    return res.status == 200;
  } catch (err) {
    return null;
  }
};
/**
 * @description update username with new one
 * @param username
 * @returns  true if available ,false otherwise  or null
 */
export const updateUsername = async ({
  token,
  username,
}: {
  token: string;
  username: string;
}) => {
  const parseToken = z.string().safeParse(token);
  const parseUsername = z.string().safeParse(username);
  if (!parseUsername.success || !parseToken.success) return null;
  try {
    const res = await axios.patch(
      `${VITE_BACKEND_URL}/api/v1/user/username`,
      {
        userName: username,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.status;
  } catch (err) {
    const error = err as { response: { status: string } };
    return error.response.status || null;
  }
};
/**
 * @description update email with new one
 * @param {email,token}
 * @returns  true if available ,false otherwise  or null
 */
export const updateEmail = async ({
  token,
  email,
}: {
  token: string;
  email: string;
}) => {
  const parseToken = z.string().safeParse(token);
  const parsedEmail = z.string().email().safeParse(email);
  if (!parsedEmail.success || !parseToken.success) return null;
  try {
    const res = await axios.post(
      `${VITE_BACKEND_URL}/api/v1/auth/change-email`,
      {
        email: email,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res;
  } catch (err) {
    console.log(err);
    throw new Error("not valid");
  }
};
/**
 * @description verify user password
 * @param  password
 * @param  token
 * @returns  true if its the user password ,false otherwise  or null
 */
export const verifyPassword = async ({
  token,
  password,
}: {
  token: string;
  password: string;
}) => {
  const parseToken = z.string().safeParse(token);
  const parsePassword = z.string().safeParse(password);
  if (!parsePassword.success || !parseToken.success) return null;
  try {
    const res = await axios.post(
      `${VITE_BACKEND_URL}/api/v1/auth/check-password`,
      {
        password: password,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data.correct;
  } catch (err) {
    console.log(err);
    throw new Error("not valid");
  }
};
/**
 * @description get Suggestions for username using the token of the user
 * @param token,userName
 * @returns  array of valid Suggestions for username or null
 */
export const getSuggestedUsernames = async ({
  token,
  userName,
}: {
  token: string;
  userName: string;
}) => {
  const parseToken = z.string().safeParse(token);
  const parseUsername = z.string().safeParse(userName);
  if (!parseUsername.success || !parseToken.success) return null;

  try {
    const res = await axios.post(
      `${VITE_BACKEND_URL}/api/v1/auth/username-suggestions`,
      {
        userName,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data.suggestions;
  } catch (err) {
    return null;
  }
};

/**
 * @description change the password of the user with the new password using token
 * @param password
 * @returns  object represents the response from the backend or null
 */
export const resetPasswordWithNewOne = async ({
  password,
  token,
}: {
  password: string;
  token: string | null;
}) => {
  const parsePassword = z.string().safeParse(password);
  const parseToken = z.string().safeParse(token);

  if (!parsePassword.success || !parseToken.success)
    throw new Error("Invalid token");
  try {
    const res = await axios.post(
      `${VITE_BACKEND_URL}/api/v1/auth/change-password`,
      {
        password,
        passwordConfirmation: password,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res;
  } catch (err) {
    console.log(err);
    return null;
  }
};

/**
 * @description Login Service with the name or username and password
 * @param {password,emailOrUsername}
 * @returns  object represents the response from the backend or null
 */
export const loginService = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const parsedPassword = z.string().safeParse(password);
  const parsedEmail = z.string().safeParse(email);
  if (!parsedPassword.success || !parsedEmail.success) return null;
  try {
    const res = await axios.post(`${VITE_BACKEND_URL}/api/v1/auth/login`, {
      email_or_username: email,
      password,
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

/**
 * @description Send a verification email to the user after signing up
 * @param email
 * @returns object represents the response from the backend or null
 */
export const sendSignUpVerificationEmail = async (email: string) => {
  const parseResult = z.string().email().safeParse(email);
  if (!parseResult.success) return null;

  try {
    const res = await axios.post(
      `${VITE_BACKEND_URL}/api/v1/auth/send-verification-email`,
      {
        email,
      }
    );
    return res;
  } catch (err) {
    const errObj = err as { stack: string };
    throw new Error(errObj.stack);
  }
};

/**
 * @description Send a verification email to the user after requesting to reset his password
 * @param email
 * @returns object represents the response from the backend or null
 */
export const sendResetPasswordVerificationEmail = async (email: string) => {
  const parseResult = z.string().email().safeParse(email);
  if (!parseResult.success) return null;

  try {
    const res = await axios.post(
      `${VITE_BACKEND_URL}/api/v1/auth/forgot-password`,
      {
        email,
      }
    );
    return res;
  } catch (err) {
    console.log(err);
    throw new Error("Email is not found");
  }
};

/**
 * @description Verify the user's email using the token when signing up
 * @param token
 * @returns object represents the response from the backend or throws error
 */
export const verifySignUpEmail = async (email: string, token: string) => {
  const parseResult = SignUpEmailVerificationTokenSchema.safeParse(token);
  if (!parseResult.success) throw new Error("Invalid token");

  try {
    const res = await axios.post(
      `${VITE_BACKEND_URL}/api/v1/auth/verify-email/${token}`,
      {
        email,
      }
    );
    return res;
  } catch (err) {
    throw new Error("Wrong Token. Please check again");
  }
};

/**
 * @description  Verify the user's email who is requesting to reset his password using the token
 * @param token
 * @returns object represents the response from the backend or throws error
 */
export const verifyResetPasswordEmail = async (token: string) => {
  const parseResult =
    PasswordChangeEmailVerificationTokenSchema.safeParse(token);
  if (!parseResult.success) throw new Error("Invalid token");

  try {
    const res = await axios.post(
      `${VITE_BACKEND_URL}/api/v1/auth/reset-password/${token}`
    );
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
    throw new Error("Wrong Token. Please check again");
  }
};

/**
 * @description Register a new user to the backend
 * @param   newUserData Object holding name, email, birthday and password
 * @returns Object holding the backend response or null in case of an error
 */
export const registerNewUser = async (newUserData: object) => {
  const parseResult = SignUpDataSchema.safeParse(newUserData);

  if (!parseResult.success) return null;

  const dateString = `${parseResult.data.year}-${parseResult.data.month}-${parseResult.data.day}`;
  const birthDate = new Date(dateString);

  try {
    const res = await axios.post(
      `${VITE_BACKEND_URL}/api/v1/auth/signup`,
      {
        name: parseResult.data.name,
        email: parseResult.data.email,
        password: parseResult.data.password,
        birthDate: birthDate.toISOString(),
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

/**
 *
 * @param picFile The actual image from the  file input
 * @param token The token of the user for authentication
 * @param isBanner Used to upload the profile banner
 * @returns New user data after the image has changed
 */

export const uploadProfileImage = async ({
  picFile,
  token,
  isBanner = false,
}: {
  picFile: File;
  token: string;
  isBanner?: boolean;
}) => {
  const formData = new FormData();
  formData.append("photo", picFile);

  try {
    const res = await axios.post(
      `${VITE_BACKEND_URL}/api/v1/user/profile_${
        isBanner ? "banner" : "picture"
      }`,
      formData,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status >= 400) {
      return null;
    }
    return res.data.user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

/**
 *
 * @param token The token of the user for authentication
 * @param isBanner Used to upload the profile banner
 * @returns New user data after the image has changed
 */
export const deleteProfileBanner = async ({ token }: { token: string }) => {
  try {
    const res = await axios.delete(
      `${VITE_BACKEND_URL}/api/v1/user/profile_banner`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error deleting image");
  }
};

export const oAuthSignUp = async (token: string, birthday: BirthDay) => {
  const parseResult = z.string().safeParse(token);
  if (!parseResult.success) return null;

  const birthDate = new Date(
    birthday.year,
    MONTHS.indexOf(birthday.month),
    birthday.day
  ).toISOString();

  try {
    const res = await axios.post(
      `${VITE_BACKEND_URL}/api/v1/auth/google/signup`,
      {
        birthDate,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res.data)
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

/**
 * @description Convert a number to a short form
 * @param number
 * @returns string - the short form of the number
 */
export const convertNumberToShortForm = (number: number) => {
  if (number < 1000) return number;
  else if (number < 1000000 && number % 1000 <= 100) return `${number / 1000}k`;
  else if (number < 1000000) return `${(number / 1000).toFixed(1)}k`;
  else if (number % 1000000 <= 100000) return `${number / 1000000}m`;
  else return `${(number / 1000000).toFixed(1)}m`;
};

/**
 * @description Load timeline tweets
 * @param pageParam used for infinite queries
 * @param limit used to specify the array length
 * @param token used to authorize the request
 * @returns Array of tweets
 */
export const timelineTweets = async (
  pageParam: number = 1,
  limit: number = 10,
  token: string,
  q?: string,
) => {
  if (!token) return [];
  // this is a fucking comment
  try {
    const response = await axios.get(
      `${VITE_BACKEND_URL}/api/v1/tweets?page=${pageParam}&limit=${limit}` + (q ? `&q=${q}` : ''),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    return response.data.tweets;
  } catch (error) {
    console.log(error);
    return [];
  }
};

/**
 * @description Load forYou timeline tweets
 * @param pageParam used for infinite queries
 * @param limit used to specify the array length
 * @param token used to authorize the request
 * @returns Array of tweets
 */
export const timelineForYouTweets = async (
  pageParam: number = 1,
  limit: number = 10,
  token: string
) => {
  if (!token) return [];

  try {
    const response = await axios.get(
      `${VITE_BACKEND_URL}/api/v1/timeline?page=${pageParam}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    return response.data.tweets;
  } catch (error) {
    console.log(error);
    return [];
  }
};

/*
 * @description get a list of users with userName contain the given string
 * @param {username,token}
 * @returns list of users  or null
 */
export const getUsersSuggestions = async (token: string, username: string) => {
  try {
    if (!username) return [];
    const res = await axios.get(
      `${VITE_BACKEND_URL}/api/v1/user/search?q=${username.trim()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data.users;
  } catch (err) {
    console.log(err);
    return null;
  }
};
/*
 * @description get a list of users with userName contain the given string
 * @param {username,token}
 * @returns list of users  or null
 */
export const getConversationsUsersSuggestions = async (
  token: string,
  username: string
) => {
  try {
    if (!username) return [];
    const res = await axios.get(
      `${VITE_BACKEND_URL}/api/v1/conversation/user?q=${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data.users;
  } catch (err) {
    console.log(err);
    return null;
  }
};
/*
 * @description get a list of users with userName contain the given string to add to the group
 * @param {username,token,conversationId}
 * @returns list of users  or null
 */
export const getUsersSuggestionsToAdd = async (
  token: string,
  username: string,
  conversationId: string
) => {
  try {
    if (!username) return [];
    const res = await axios.get(
      `${VITE_BACKEND_URL}/api/v1/conversation/${conversationId}/user?q=${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data.users;
  } catch (err) {
    console.log(err);
    return null;
  }
};
/*
 * @description get a list of conversations , people ,groups  contain the given string
 * @param {query,token}
 * @returns list of data  or null
 */
export const conversationSearch = async (token: string, query: string) => {
  try {
    const res = await axios.get(
      `${VITE_BACKEND_URL}/api/v1/conversation/search?q=${query}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

/**
 * @description get a list of Hashtags contain the given string
 * @param {username,token}
 * @returns list of Hashtags  or null
 */
export const getHashtags = async (token: string, tag: string) => {
  try {
    const res = await axios.get(
      `${VITE_BACKEND_URL}/api/v1/tweets/hashtags?q=${tag.trim()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

/**
 * @description get a list of user conversations
 * @param token
 * @returns list of user conversations  or null
 */
export const getUserConversations = async (token: string) => {
  try {
    const res = await axios.get(`${VITE_BACKEND_URL}/api/v1/conversation/?limit=100`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

/**
 * @description create tweet for the user
 * @param {token,formData}
 * @returns list of users  or null
 */
export const createTweet = async ({
  token,
  formData,
}: {
  token: string;
  formData: FormData;
}) => {
  try {
    const res = await axios.post(
      `${VITE_BACKEND_URL}/api/v1/tweets`,
      formData,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.status == 201;
  } catch (err) {
    console.log(err);
    return null;
  }
};

/**
 * @description Send a request to the backend to like a tweet
 * @param tweetId
 * @param token - the token of the user
 * @returns success or throws error if there is an error
 */
export const likeTweet = async (tweetId: string, token: string) => {
  try {
    const res = await axios.post(
      `${VITE_BACKEND_URL}/api/v1/tweets/${tweetId}/like`,
      {},
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error liking tweet");
  }
};

/**
 * @description Send a request to the backend to unlike a tweet
 * @param tweetId
 * @param token - the token of the user
 * @returns success or throws error if there is an error
 */
export const unlikeTweet = async (tweetId: string, token: string) => {
  try {
    const res = await axios.delete(
      `${VITE_BACKEND_URL}/api/v1/tweets/${tweetId}/like`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error unlike tweet");
  }
};

/**
 * @description Send a request to the backend to bookmark a tweet
 * @param tweetId
 * @param token - the token of the user
 * @returns success or throws error if there is an error
 */
export const bookmarkTweet = async (tweetId: string, token: string) => {
  try {
    const res = await axios.post(
      `${VITE_BACKEND_URL}/api/v1/tweets/${tweetId}/bookmark`,
      {},
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error bookmarking tweet");
  }
};
/**
 * @description Create a new conversation
 * @param conversation_name
 * @param token - the token of the user
 * @param users - array of userNames
 * @returns success or throws error if there is an error
 */
export const CreateConversation = async ({
  token,
  users,
}: {
  token: string;
  users: string[];
}) => {
  try {
    const res = await axios.post(
      `${VITE_BACKEND_URL}/api/v1/conversation/`,
      {
        users: users,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
/**
 * @description Create a new message
 * @param formData
 * @param token - the token of the user
 * @returns success or throws error if there is an error
 */
export const CreateMessage = async ({
  formData,
  token,
  conversationId,
  logicalId,
}: {
  conversationId: string;
  formData: FormData;
  token: string;
  logicalId: string;
}) => {
  try {
    logicalId;
    const res = await axios.post(
      `${VITE_BACKEND_URL}/api/v1/conversation/${conversationId}/message`,
      formData,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res);
    return res.data.createdMessage;
  } catch (error) {
    console.log(error);
    return null;
  }
};
/**
 * @description get user conversation by id
 * @param conversationId
 * @param token - the token of the user
 * @returns get the conversation data
 */
export const getConversation = async ({
  token,
  conversationId,
  pageParam,
  limit,
}: {
  pageParam: number;
  limit: number;
  conversationId: string;
  token: string;
}) => {
  try {
    const res = await axios.get(
      `${VITE_BACKEND_URL}/api/v1/conversation/${conversationId}?page=${pageParam}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting conversation");
  }
};

/**
 * @description Send a request to the backend to unBookmark a tweet
 * @param tweetId
 * @param token - the token of the user
 * @returns success or throws error if there is an error
 */
export const unBookmarkTweet = async (tweetId: string, token: string) => {
  try {
    const res = await axios.delete(
      `${VITE_BACKEND_URL}/api/v1/tweets/${tweetId}/bookmark`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error unBookmarking tweet");
  }
};

/**
 * @description Send a request to the backend to delete a tweet
 * @param tweetId
 * @param token - the token of the user
 * @returns success or throws error if there is an error
 */
export const deleteTweet = async (tweetId: string, token: string) => {
  try {
    const res = await axios.delete(
      `${VITE_BACKEND_URL}/api/v1/tweets/${tweetId}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error deleting tweet");
  }
};

/**
 * @description Get the user profile data from the backend using the token
 * @param token
 * @return object represents the user profile data
 */
export const getUserProfile = async (token: string, username: string) => {
  try {
    const res = await axios.get(`${VITE_BACKEND_URL}/api/v1/user/${username}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

/**
 * @description Send a request to the backend to delete a conversation
 * @param conversationId
 * @param token - the token of the user
 * @returns success or throws error if there is an error
 */
export const deleteConversation = async ({
  conversationId,
  token,
}: {
  conversationId: string;
  token: string;
}) => {
  try {
    const res = await axios.delete(
      `${VITE_BACKEND_URL}/api/v1/conversation/${conversationId}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error deleting conversation");
  }
};

/**
 * @description Send a request to the backend to delete a message from conversation
 * @param {conversationId,messageId}
 * @param token - the token of the user
 * @returns success or throws error if there is an error
 */
export const deleteMessage = async ({
  conversationId,
  token,
  messageId,
}: {
  messageId: string;
  conversationId: string;
  token: string;
}) => {
  try {
    const res = await axios.delete(
      `${VITE_BACKEND_URL}/api/v1/conversation/${conversationId}/message`,
      {
        data: { message_id: messageId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error deleting conversation");
  }
};

/**
 * @description update the image and the group name
 * @param FormData
 * @param token - the token of the user
 * @returns success or throws error if there is an error
 */
export const updateGroupImageAndName = async ({
  formData,
  conversationId,
  token,
}: {
  formData: FormData;
  conversationId: string;
  token: string;
}) => {
  try {
    const res = await axios.put(
      `${VITE_BACKEND_URL}/api/v1/conversation/${conversationId}`,
      formData,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.status;
  } catch (error) {
    console.log(error);
    throw new Error("Error updating group");
  }
};
/**
 * @description to get the user followers suggestions list
 * @param token
 * @param {currentUser username}
 * @returns  users array represents the response from the backend or null
 */
export const GetFollowSuggestionsService = async (token: string) => {
  try {
    const res = await axios.get(`${VITE_BACKEND_URL}/api/v1/user/suggestions`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

/**
 * @description edit user profile
 * @param editedUserData holds the new data of the user
 * @return success message or null in case of error
 */
export const editUserProfile = async (
  editedUserData: object,
  token: string
) => {
  let parseResult = null;
  try {
    parseResult = EditUserSchema.parse(editedUserData);
  } catch (error) {
    console.log("Error Parsing Data: ", error);
    return null;
  }

  try {
    const response = await axios.put(
      `${VITE_BACKEND_URL}/api/v1/user/profile`,
      {
        name: parseResult.name,
        description: parseResult.description ?? "",
        location: parseResult.location ?? "",
        url: parseResult.url ?? "",
        birth_date: parseResult.birthDate ?? "",
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

/**
 * @description Load profile tweets
 * @param pageParam used for infinite queries
 * @param limit used to specify the array length
 * @param username username of the viewed profile
 * @param token used to authorize the request
 * @returns Array of tweets
 */
export const profileTweets = async (
  pageParam: number = 1,
  limit: number = 10,
  username: string,
  token: string
) => {
  if (!token) return [];

  try {
    const response = await axios.get(
      `${VITE_BACKEND_URL}/api/v1/tweets/user/${username}?page=${pageParam}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    return response.data.tweets;
  } catch (error) {
    console.log(error);
    return [];
  }
};

/**
 * @description Load profile replies
 * @param pageParam used for infinite queries
 * @param limit used to specify the array length
 * @param username username of the viewed profile
 * @param token used to authorize the request
 * @returns Array of tweets
 */
export const profileReplies = async (
  pageParam: number = 1,
  limit: number = 10,
  username: string,
  token: string
) => {
  if (!token) return [];

  try {
    const response = await axios.get(
      `${VITE_BACKEND_URL}/api/v1/tweets/user/${username}/replies?page=${pageParam}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    return response.data.tweets;
  } catch (error) {
    console.log(error);
    return [];
  }
};

/**
 * @description Load profile liked posts
 * @param pageParam used for infinite queries
 * @param limit used to specify the array length
 * @param username username of the viewed profile
 * @param token used to authorize the request
 * @returns Array of tweets
 */
export const profileLikes = async (
  pageParam: number = 1,
  limit: number = 10,
  username: string,
  token: string
) => {
  if (!token) return [];

  try {
    const response = await axios.get(
      `${VITE_BACKEND_URL}/api/v1/tweets/user/${username}/like?page=${pageParam}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    return response.data.tweets;
  } catch (error) {
    console.log(error);
    return [];
  }
};

/**
 * @description Load profile posts with media
 * @param pageParam used for infinite queries
 * @param limit used to specify the array length
 * @param username username of the viewed profile
 * @param token used to authorize the request
 * @returns Array of tweets
 */
export const profileMedia = async (
  pageParam: number = 1,
  limit: number = 10,
  username: string,
  token: string
) => {
  if (!token) return [];

  try {
    const response = await axios.get(
      `${VITE_BACKEND_URL}/api/v1/tweets/user/${username}/media?page=${pageParam}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    return response.data.tweets;
  } catch (error) {
    console.log(error);
    return [];
  }
};

/**
 * @description follow specific user
 * @param username of this specific user
 * @param token
 * @returns  success or throws error if there is an error
 */
export const FollowService = async (username: string, token: string) => {
  try {
    const res = await axios.post(
      `${VITE_BACKEND_URL}/api/v1/user/follow/${username}`,
      {},
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
/**
 * @description unfollow specific user
 * @param username of this specific user
 * @param token
 * @returns  success or throws error if there is an error
 */
export const UnFollowService = async (username: string, token: string) => {
  try {
    const res = await axios.delete(
      `${VITE_BACKEND_URL}/api/v1/user/follow/${username}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

/**
 * @description get trends in home page(What's hapenning section)
 * @param token
 * @returns  users array represents the response from the backend or null
 */
export const GetTrendsService = async (token: string) => {
  try {
    const res = await axios.get(`${VITE_BACKEND_URL}/api/v1/trends`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.trends;
  } catch (err) {
    console.log(err);
    return null;
  }
};

/**
 * @description get Followers of this specific user in Profile page(Followers section)
 * @param token
 * @param {currentUser username}
 * @returns  users array represents the response from the backend or null
 */
export const GetFollowersService = async (username: string, token: string) => {
  try {
    const res = await axios.get(
      `${VITE_BACKEND_URL}/api/v1/user/followers/${username}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

/**
 * @description get Followings of this specific user in Profile page(Following section)
 * @param token
 * @param {currentUser username}
 * @returns  users array represents the response from the backend or null
 */
export const GetFollowingsService = async (username: string, token: string) => {
  try {
    const res = await axios.get(
      `${VITE_BACKEND_URL}/api/v1/user/follow/${username}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

/**
 * @description Block specific user
 * @param username of this specific use
 * @param token
 * @returns  success or throws error if there is an error
 */
export const BlockService = async (username: string, token: string) => {
  try {
    const res = await axios.post(
      `${VITE_BACKEND_URL}/api/v1/user/block/${username}`,
      {},
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
/**
 * @description unblock specific user
 * @param username of this specific user
 * @param token
 * @returns  success or throws error if there is an error
 */
export const UnBlockService = async (username: string, token: string) => {
  try {
    const res = await axios.delete(
      `${VITE_BACKEND_URL}/api/v1/user/block/${username}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

/**
 * @description get Blocked list in Settings page (Block section)
 * @param token
 * @returns  users array represents the response from the backend or null
 */
export const GetBlockedService = async (token: string) => {
  try {
    const res = await axios.get(`${VITE_BACKEND_URL}/api/v1/user/block`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

/**
 * @description mute specific user
 * @param username of this specific use
 * @param token
 * @returns  success or throws error if there is an error
 */
export const MuteService = async (username: string, token: string) => {
  try {
    const res = await axios.post(
      `${VITE_BACKEND_URL}/api/v1/user/mute/${username}`,
      {},
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

/**
 * @description mute specific user
 * @param username of this specific use
 * @param token
 * @returns  success or throws error if there is an error
 */
export const addUserToGroup = async ({
  token,
  users,
  conversationId,
}: {
  conversationId: string;
  token: string;
  users: string[];
}) => {
  try {
    const res = await axios.post(
      `${VITE_BACKEND_URL}/api/v1/conversation/${conversationId}/user/`,
      {
        users: users,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
/**
 * @description unmute specific user
 * @param username of this specific user
 * @param token
 * @returns  success or throws error if there is an error
 */
export const UnMuteService = async (username: string, token: string) => {
  try {
    const res = await axios.delete(
      `${VITE_BACKEND_URL}/api/v1/user/mute/${username}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

/**
 * @description get muted list in Settings page (mute section)
 * @param token
 * @returns  users array represents the response from the backend or null
 */
export const GetMutedService = async (token: string) => {
  try {
    const res = await axios.get(`${VITE_BACKEND_URL}/api/v1/user/mute`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

/**
 * @description get Tweet Likers list in Home page (Tweet section)
 * @param token
 * @param tweetId
 * @returns  users array represents the response from the backend or null
 */
export const GetTweetLikersService = async (tweetId: string, token: string) => {
  try {
    const res = await axios.get(
      `${VITE_BACKEND_URL}/api/v1/tweets/${tweetId}/like`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data.likers;
  } catch (err) {
    console.log(err);
    return null;
  }
};

/**
 * @description get Tweet Retweeters list in Home page (Tweet section)
 * @param token
 * @param tweetId
 * @returns  users array represents the response from the backend or null
 */
export const GetTweetRetweetersService = async (
  tweetId: string,
  token: string
) => {
  try {
    const res = await axios.get(
      `${VITE_BACKEND_URL}/api/v1/tweets/${tweetId}/retweets`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data.retweeters;
  } catch (err) {
    console.log(err);
    return null;
  }
};

/**
 * @description get tweet by id
 * @param tweetId
 * @param token
 * @returns tweet object represents the response from the backend or null
 */
export const getTweetById = async (tweetId: string, token: string) => {
  try {
    const res = await axios.get(
      `${VITE_BACKEND_URL}/api/v1/tweets/${tweetId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.log(err);
    throw new Error("Tweet not found");
  }
};

/**
 * @description get tweet replies
 * @param tweetId
 * @param token
 * @param pageParam
 * @param limit
 * @returns replies array represents the response from the backend or null
 */
export const getTweetReplies = async (
  tweetId: string,
  token: string,
  pageParam: number = 1,
  limit: number = 10
) => {
  try {
    const res = await axios.get(
      `${VITE_BACKEND_URL}/api/v1/tweets/${tweetId}/replies?page=${pageParam}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data.replies;
  } catch (err) {
    console.log(err);
    throw new Error("Replies not found");
  }
};

export const getOperatingSystem = () => {
  const userAgent = navigator.userAgent;
  if (userAgent.indexOf("Win") !== -1) {
    return "Windows";
  }
  if (userAgent.indexOf("Linux") !== -1) {
    return "Linux";
  }
  if (/iPhone|iPod/.test(userAgent)) {
    return "iPhone (iOS)";
  }
  if (/Android/.test(userAgent)) {
    return "Android";
  }
  return "Unknown";
};

/**
 * @description send a retweet request
 * @param tweetId
 * @param token
 * @returns success or failure
 */
export const retweet = async (tweetId: string, token: string) => {
  const formData = new FormData();
  formData.append("retweetedId", tweetId);
  formData.append("text", "");
  formData.append("body", "");
  formData.append("source", getOperatingSystem());
  formData.append("sensitive", "false");
  try {
    const res = await axios.post(
      `${VITE_BACKEND_URL}/api/v1/tweets`,
      formData,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.log(err);
    throw new Error("Error retweeting");
  }
};

/**
 * @description get Notifications list  for user
 * @returns  Notifications list represents the response from the backend or throw error
 */
export const getNotificationsList = async (
  pageParam: number,
  limit: number
) => {
  try {
    const res = await axios.get(
      `${VITE_BACKEND_URL}/api/v1/notifications?page=${pageParam}&limit=${limit}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return res.data.notifications;
  } catch (err) {
    throw new Error("Error getting notifications");
  }
};
/**
 * @description get Mentions list  for user
 * @returns  Mentions list represents the response from the backend or throw error
 */
export const getMentionsList = async () => {
  try {
    const res = await axios.get(
      `${VITE_BACKEND_URL}/api/v1/tweets/mention`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return res.data.tweets;
  } catch (err) {
    throw new Error("Error getting getMentionsList");
  }
};
export const formatDate = (dateString: string) => {
  const date = moment(dateString);
  const now = moment();
  if (now.diff(date, "days") === 0) return date.format("h:mm A");
  else if (now.diff(date, "days") === 1)
    return "Yesterday," + date.format("h:mm A");
  else if (now.diff(date, "days") < 7) return date.format("ddd h:mm A");
  else return date.format("MMM D, YYYY, h:mm A");
};

export const getPageFromUrl = (pathname: string) => {
  if (pathname.includes("home")) {
    return "home";
  } else if (pathname.includes("profile")) {
    return "profile";
  } else if (pathname.includes("explore")) {
    return "explore";
  } else if (pathname.includes("settings")) {
    return "settings";
  } else if (pathname.includes("notifications")) {
    return "notifications";
  } else if (pathname.includes("messages")) {
    return "messages";
  } else if (pathname.includes("tweet")) {
    return "tweet";
  } else if (pathname.includes("connection")) {
    return "connection";
  } else {
    return "unknown";
  }
};
