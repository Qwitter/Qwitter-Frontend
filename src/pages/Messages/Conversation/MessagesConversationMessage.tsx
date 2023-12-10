import { MoreHorizontal, ForwardIcon, Reply } from "lucide-react";
import { useContext, useState } from "react";
import { MessagesMessage } from "../types/MessagesTypes";
import { cn } from "@/lib";
import TweetImagesViewer from "@/components/TweetImagesViewer/TweetImagesViewer";
import moment from "moment";
import { UserContext } from "@/contexts/UserContextProvider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MessagesConversationPopUp } from "./MessagesConversationPopUp";

export function MessagesConversationMessage({isMessage,isGroup, date, id, entities,profileImageUrl ,replyToMessage, text, userName }: MessagesMessage) {
    const { user } = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);
    const formatDate = (dateString: string) => {
        const date = moment(dateString);
        const now = moment();
        if (now.diff(date, 'days') === 0)
            return date.format('h:mm A');
        else if (now.diff(date, 'days') === 1)
            return 'Yesterday,' + date.format('h:mm A');
        else if (now.diff(date, 'days') < 7)
            return date.format('ddd h:mm A');

        else
            return date.format('MMM D, YYYY, h:mm A');
    };

    return (
        
        <div className={cn("flex flex-col pb-6", userName == user?.userName && "items-end")} id={id}>
            {!isMessage? <p className="text-center w-full text-gray text-sm">
                {text}
            </p>: <>
            <div className={cn("flex flex-row items-center ", userName == user?.userName && "justify-end")}>
                {isGroup&& userName != user?.userName&& <img src={profileImageUrl||"https://i.pinimg.com/736x/62/1d/bd/621dbd7d208d5c17498e0f73bf02aee8.jpg"} alt="" className="w-10 h-10 rounded-full mr-2" />}
                <div className={cn("w-[87.5%] group flex flex-row", userName == user?.userName && "flex-row-reverse")}>

                    <div className={cn("flex flex-col gap-1 flex-shrink-1", userName == user?.userName && " items-end")}>
                        {replyToMessage && <div className={cn("flex flex-col mt-3 w-full -mb-7", userName == user?.userName && "justify-end", entities.media.length > 0 && " -mb-10")}>
                            <div className={cn("pb-2 gap-1 min-w-max flex flex-row items-center", userName == user?.userName && "justify-end")}>
                                {userName == user?.userName ? <Reply strokeWidth={5} className="w-[10px] h-[10px] text-[#71767B]" /> : <ForwardIcon strokeWidth={5} className="w-[10px] h-[10px] text-[#71767B]" />}
                                <span className="text-gray text-[11px]">Replying to {isGroup&&replyToMessage.userName}</span>
                            </div>
                            <div className={cn("bg-[#16181C] mt-2 text-[13px] px-4 py-3 max-w-full text-gray  rounded-3xl pb-8 ", userName == user?.userName && "justify-end")}>
                                <p className="break-words max-w-[400px] max-md:max-w-[60vw]">{replyToMessage.text}</p>
                            </div>
                        </div>}
                        <div className={cn("flex-shrink relative flex flex-col items-start ", userName == user?.userName && "items-end")}>

                            {entities.media.length > 0 && <div className="max-w-[80%] ">
                                <TweetImagesViewer images={[{ value: entities.media[0].value, type: entities.media[0].type }]} />
                            </div>}

                            {text.length > 0 && <div className={cn("bg-[#2f3336] text-[15px] px-4 py-3 mt-1 min-w-max rounded-3xl ", userName == user?.userName ? "bg-secondary rounded-br-sm" : "rounded-bl-sm")}>
                                <p className="text-primary text-[15px] break-words max-w-[400px] max-md:max-w-[60vw]">{text}</p>
                            </div>}
                        </div>
                    </div>
                    <Popover open={isOpen} onOpenChange={setIsOpen} >
                        <div className={cn("opacity-0   flex flex-row  group-hover:opacity-100 ", userName == user?.userName ? "pr-1" : "pl-1")}>
                            <div className="text-secondary h-full group relative max-w-[40px] flex items-center w-full cursor-pointer">
                                <PopoverTrigger >
                                    <MoreHorizontal className="w-10 h-10 p-2 rounded-3xl text-gray hover:bg-secondary hover:bg-opacity-10" />
                                </PopoverTrigger>
                            </div>
                        </div>
                        <PopoverContent className="min-w-fit max-w-[250px] max-h-[480px] min-h-[50px] p-0 py-1 overflow-y-auto box-shadow bg-black   rounded-xl">
                            <MessagesConversationPopUp messageId={id} userNameOFReplyMessage={userName} text={text} setIsOpen={setIsOpen} replyId={id} />
                        </PopoverContent>
                    </Popover>
                </div>

            </div>
            <div className={`flex flex-row gap-1 items-center mt-1 ${isGroup&& userName != user?.userName&&'ml-12'}`}>
                <span className="text-gray text-[13px] ">{formatDate(date)}</span>
                {status == "seen" && <><div className="bg-gray rounded-full w-[3px] h-[3px]"></div>
                    <span className="text-gray text-[13px] ">Seen</span>
                </>}

            </div>
            </>
            }

        </div>
    );

}