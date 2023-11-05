import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import { z } from "zod";

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
 * @description Send a verification email to the user
 * @param email
 * @returns object represents the response from the backend or null
 */
export const sendVerificationEmail = async (email: string) => {
  const parseResult = z.string().email().safeParse(email);
  if (!parseResult.success) return null;

  try {
    const res = await axios.post(`${VITE_BACKEND_URL}/api/user/verify-email`, {
      email,
    });
    return res;
  } catch (err) {
    console.log(err);
    return null;
  }
};

/**
 * @description Verify the user's email using the token
 * @param token
 * @returns object represents the response from the backend or throws error
 */
export const verifyEmail = async (token: string) => {
  const parseResult = z.string().nonempty().safeParse(token);
  if (!parseResult.success) return false;

  try {
    const res = await axios(
      `${VITE_BACKEND_URL}/api/user/verify-email/${token}`
    );
    return res;
  } catch (err) {
    throw new Error("Error Verifying Email");
  }
};
