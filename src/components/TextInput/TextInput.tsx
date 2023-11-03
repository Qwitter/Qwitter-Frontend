import React from "react";
import { cn } from "@/lib/utils";

type TextInputProps = {
  placeHolder?: string;
  name?: string;
  className?: string;
  value?:string;
};

export const TextInput = (props: TextInputProps) => {
  const { placeHolder, name, className,value } = props;
  return (
    <div className={cn("relative w-full", className)}>
      <input
        type="text"
        id="floating_filled"
        className="block rounded-md px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-transparent border-[1px] border-gray appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        name={name}
        value={value}
      />
      <label
        htmlFor="floating_filled"
        className="absolute text-md text-gray-500 dark:text-gray duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
      >
        {placeHolder}
      </label>
    </div>
  );
};
