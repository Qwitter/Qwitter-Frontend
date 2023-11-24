import React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxRows?: number;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

const Textarea: React.FC<TextareaProps> = ({ text, setText, className, maxRows = 19, ...props }) => {

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const calculateRows = () => {
    const rowHeight = 47;
    const rows = Math.ceil(text.length / rowHeight) + 1;
    return Math.max(Math.min(rows, maxRows), 3);
  };



  return (

    <div className="relative w-full">
      
      <textarea        
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        value={text}
        onChange={handleInputChange}
        rows={calculateRows()}
        {...props}
      />
    </div>
  );
};

Textarea.displayName = "Textarea";

export { Textarea };
