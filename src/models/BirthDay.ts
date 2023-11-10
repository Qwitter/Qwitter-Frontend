import { isAtLeast18YearsAgo } from "../lib/utils";
import { z } from "zod";

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export enum Month {
  January = "January",
  February = "February",
  March = "March",
  April = "April",
  May = "May",
  June = "June",
  July = "July",
  August = "August",
  September = "September",
  October = "October",
  November = "November",
  December = "December",
}

type DaysInMonth = {
  [key in (typeof MONTHS)[number]]: number;
};

export const DAYS_IN_MONTH: DaysInMonth = {
  January: 31,
  February: 28,
  March: 31,
  April: 30,
  May: 31,
  June: 30,
  July: 31,
  August: 30,
  September: 31,
  October: 30,
  November: 31,
  December: 30,
} as const;

export const BirthDaySchema = z.object({
  day: z
    .string({
      required_error: "Day is required",
    })
    .max(2)
    .min(1)
    .transform((val, ctx) => {
      const parsed = parseInt(val);
      if (isNaN(parsed)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Not a number",
        });
        return z.NEVER;
      }
      return parsed;
    })
    .refine((val) => val >= 1 && val <= 31, {
      message: "Must be a valid Day.",
    }),
  month: z.enum(MONTHS, {
    required_error: "Month is required",
  }),
  year: z
    .string({
      required_error: "Year is required",
    })
    .length(4)
    .transform((val, ctx) => {
      const parsed = parseInt(val);
      if (isNaN(parsed)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Not a number",
        });
        return z.NEVER;
      }
      return parsed;
    })
    .refine((val) => val >= 1900 && val <= 2005, {
      message: "Must be older that 18 years",
    }),
});

export const RefinedBirthDaySchema = z
  .object({
    day: BirthDaySchema.shape.day,
    month: BirthDaySchema.shape.month,
    year: BirthDaySchema.shape.year,
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

export type BirthDay = z.infer<typeof RefinedBirthDaySchema>;
