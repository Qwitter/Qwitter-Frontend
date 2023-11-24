import React, { useRef } from "react";
import { cn } from "@/lib/utils";


export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxRows?: number;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

const Textarea: React.FC<TextareaProps> = ({ text, setText, className, maxRows = 19, ...props }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;
    if (inputText.length <= 900) {
      setText(inputText);
    }
  };

  const calculateRows = () => {
    const rows = Math.ceil((text.length*11) / (textAreaRef.current?(textAreaRef!.current!.offsetWidth!):1)) + 1;
    return Math.max(Math.min(rows, maxRows), 3);
  };
  const highlightExceededChars = () => {
    const limit = 280;
    if (text.length > limit) {
      const charsBeforeLimit = text.slice(0, limit);
      const charsAfterLimit = text.slice(limit);
      return (
        <>
        <span className="text-[20px] ">
          {charsBeforeLimit}
          </span>
          <span className="bg-red-500 break-words text-[20px]">{charsAfterLimit}</span>
        </>
      );
    }
    return (
      <>
      <span className=" text-[20px]">
        {text}
        </span>
      </>
    );
  };


  return (

    <div className="relative w-full">
        <textarea
          className={cn(
            "flex relative text-[20px] leading-[22px] h-full z-5 min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-3 ring-offset-background placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          value={text}
          ref={textAreaRef}
          onChange={handleInputChange}
          rows={calculateRows()}
          {...props}

        />
        <div className="absolute w-full leading-[20.5px] py-3 px-3 -z-40 top-0 left-0 opacity-50 break-words">

          {highlightExceededChars()}
          </div>

    </div>
  );
};

Textarea.displayName = "Textarea";

export { Textarea };
