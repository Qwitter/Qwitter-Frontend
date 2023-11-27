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
  bio: string;
  website: string;
  passwordChangedAt: string;
  id: string;
  google_id: string;
  profileImageUrl: string;
  profileBannerUrl: string;
};

export const EditUserSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Name can't be blank" })
      .max(50, { message: "Name must be less than 50 letters" })
      .trim(),
    bio: z
      .string()
      .max(160, { message: "Name must be less than 160 letters" })
      .trim()
      .nullish(),
    location: z.string().nullish(),
    // website: z.string().url({ message: "Url is not valid." }).nullish(),
    website: z
      .string()
      .nullish()
      .refine((val) => {
        if (val?.trim() === "") {
          return true;
        }
        return /^(?:\w+:)?\/\/([^\s./]+\.\S{2}|localhost[\:?\d]*)\S*$/.test(
          val?.includes("http") ? val : `http://${val!}`
        );
      }),
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
