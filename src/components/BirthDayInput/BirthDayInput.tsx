import { useState } from "react";
import {
  BirthDaySchema,
  DAYS_IN_MONTH,
  MONTHS,
  Month,
} from "@/models/BirthDay";
import {
  FormField,
  FormItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "..";
import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";

type BirthDayInputProps = {
  className?: string;
  form: UseFormReturn<
    {
      day: number;
      month:
        | "January"
        | "February"
        | "March"
        | "April"
        | "May"
        | "June"
        | "July"
        | "August"
        | "September"
        | "October"
        | "November"
        | "December";
      year: number;
    },
    any,
    undefined
  >;
};
const BirthDayInput = ({ className, form }: BirthDayInputProps) => {
  const [month, setMonth] = useState<Month>(Month.January);

  return (
    <div className={cn("flex justify-between w-full gap-4", className)}>
      <FormField
        control={form.control}
        name="month"
        render={({ field }) => (
          <FormItem className="w-full">
            <Select
              onValueChange={(val: Month) => {
                setMonth(val);
                if (DAYS_IN_MONTH[val] < form.getValues("day")) {
                  form.resetField("day");
                }
                field.onChange(val);
              }}
              defaultValue={field.value}
            >
              <SelectTrigger
                className={cn({
                  "border-danger": form.formState.errors.month,
                })}
              >
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent className="max-h-[var(--radix-select-content-available-height)]">
                {MONTHS.map((month, i) => (
                  <SelectItem key={i} value={`${month}`}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.month && (
              <p className="text-danger text-sm">
                {form.formState.errors.month.message}
              </p>
            )}
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="day"
        render={({ field }) => (
          <FormItem className="w-full max-w-[140px]">
            <Select onValueChange={field.onChange}>
              <SelectTrigger
                className={cn({
                  "border-danger": form.formState.errors.day,
                })}
              >
                <SelectValue placeholder="Day" />
              </SelectTrigger>
              <SelectContent className="max-h-[var(--radix-select-content-available-height)]">
                {[...Array(DAYS_IN_MONTH[month])].map((_, i) => (
                  <SelectItem key={i} value={`${i + 1}`}>
                    {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.day && (
              <p className="text-danger text-sm">
                {form.formState.errors.day.message}
              </p>
            )}
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="year"
        render={({ field }) => (
          <FormItem className="w-full max-w-[200px] ">
            <Select onValueChange={field.onChange}>
              <SelectTrigger
                className={cn({
                  "border-danger": form.formState.errors.year,
                })}
              >
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent className="max-h-[var(--radix-select-content-available-height)]">
                {[...Array(123)].map((_, i) => (
                  <SelectItem key={i} value={`${2023 - i}`}>
                    {2023 - i}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.year && (
              <p className="text-danger text-sm">
                {form.formState.errors.year.message}
              </p>
            )}
          </FormItem>
        )}
      />
    </div>
  );
};
export default BirthDayInput;
