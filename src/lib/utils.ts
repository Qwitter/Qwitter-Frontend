import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import { z } from "zod";
import {
  PasswordChangeEmailVerificationTokenSchema,
  SignUpEmailVerificationTokenSchema,
} from "@/models/EmailVerification";
import { SignUpDataSchema } from "@/models/SignUp";

const { VITE_BACKEND_URL } = process.env;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * @description Get the current user from the backend after the user has logged in
 * @params none
 * @returns Promise object represents the user data
 */
export const getUser = async () => {
  return axios.get(`${VITE_BACKEND_URL}/api/user`, {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
    },
  });
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
    const res = await axios.post(`${VITE_BACKEND_URL}/api/user/find-email`, {
      email,
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
/**
 * @description Check if the username is available
 * @param username
 * @returns  true if available ,false otherwise  or null
 */
export const isAvailableUsername = async (username: string) => {
  const parseResult = z.string().safeParse(username);
  if (!parseResult.success) return null;

  try {
    const res = await axios.post(
      `${VITE_BACKEND_URL}/api/v1/auth/check-existence`,
      {
        userNameOrEmail: username,
      }
    );
    return res.status == 200;
  } catch (err) {
    return null;
  }
};
/**
 * @description get Suggestions for username using the token of the user
 * @param token
 * @returns  array of valid Suggestions for username or null
 */
export const getSuggestedUsernames = async ({
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
    const res = await axios.post(
      `${VITE_BACKEND_URL}/api/v1/auth/username-suggestions`,
      {
        token,
        username,
      }
    );
    return res.data.Suggestions;
  } catch (err) {
    return null;
  }
};

/**
 * @description change the password of the user with the new password
 * @param password
 * @returns  object represents the response from the backend or null
 */
export const restPasswordWithNewOne = async ({
  password,
  email,
}: {
  password: string;
  email: string;
}) => {
  const parsePassword = z.string().safeParse(password);
  const parseEmail = z.string().safeParse(email);
  if (!parsePassword.success || !parseEmail.success) return null;

  try {
    const res = await axios.post(`${VITE_BACKEND_URL}/api/user/RestPassword`, {
      password,
      email,
    });
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
export const loginSerive = async ({
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
      email,
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
    const errObj = err as { stack: string };
    throw new Error(errObj.stack);
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
 * @param   newUserData Object holding name, email, birthdate and password
 * @returns Object holding the backend response or null in case of an error
 */
export const registerNewUser = (newUserData: object) => {
  const parseResult = SignUpDataSchema.safeParse(newUserData);

  if (!parseResult.success) return null;

  const dateString = `${parseResult.data.year}-${parseResult.data.month}-${parseResult.data.day}`;
  const birthDate = new Date(dateString);

  try {
    const res = axios.post(
      `${VITE_BACKEND_URL}/api/v1/auth/signup`,
      {
        name: parseResult.data.name,
        email: parseResult.data.email,
        password: parseResult.data.password,
        passwordConfirmation: parseResult.data.password,
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
