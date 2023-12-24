import { MoreHorizontal, Pin, Trash2, XCircle } from "lucide-react";
import { conversation, MessagesListProp } from "../../models/MessagesTypes";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MessagesRequestPopUp } from "./Messages";
import Highlighter from 'react-highlight-words'
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useContext, } from "react";
import { MessagesContext } from "@/contexts/MessagesContextProvider";
//import { FollowButton } from "@/components/FollowButton/FollowButton";
import ImageGrid from "./ImageGrid";
import { AvatarFallback } from "@/components/ui/avatar";
// import { useEffect } from "react";

export function MessagesList({
    conversations, showDeletePopUp = () => { },
    setOpenConversation,
    matchedPart = "", mode = "normal" }: MessagesListProp) {
    const navigate = useNavigate()
    const { VITE_DEFAULT_IMAGE } = import.meta.env;

    const { currentConversation, setCurrentConversation } = useContext(MessagesContext)

    const handleConversationClick = (conversation: conversation) => {
        setCurrentConversation && setCurrentConversation(conversation);
        setOpenConversation?setOpenConversation(conversation.id):
        navigate("/Messages/" + conversation.id)
    }
    const formatDate = (dateString: string) => {
        try {
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
        } catch (e) {
            return "";
        }

    };
    console.log(conversations)


    return (<div data-testid="convos">

        {conversations && conversations.map((user, index) => (
            <li key={index} className={cn("py-3 px-4 flex overflow-x-hidden flex-row justify-between group  hover:bg-[#16181c] w-full transition-all cursor-pointer items-start ", (user.id == currentConversation?.id) ? "bg-[#16181c]  border-secondary border-r-4 " : "")} onClick={() => handleConversationClick(user)} >
                <div className={`flex flex-row flex-grow  ${mode != "Group" && 'truncate'} max-w-[86%]`} >
                    {(user.isGroup||user.type=="group") &&!user.photo? <ImageGrid
                        className="w-12 h-10  rounded-full mr-2 min-w-[40px] max-lg:w-10 "
                        images={user.users.map(conversation => conversation.profileImageUrl || VITE_DEFAULT_IMAGE)} /> : <Avatar className="mr-4 min-w-max ">
                        <AvatarImage className="w-10 h-10 rounded-full border-[#ffffee] border-[1px] border-solid" src={(user.isGroup||user.type=="group") ? user.photo : user.users[0].profileImageUrl} />
                        <AvatarFallback className="w-10 h-10 rounded-full border-[#ffffee] border-[1px] border-solid" >{user?.users[0].userName.substring(0, 2)}</AvatarFallback>
                    </Avatar>}
                    <div className="flex flex-col gap-0 w-full ">
                        <div className={cn("flex flex-row gap-1 items-center max-w-full", mode == "People" && 'justify-between w-full', mode == "Group" && 'truncate max-w-[77%]')}>
                            {mode == "People" ? <Highlighter searchWords={[matchedPart]} highlightClassName="text-black" ClassName="text-primary font-semibold text-[15px]" autoEscape={true}
                                textToHighlight={user.users.map(user=>user.name).join(", ")}
                            /> : <span className="text-primary font-semibold text-[15px] max-w-[60%] truncate ">{user.name||user.users[0].name||""}</span>
                            }
                            {mode !== "People" && (
                                <>
                                    {mode !== "conversations" && !user.isGroup &&mode !== "Group"&& <span className="text-gray max-w-[60%] truncate  max-xs:hidden ">@{user.users[0].userName}</span>}
                                    <div className="bg-gray rounded-full w-[3px] h-[3px]  max-xs:hidden"></div>
                                    <span className="text-gray whitespace-nowrap max-xs:hidden  ">{formatDate(user.lastMessage?.date || "")}</span>


                                </>)}

                        </div>
                        {
                            mode == "conversations" ?
                                <Highlighter searchWords={[matchedPart]} highlightClassName="text-black" ClassName={'text-gray'} autoEscape={true}
                                    textToHighlight={user.lastMessage?.text || ""}
                                /> : mode == "Group" ? <Highlighter searchWords={[matchedPart]} highlightClassName="text-black " ClassName={`text-gray`} autoEscape={true}
                                    textToHighlight={user.lastMessage?.text||""}
                                /> :
                                    <span className={`overflow-hidden ${((user.id == currentConversation?.id||!user.seen&& mode != "People" )) && mode != "People" ? 'text-primary' : 'text-gray'}`}>{mode != "People" ? `${user.lastMessage?.text}` : `@${user.users[0].userName}`}</span>
                        }

                    </div>

                </div>
                <div className="flex justify-end gap-3 self-start  flex-row items-first">
                    {mode != "People" && !user.seen &&
                        <div>
                            <div className="bg-secondary rounded-full w-[10px] h-[10px] mt-3.5 "></div>
                        </div>}
                    {/* {
                        mode == "People" && <FollowButton  username={user.users[0].userName} isFollowing={user.users[0].isFollowing!} />
                    } */}

                    <Popover>
                        {mode == "request" && <>
                            <div className="z-0 flex flex-row items-first cursor-pointer">
                                <PopoverTrigger className="z-30 max-h-max">
                                    <XCircle />
                                </PopoverTrigger>
                            </div>
                            <PopoverContent className="min-w-[360px] max-w-[360px] max-h-[480px] min-h-[50px] p-0 pb-2 overflow-y-auto box-shadow bg-black   rounded-xl">
                                <MessagesRequestPopUp conversationUsername={user.users[0].userName} handleBlock={() => { }} handleRemoveConversation={() => { }} />
                            </PopoverContent>
                        </>

                        }
                        {
                            mode == "normal" && <>
                                <div className="z-0 flex flex-row items-first cursor-pointer">
                                    <PopoverTrigger  onClick={(e) => {e.stopPropagation();}}>
                                        <div className={"hidden group-hover:flex flex-row  group-hover: pl-1"} >
                                            <div data-testid="convoPopover" className="text-secondary h-full group relative max-w-[40px] flex items-start w-full cursor-pointer">
                                                <MoreHorizontal className="w-10 h-10 p-2 rounded-3xl text-gray hover:bg-secondary hover:bg-opacity-10" />
                                            </div>
                                        </div>
                                    </PopoverTrigger>
                                </div>
                                <PopoverContent className="min-w-fit max-w-[230px] max-h-[480px] min-h-[50px] p-0 pb-2 overflow-y-auto box-shadow bg-black   rounded-xl">
                                    <MessagesConversationListPopUp showDeletePopUp={() => showDeletePopUp(user.id || "")} />
                                </PopoverContent>
                            </>
                        }
                    </Popover>
                </div>
            </li>
        ))}</div>
    );
}
export function MessagesConversationListPopUp({ showDeletePopUp }: { showDeletePopUp: () => void }) {


    return (
        <>
            <div className="w-full px-4 py-3 flex-row flex hover:bg-[#16181c] cursor-pointer
            border-b border-primary border-opacity-30
            ">
                <div className="pr-3 flex justify-center items-center ">
                    <Pin className="h-5 w-5 text-primary" />
                </div>
                <span className="text-primary text-[15px] font-bold">Pin conversation</span>

            </div>

            <div className="w-full px-4 py-3 flex-row flex hover:bg-[#16181c] cursor-pointer" onClick={showDeletePopUp} >
                <div data-testid="deleteConversation" className="pr-3 flex justify-center items-center ">
                    <Trash2 className="h-5 w-5 text-danger" />
                </div>
                <span className="text-danger text-[15px] font-bold">Delete conversation</span>
            </div>
        </>
    )
}