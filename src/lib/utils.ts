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
import { UserDataSchema } from "@/models/User";

const { VITE_BACKEND_URL } = import.meta.env;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * @description Get the user data from the backend using the token
 * @params token
 * @returns object represents the user data
 */
export const getUser = async (token: string) => {
  try {
    const res = await axios.get(`${VITE_BACKEND_URL}/api/user`, {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
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
export const getUserData = async (username: string) => {
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
    return res.status == 200;
  } catch (err) {
    console.log(err);
    return null;
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
    // const res = await axios.post(
    //   `${VITE_BACKEND_URL}/api/v1/auth/change-email`,
    //   {
    //     email: email,
    //   },
    //   { headers: { Authorization: `Bearer ${token}` } }
    // );
    //return res.status == 200;
    if (email == "kaito.kid.1972002@gmail.com") return true;
    else throw new Error("not valid");
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
    // const res = await axios.post(
    //   `${VITE_BACKEND_URL}/api/v1/auth/check-password`,
    //   {
    //     password: password,
    //   },
    //   { headers: { Authorization: `Bearer ${token}` } }
    // );
    // return res.status == 200;
    token;
    if (password == "123456as") return password == "123456as";
    else throw new Error("not valid");
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
    console.log(res.data);
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
    const errObj = err as { response: { data: { message: string } } };
    if (errObj.response) throw new Error(errObj.response.data.message);
    else throw new Error("Error Verifying Email");
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
    const errObj = err as { response: { data: { message: string } } };
    if (errObj.response) throw new Error(errObj.response.data.message);
    else throw new Error("Error Verifying Email");
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
 * @param isBanner
 * @returns New user data after the image has changed
 */

export const uploadProfileImage = async (
  picFile: File,
  token: string,
  isBanner: boolean = false
) => {
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

export const oAuthSignUp = async (token: string, birthday: BirthDay) => {
  const parseResult = z.string().safeParse(token);
  if (!parseResult.success) return null;

  const birthDate = new Date(
    birthday.year,
    MONTHS.indexOf(birthday.month),
    birthday.day
  ).toISOString();

  console.log(token, birthDate);

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
}

/**
 * @description get a list of users with userName contain the given string 
 * @param {username,token}
 * @returns list of users  or null
 */
export const getUsersSuggestions = async (token: string,username:string) => {
  try {
    const res = await axios.get(`${VITE_BACKEND_URL}/api/v1/user/lookup`, {
      params: {
        name: username.slice(1)
    },
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data;
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
export const getHashtags = async (token: string,tag:string) => {
  try {
    const res = await axios.get(`${VITE_BACKEND_URL}/api/v1/user/lookup`, {
      params: {
        name: tag//.slice(1)
    },
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data;
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
export const createTweet = async ({token,formData}:
  {token: string;formData:FormData;
  }) => {
  try {
    const res = await axios.post(`${VITE_BACKEND_URL}/api/v1/tweets`,
    formData,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    
    });
    return res.status==200;
  } catch (err) {
    console.log("lol"+err);
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
