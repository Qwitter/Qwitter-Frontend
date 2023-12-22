import { TextInput } from "@/components";
import { MoveLeft, Search, X } from "lucide-react";
import { MessagesSearchProp } from "../../models/MessagesTypes";
import { cn } from "@/lib";

export function MessagesSearch({ text,setShowSearch, showSearch, setText, className, inputClassName, handleInputFocus }: MessagesSearchProp) {
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setText(value);
    };
    const handleXClick = () => {
        setText("");
    };
    return (<div className="flex flex-row pl-1 items-center">
        {showSearch &&
            <div className="hover:bg-[#191919] h-10  rounded-full transition-all p-2 cursor-pointer"
                data-testid="Back"
                onClick={() => {
                    setShowSearch(false)
                    setText("")
                }}>
                <MoveLeft className='w-[20px] '/>
            </div>
        }
        <div className={cn("px-3 pt-3 mb-2 w-full", className,showSearch?'pl-1':'')}>
            <TextInput
                LeftIcon={Search}
                iconSize="18px"
                onFocus={handleInputFocus}
                value={text}
                onChange={handleTextChange}
                type="messages"
                rightIconFunction={handleXClick}
                {...{ RightIcon: (text.length > 0) ? X : undefined }}
                hasAnimation={false}
                className="items-center w-full pt-[6px]"
                inputClassName={cn('px-8 pr-[15%] sm:pr-[15%] pl-[13.5%] sm:pl-[14%] rounded-full ', inputClassName)} />
        </div>
    </div >);
}
