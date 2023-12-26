import { MoreHorizontal, ForwardIcon, Reply, Info } from "lucide-react";
import { useContext,  useState } from "react";
import { MessagesMessage } from "../../../models/MessagesTypes";
import { cn } from "@/lib";
import TweetImagesViewer from "@/components/TweetImagesViewer/TweetImagesViewer";
import { formatDate } from "@/lib/utils";
import { UserContext } from "@/contexts/UserContextProvider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MessagesConversationPopUp } from "../MessagesPopup/MessagesConversationPopUp";
import ReactLoading from 'react-loading';
import { BigPlayButton, Player } from "video-react";

export function MessagesConversationMessage({ isMessage, isGroup,isAccordion, error, sending, date, id, entities, profileImageUrl, replyToMessage, text, userName, setChatMessages }: MessagesMessage) {
    const { user } = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);

    const handleMentions = () => {
        const reg = /(^|\s)(((@|#)[\w]{1,20}|#[\w]+))/g;
        const matches = text.match(reg);
        if (matches) {
            const newText = text.replace(reg, (match) => {
                match = match.replace(/[ ]/g, '');
                return `<a 
                style='cursor:pointer;text-decoration-line: underline; ' 
                href=${match.startsWith("#") ? "/explore/search/Top/?q=" + match.replace(/[@#]/g, '') : "/profile/" + match.replace(/[@#]/g, '')}
                onmouseover="this.style.textDecorationThickness = '2px';"
                onmouseout="this.style.textDecorationThickness = 'auto';"
                >${match}</a>`;
            });
            // Return the modified text
            return newText;
        }

        return text;
    }


    return (

        <div className={cn("flex flex-col pb-6", userName == user?.userName && "items-end")} id={id}>
            {!isMessage ? <p className="text-center  w-full text-gray text-sm ">
                {text}
            </p> : <>
                <div className={cn("flex flex-row items-center  ", userName == user?.userName && "justify-end")}>
                    {isGroup && userName != user?.userName && <img src={profileImageUrl || "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"} alt="" className="w-10 h-10 rounded-full mr-2" />}
                    <div className={cn("w-[87.5%] group flex flex-row", userName == user?.userName && "flex-row-reverse")}>

                        <div className={cn("flex flex-col gap-1 flex-shrink-1", userName == user?.userName && " items-end")}>
                            {replyToMessage && <div className={cn("flex flex-col mt-3 w-full -mb-7", userName == user?.userName && "justify-end", entities.media.length > 0 && (entities.media[0].type == "video" ? "-mb-5" : " -mb-10"))}>
                                <div className={cn("pb-2 gap-1 min-w-max flex flex-row items-center", userName == user?.userName && "justify-end")}>
                                    {userName == user?.userName ? <Reply strokeWidth={5} className="w-[10px] h-[10px] text-[#71767B]" /> : <ForwardIcon strokeWidth={5} className="w-[10px] h-[10px] text-[#71767B]" />}
                                    <span className="text-gray text-[11px]">Replying to {isGroup && replyToMessage.userName != user?.userName && replyToMessage.userName}</span>
                                </div>
                                <div className={cn("bg-[#16181C] mt-2 text-[13px] px-4 py-3 max-w-full text-gray  rounded-3xl pb-8 ", userName == user?.userName && "justify-end")}>
                                    <p data-testid="replyToMessageText" className={cn("break-words max-w-[400px] max-md:max-w-[60vw]",isAccordion&&"max-w-[225px] max-md:max-w-[225px]")}>{replyToMessage.text}</p>
                                </div>
                            </div>}
                            <div className={cn("flex-shrink relative flex flex-col items-start ", userName == user?.userName && "items-end")}>

                                {
                                    entities.media.length > 0 && (entities.media[0].type == "video" ?
                                        <div
                                            className={cn(" h-max rounded-lg  max-sm:w-[50vw] max overflow-hidden w-[300px] ", error && "opacity-50")}
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            <Player
                                                playsInline
                                                src={entities.media[0].value}
                                            >
                                                <BigPlayButton position="center" />
                                            </Player>
                                        </div> : <div className={cn("max-w-[80%] ", error && "opacity-50")}>
                                            <TweetImagesViewer viewImageMode="view" images={[{ value: entities.media[0].value, type: entities.media[0].type }]}  />
                                        </div>)
                                }

                                {text.length > 0 && <div data-testid="text" className={cn("bg-[#2f3336] text-[15px] px-4 py-3 mt-1 min-w-max rounded-3xl ", userName == user?.userName ? "bg-secondary rounded-br-sm" : "rounded-bl-sm", error && "bg-danger")}>
                                    <p className={cn("text-primary text-[15px] break-words max-w-[400px]  max-md:max-w-[60vw]",isAccordion&&"max-w-[200px]")} dangerouslySetInnerHTML={ { __html: handleMentions() }}>
                                        
                                    </p>
                                </div>}
                            </div>
                        </div>
                        <Popover open={isOpen} onOpenChange={setIsOpen} >
                            <div className={cn("opacity-0   flex flex-row  group-hover:opacity-100 ", userName == user?.userName ? "pr-1" : "pl-1")}>
                                {!sending && !error && <div data-testid="moreButton" className="text-secondary h-full group relative max-w-[40px] flex items-center w-full cursor-pointer">
                                    <PopoverTrigger >
                                        <MoreHorizontal className="w-10 h-10 p-2 rounded-3xl text-gray hover:bg-secondary hover:bg-opacity-10" />
                                    </PopoverTrigger>
                                </div>}
                            </div>
                            <PopoverContent className="min-w-fit max-w-[250px] max-h-[480px] min-h-[50px] p-0 py-1 overflow-y-auto box-shadow bg-black   rounded-xl">
                                <MessagesConversationPopUp setChatMessages={setChatMessages!} isUser={userName == user?.userName} messageId={id} userNameOFReplyMessage={userName} image={entities.media.length > 0 ? [{ value: entities.media[0].value, type: entities.media[0].type }] : [{ value: "", type: "" }]} text={text} setIsOpen={setIsOpen} replyId={id} />
                            </PopoverContent>
                        </Popover>
                    </div>

                </div>
                <div className={`flex flex-row gap-1 items-center mt-1 ${isGroup && userName != user?.userName && 'ml-12'}`}>
                    {isGroup && userName != user?.userName && <span className="text-gray text-[13px] ">{userName}</span>}
                    <span className="text-gray text-[13px] ">{formatDate(date)}</span>
                    {sending && <><div className="bg-gray rounded-full w-[3px] h-[3px]"></div>
                        <div className="flex flex-row gap-1 items-center">
                            <span className="text-gray text-[13px] ">Sending</span>
                            <ReactLoading type={"spokes"} color={"#1DA1F2"} height={10} width={10} />
                        </div>
                    </>}
                    {error && <><div className="bg-gray rounded-full w-[3px] h-[3px]"></div>
                        <div className="flex flex-row gap-1 items-center">
                            <span className="text-danger text-[13px] ">Failed</span>
                            <Info className=" w-4 h-4  text-black" fill="#f4212e" />
                        </div>
                    </>}

                </div>
            </>
            }

        </div>
    );

}
