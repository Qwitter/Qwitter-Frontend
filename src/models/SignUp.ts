import { z } from "zod";
import { BirthDaySchema, DAYS_IN_MONTH, MONTHS } from "@/models/BirthDay";
import { MouseEventHandler } from "react";
import { isAtLeast18YearsAgo } from "@/lib/utils";

// schema that holds name, email, birthday
export const Step1DataSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Please enter a name" })
    .max(50, { message: "Name must be less than 50 letters" })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email" }).trim(),
  day: BirthDaySchema.shape.day,
  month: BirthDaySchema.shape.month,
  year: BirthDaySchema.shape.year,
});

export const RefinedStep1DataSchema = z
  .object({
    name: Step1DataSchema.shape.name,
    email: Step1DataSchema.shape.email,
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

// schema that holds the password with its checks
export const Step5DataSchema = z.object({
  password: z
    .string()
    .min(8, {
      message:
        "Your password needs to be at least 8 characters. Please enter a longer one.",
    })
    .refine(
      (password) => {
        return /[A-Za-z]/.test(password);
      },
      { message: "Password must contain at least one letter" }
    ),
});

// schema that holds all data
export const SignUpDataSchema = z.object({
  // nullish is used only to accept the initial state of the user data
  name: Step1DataSchema.shape.name.nullish(),
  email: Step1DataSchema.shape.email.nullish(),
  password: Step5DataSchema.shape.password.nullish(),
  day: Step1DataSchema.shape.day.nullish(),
  month: Step1DataSchema.shape.month.nullish(),
  year: Step1DataSchema.shape.year.nullish(),
});

// props for all sign up steps
export type SignUpStepsProps = {
  nextStep: () => void; // will run when next is pressed
  resetStep?: MouseEventHandler<HTMLDivElement>; // for step 3
  userData?: z.infer<typeof SignUpDataSchema>; // to pass data between step 1, 3 & 5
};
