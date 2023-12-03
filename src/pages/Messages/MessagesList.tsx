import {  MoreHorizontal, Pin, Trash2, XCircle } from "lucide-react";
import { MessageUser, MessagesListProp } from "./types/MessagesTypes";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MessagesRequestPopUp } from "./Messages";
import Highlighter from 'react-highlight-words'
import { useNavigate } from "react-router-dom";
import { Button } from "@/components";
// import { useEffect } from "react";

export function MessagesList({ users, selectedUser, setSelectedUser,showDeletePopUp=()=>{}, matchedPart = "", mode = "normal" }: MessagesListProp) {
    const navigate = useNavigate()
    const handleConversationClick = (user: MessageUser) => {
        setSelectedUser && setSelectedUser(user)
        navigate("/Messages/" + user.id)
    }
    // const formatDate = (dateString: string) => {
    //     const date = moment(dateString);
    //     const now = moment();
    //     if (now.diff(date, 'days') === 0)
    //         return date.format('h:mm A');
    //     else if (now.diff(date, 'days') === 1)
    //         return 'Yesterday,' + date.format('h:mm A');
    //     else if (now.diff(date, 'days') < 7)
    //         return date.format('ddd h:mm A');

    //     else
    //         return date.format('MMM D, YYYY, h:mm A');

    // };
    // useEffect(()=>{
    //     console.log(users)
    // },[users])
    return (<>

        {users.map(user => (
            <li key={user.userName} className={cn("py-3 px-4 flex flex-row justify-between group  hover:bg-[#16181c] w-full transition-all cursor-pointer items-start", user.userName == selectedUser?.userName ? "bg-[#16181c]  border-secondary border-r-2 " : "")} >
                <div className="flex flex-row flex-grow" onClick={() => handleConversationClick(user)}>
                    <Avatar className="mr-4">
                        <AvatarImage className="w-10 h-10 rounded-full border-[#ffffee] border-[1px] border-solid" src={user.userPhoto} />
                    </Avatar>
                    <div className="flex flex-col gap-0 overflow-hidden">
                        <div className={cn("flex flex-row gap-1 items-center ",mode=="People"&&'justify-between w-full')}>
                            {mode == "People" ? <Highlighter searchWords={[matchedPart]} highlightClassName="text-black" ClassName="text-primary font-semibold text-[15px]" autoEscape={true}
                                textToHighlight={user.name}
                            /> : <span className="text-primary font-semibold text-[15px]">{user.name}</span>
                            }
                            {mode !== "People" && (
                                <>
                                    {mode !== "conversations" && <span className="text-gray break-words">@{user.userName}</span>}
                                    <div className="bg-gray rounded-full w-[3px] h-[3px]"></div>
                                    <span className="text-gray break-words">{user.lastMessageTime}</span>

                                </>)}

                        </div>
                        {
                            mode == "conversations" ?
                                <Highlighter searchWords={[matchedPart]} highlightClassName="text-black" ClassName={`overflow-hidden ${((user.userName == selectedUser?.userName)) ? 'text-primary' : 'text-gray'}`} autoEscape={true}
                                    textToHighlight={user.name}
                                /> : /*Wrong condition fix it */
                                <span className={`overflow-hidden ${((user.userName == selectedUser?.userName)) && mode != "People" ? 'text-primary' : 'text-gray'}`}>{mode != "People" ? `${user.lastMessage}` : `@${user.userName}`}</span>
                        }
                    </div>

                </div>
                <div className="flex justify-end gap-3 self-start  flex-row items-first">
                    { mode != "People" &&
                        <div>
                            <div className="bg-secondary rounded-full w-[10px] h-[10px] mt-3.5 "></div>
                        </div>}
                        {
                                mode =="People"&&<Button variant={"default"} >Following</Button>
                            }

                    <Popover>
                        {mode == "request" && <>
                            <div className="z-0 flex flex-row items-first cursor-pointer">
                                <PopoverTrigger className="z-30 max-h-max">
                                    <XCircle />
                                </PopoverTrigger>
                            </div>
                            <PopoverContent className="min-w-[360px] max-w-[360px] max-h-[480px] min-h-[50px] p-0 pb-2 overflow-y-auto box-shadow bg-black   rounded-xl">
                                <MessagesRequestPopUp conversationUsername={user.userName} handleBlock={() => { }} handleRemoveConversation={() => { }} />
                            </PopoverContent>
                        </>

                        }
                        {
                            mode == "normal" && <>
                                <div className="z-0 flex flex-row items-first cursor-pointer">
                                    <PopoverTrigger >
                                        <div className={"hidden group-hover:flex flex-row  group-hover: pl-1"}>
                                            <div className="text-secondary h-full group relative max-w-[40px] flex items-start w-full cursor-pointer">
                                                <MoreHorizontal className="w-10 h-10 p-2 rounded-3xl text-gray hover:bg-secondary hover:bg-opacity-10" />
                                            </div>
                                        </div>
                                    </PopoverTrigger>
                                </div>
                                <PopoverContent className="min-w-fit max-w-[230px] max-h-[480px] min-h-[50px] p-0 pb-2 overflow-y-auto box-shadow bg-black   rounded-xl">
                                    <MessagesConversationListPopUp showDeletePopUp={showDeletePopUp} />
                                </PopoverContent>
                            </>
                        }
                    </Popover>
                </div>
            </li>
        ))}</>
    );
}
export function MessagesConversationListPopUp({showDeletePopUp}:{showDeletePopUp:()=>void}) {

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
                <div className="pr-3 flex justify-center items-center ">
                    <Trash2 className="h-5 w-5 text-danger" />
                </div>
                <span className="text-danger text-[15px] font-bold">Delete conversation</span>
            </div>
        </>
    )
}