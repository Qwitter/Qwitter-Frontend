import { cn } from "@/lib";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
type MessageProps = {
    className?: string;
    userName: string;
    name: string;
    setOpenConversation: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export function MessagesAccordionHeader({ className, userName, name, setOpenConversation }: MessageProps) {
    const [isAccordionOpen, setAccordionOpen] = useState(true);

    const handleAccordionToggle = () => {
        setAccordionOpen(!isAccordionOpen);
    };

    return (
        <div
            onClick={handleAccordionToggle}
            className={cn("px-4 w-full h-[53px] flex flex-row justify-center  sticky  top-[-1px] bg-black bg-opacity-60 backdrop-blur-xl z-50 items-center", className)}>
            {isAccordionOpen && <div className="flex justify-between items-center min-w-[56px] min-h-[32px]">

                <div className='w-10 h-10 flex justify-center items-center hover:bg-light-gray rounded-full '>
                    <div onClick={(e) => { e.preventDefault(); setOpenConversation(undefined); }}>
                        <ArrowLeft className=' w-5 h-5 cursor' />
                    </div>
                </div>
            </div>}
            <div className="w-full h-full flex  flex-col items-start justify-center  ">
                <h2 className="font-bold text-xl truncate max-w-[250px] ">{name}</h2>
                {userName && <span className="text-gray text-sm font-normal">@{userName}</span>}
            </div>
        </div>
    )
}