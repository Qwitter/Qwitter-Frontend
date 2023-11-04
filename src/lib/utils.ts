import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

const { VITE_BACKEND_URL } = import.meta.env;

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

export const isAtLeast18YearsAgo = (date: Date): boolean => {
  const now = new Date();
  const eighteenYearsAgo = new Date(
    now.getFullYear() - 18,
    now.getMonth(),
    now.getDate()
  );
  return date <= eighteenYearsAgo;
}