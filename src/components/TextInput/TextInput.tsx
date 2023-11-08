import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Eye } from "lucide-react";
import { useState } from "react";
import { AiOutlineEyeInvisible } from "react-icons/ai";
interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeHolder?: string;
  errorMessage?: string;
  isPassword?: boolean;
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
      ...props
    },
    ref
  ) => {
    const [inputType, setInputType] = useState(type);

    const togglePassword = () => {
      if (inputType === "text") setInputType("password");
      else setInputType("text");
    };

    let errorBorder: string = "";
    if (errorMessage) {
      errorBorder = "border-danger";
    }

    return (
      <>
        <div className={cn("relative w-full flex flex-row pt-3", className)}>
          <input
            disabled={disabled}
            {...props}
            ref={ref}
            type={inputType}
            className={cn(
              "block rounded-sm z-10 px-2 pb-3 pt-6 w-full text-sm dark:bg-transparent border border-gray appearance-none dark:text-white dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer dark:disabled:border-[#101113] dark:disabled:bg-[#101113] dark:disabled:text-gray disabled:border-[#101113]/10 disabled:bg-[#101113]/10 disabled:text-gray",
              errorBorder
            )}
            placeholder=""
          />
          {isPassword && (
            <>
              {inputType === "text" && (
                <AiOutlineEyeInvisible
                  size="1.5rem"
                  className="inline absolute hover:cursor-pointer z-20 left-[90%] bottom-4"
                  onClick={togglePassword}
                />
              )}
              {inputType === "password" && (
                <Eye
                  className="inline absolute hover:cursor-pointer z-20 left-[90%] bottom-4"
                  onClick={togglePassword}
                />
              )}
            </>
          )}
          <label className="absolute inline text-[17px] font-normal text-gray dark:text-gray z-10 duration-300 transform -translate-y-4 scale-75 top-7 origin-[0] left-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
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
