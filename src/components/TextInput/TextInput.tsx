import { MouseEventHandler } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "@/assets";

type TextInputProps = {
  placeHolder?: string;
  name: string;
  className?: string;
  animation?: boolean;
  width?: string;
  height?: string;
  value?: string | number;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

export const TextInput = (props: TextInputProps) => {
  const {
    placeHolder,
    name,
    className,
    animation = true,
    width = "30",
    height = "30",
    value,
    onClick,
  } = props;

  return (
    <div
      className={cn("relative w-full flex flex-row", className)}
      onClick={onClick}
    >
      <input
        type="text"
        id={name}
        className="block rounded-sm px-2 pb-3 pt-6 w-full text-sm text-gray-900 bg-gray-50 dark:bg-transparent border border-gray appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        name={name}
        value={value}
      />
      {/* <img
        src={Logo}
        className="inline absolute"
        width={width}
        height={height}
        alt="input icon"
      /> */}
      <label
        htmlFor={name}
        className="absolute inline text-[17px] font-normal text-gray-500 dark:text-gray duration-300 transform -translate-y-4 scale-75 top-7 z-10 origin-[0] left-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
      >
        {placeHolder}
      </label>
    </div>
  );
};
