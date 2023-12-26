import { z } from "zod";
import { Step1DataSchema } from "./SignUp";
import { DAYS_IN_MONTH, MONTHS } from "./BirthDay";
import { isAtLeast18YearsAgo } from "@/lib/utils";

export type User = {
  name: string;
  email: string;
  birthDate: string;
  userName: string;
  createdAt: string;
  location: string;
  description: string;
  url: string;
  passwordChangedAt: string;
  id: string;
  google_id: string;
  profileImageUrl: string;
  profileBannerUrl: string;
  verified: boolean;
  isFollowing: boolean;
  followersCount: number;
  followingCount: number;
  unSeenConversation?:number;
  notificationCount?:number;
};

export const EditUserSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Name can't be blank" })
      .max(50, { message: "Name must be less than 50 letters" })
      .trim(),
    description: z
      .string()
      .max(160, { message: "Name must be less than 160 letters" })
      .trim()
      .nullish(),
    location: z.string().nullish(),
    url: z
      .string()
      .refine(
        (val) => {
          if (val?.trim() === "") {
            return true;
          }
          // eslint-disable-next-line no-useless-escape
          return /^(?:\w+:)?\/\/([^\s./]+\.\S{2}|localhost[\:?\d]*)\S*$/.test(
            val?.includes("http") ? val : `http://${val!}`
          );
        },
        { message: "Url is not valid." }
      )
      .nullish(),
    day: Step1DataSchema.shape.day,
    month: Step1DataSchema.shape.month,
    year: Step1DataSchema.shape.year,
    birthDate: z.string().nullish(),
  })
  .refine((data) => {
    const daysInMonth = DAYS_IN_MONTH[data.month];
    return (
      data.day <= daysInMonth,
      {
        message: "Must be a valid day for the month",
        path: ["day"],
      }
    );
  })
  .refine((data) => {
    const date = new Date(data.year, MONTHS.indexOf(data.month), data.day);
    return (
      isAtLeast18YearsAgo(date),
      {
        message: "Must be at least 18 years old",
        path: ["year"],
      }
    );
  });

export const UserDataSchema = z.object({
  userName: z.string(),
  name: z.string(),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, {
    message: "birthDate must be in the format yyyy-mm-dd hh:mm:ss",
  }),
  url: z.string().optional(),
  description: z.string(),
  protected: z.boolean().optional(),
  verified: z.boolean(),
  followersCount: z
    .number()
    .min(0, { message: "followersCount must be positive or zero" }),
  followingCount: z
    .number()
    .min(0, { message: "followingCount must be positive or zero" }),
  createdAt: z.string().regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, {
    message: "createdAt must be in the format yyyy-mm-dd hh:mm:ss",
  }),
  profileBannerUrl: z.string().url(),
  profileImageUrl: z.string().url(),
  email: z.string().email(),
});

export const UserProfileSchema = z
  .object({
    location: z.string().nullish(),
    tweetCount: z.number().default(0).nullish(),
    isFollowing: z.boolean().default(false).nullish(),
    isBlocked: z.boolean().default(false).nullish(),
    isMuted: z.boolean().default(false).nullish(),
  })
  .merge(UserDataSchema);

export type UserProfileData = z.infer<typeof UserProfileSchema>;
export type UserData = z.infer<typeof UserDataSchema>;
