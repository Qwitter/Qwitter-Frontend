import { TextInput } from "@/components";
import { Search, X } from "lucide-react";
import { MessagesSearchProp } from "./types/MessagesTypes";
import { cn } from "@/lib";

export function MessagesSearch({ text, setText,className,inputClassName }: MessagesSearchProp) {
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setText(value);
    };
    const handleXClick = () => {
        setText("");
    };
    return (<>
        <div className={cn("px-3 mb-2",className)}>
            <TextInput
                LeftIcon={Search}
                iconSize="18px"
                value={text}
                onChange={handleTextChange}
                type="messages"
                rightIconFunction={handleXClick}
                {...{ RightIcon: (text.length > 0) ? X : undefined }}
                hasAnimation={false}
                className="items-center w-full pt-[6px]"
                inputClassName={cn('px-8 pr-[15%] sm:pr-[15%] pl-[13.5%] sm:pl-[14%] rounded-full ',inputClassName)} />
        </div>
    </>);
}
