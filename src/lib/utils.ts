import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import { z } from "zod";

const { VITE_BACKEND_URL } = process.env;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// /**
//  * @description A wrapper for axios function with the ability to abort the request after some time
//  * @param url
//  * @param timeout
//  * @param config
//  * @returns Promise
//  */
// export const axiosWithTimeout = async (
//   url: string,
//   timeout: number,
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   config?: AxiosRequestConfig<any> | undefined
// ) => {
//   const controller = new AbortController();
//   const { signal } = controller;

//   const fetchPromise = axios(url, { ...config, signal });
//   const timeoutPromise = new Promise((_, reject) =>
//     setTimeout(() => {
//       controller.abort();
//       reject(new Error("Request timed out"));
//     }, timeout)
//   );

//   return Promise.race([fetchPromise, timeoutPromise]);
// };

// /** A wrapper for axios post function with the ability to abort the request after some time
//  * @description
//  * @param url
//  * @param timeout
//  * @param data
//  * @param config
//  * @returns Promise
//  */
// export const axiosPostWithTimeOut = async (
//   url: string,
//   timeout: number,
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   data?: any,
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   config?: AxiosRequestConfig<any> | undefined
// ) => {
//   const controller = new AbortController();
//   const { signal } = controller;
//   const fetchPromise = axios.post(url, { ...data }, { ...config, signal });
//   const timeoutPromise = new Promise((_, reject) =>
//     setTimeout(() => {
//       controller.abort();
//       reject(new Error("Request timed out"));
//     }, timeout)
//   );

//   return Promise.race([fetchPromise, timeoutPromise]);
// };

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
    const errObj = err as { stack: string };
    throw new Error(errObj.stack);
  }
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
    const res = await axios.post(`${VITE_BACKEND_URL}/api/v1/auth/check-existence`, {
      userNameOrEmail: username,
    });
    console.log(res.data)
    return res.status == 200;
  } catch (err) {
    return null;
  }
};

/**
 * @description change the password of the user with the new password 
 * @param password
 * @returns  object represents the response from the backend or null
 */
export const restPasswordWithNewOne = async ({ password, email }: { password: string, email: string }) => {
  const parsePassword = z.string().safeParse(password);
  const parseEmail = z.string().safeParse(email);
  if (!parsePassword.success || !parseEmail.success) return null;

  try {
    const res = await axios.post(`${VITE_BACKEND_URL}/api/user/RestPassword`, {
      password, email
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
export const verifyEmail = async (email: string, token: string) => {
  const parseResult = z.string().nonempty().safeParse(token);
  if (!parseResult.success) return false;

  try {
    const res = await axios.post(
      `${VITE_BACKEND_URL}/api/user/verify-email/${token}`,
      {
        email,
      }
    );
    return res;
  } catch (err) {
    //Todo: change to an error structure
    const errObj = err as { response: { data: { message: string } } };
    if (errObj.response) throw new Error(errObj.response.data.message);
    else throw new Error("Error Verifying Email");
  }
};
/**
 * @description Login Service with the name or username and password 
 * @param {password,emailOrUsername}
 * @returns  object represents the response from the backend or null
 */
export const loginSerive = async ({ email, password }: { email: string, password: string }) => {
  const parsedPassword = z.string().safeParse(password);
  const parsedEmail = z.string().safeParse(email);
  if (!parsedPassword.success || !parsedEmail.success) return null;
  try {
    const res = await axios.post(`${VITE_BACKEND_URL}/api/v1/auth/login`, {
      email,
      password
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
