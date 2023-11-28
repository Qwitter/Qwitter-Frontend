import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Eye, LucideIcon } from "lucide-react";
import { useState } from "react";
import { AiOutlineEyeInvisible } from "react-icons/ai";
interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeHolder?: string;
  errorMessage?: string;
  isPassword?: boolean;
  inputClassName?: string;
  RightIcon?: LucideIcon;
  LeftIcon?: LucideIcon;
  rightIconFunction?: () => void;
  hasAnimation?: boolean;
  iconSize?: string;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      disabled = false,
      placeHolder,
      isPassword = false,
      errorMessage,
      type = "text",
      className,
      inputClassName = "",
      RightIcon,
      LeftIcon,
      rightIconFunction,
      hasAnimation = true,
      iconSize = "1.5rem",
      ...props
    },
    ref
  ) => {
    const [inputType, setInputType] = useState(type);

    const togglePassword = () => {
      if (inputType === "text") setInputType("password");
      else setInputType("text");
    };

    if (errorMessage) {
      inputClassName = inputClassName + " border-danger";
    }

    return (
      <>
        <div className={cn("relative w-full flex flex-row pt-3", className)}>
          {LeftIcon && (
            <LeftIcon
              size={iconSize}
              className={`inline absolute hover:cursor-pointer z-20 left-[5%] ${
                disabled ? "text-gray" : "text-secondary"
              }`}
              onClick={rightIconFunction}
            />
          )}
          <input
            disabled={disabled}
            {...props}
            id={props.name?.toString()}
            role={props.role}
            ref={ref}
            type={inputType}
            className={cn(
              "block rounded-sm z-10 px-2 py-3 w-full text-sm bg-black border border-gray appearance-none dark:text-white  dark:disabled:border-[#202327] dark:disabled:bg-[#202327] dark:disabled:text-gray disabled:border-[#202327]/10 disabled:bg-[#202327]/10 disabled:text-gray dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer",
              hasAnimation && "pt-6",
              (isPassword || inputType === "password" || RightIcon) &&
                "pr-[15%] sm:pr-[12%]",
              LeftIcon && "pl-[13.5%] sm:pl-[10%]",
              inputClassName
            )}
            placeholder={type == "homeSearch" ? "Search" : ""}
          />
          {isPassword && (
            <>
              {inputType === "text" && (
                <AiOutlineEyeInvisible
                  size={iconSize}
                  className="inline absolute hover:cursor-pointer z-20 left-[85%] sm:left-[90%] bottom-[20%]"
                  onClick={togglePassword}
                />
              )}
              {inputType === "password" && (
                <Eye
                  size={iconSize}
                  className="inline absolute hover:cursor-pointer z-20 left-[85%] sm:left-[90%] bottom-[20%]"
                  onClick={togglePassword}
                  data-testid="passwordEye"
                />
              )}
            </>
          )}
          {RightIcon && (
            <RightIcon
              size={iconSize}
              className="inline absolute hover:cursor-pointer z-20 left-[85%] sm:left-[88%] bg-secondary text-black p-[2px]  rounded-full "
              onClick={rightIconFunction}
            />
          )}
          <label
            htmlFor={props.name?.toString()}
            className={cn(
              "absolute text-[17px] font-normal text-gray dark:text-gray z-10 duration-300 transform -translate-y-4 scale-75 top-[40%] origin-[0] left-2 hover:cursor-text peer-focus:text-blue-600 peer-focus:dark:text-blue-500 hidden peer-placeholder-shown:inline peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0",
              hasAnimation &&
                "inline top-7 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:pl-0 sm:peer-focus:pl-0",
              LeftIcon &&
                "peer-placeholder-shown:pl-[11%] sm:peer-placeholder-shown:pl-[8.5%]"
            )}
          >
            {placeHolder}
          </label>
        </div>
        {(errorMessage && (
          <h5 className="text-danger text-[15px] pb-3 px-2">{errorMessage}</h5>
        )) || <div className="w-full h-3"></div>}
      </>
    );
  }
);
