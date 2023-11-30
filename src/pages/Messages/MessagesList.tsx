import { XCircle } from "lucide-react";
import { MessagesListProp } from "./types/MessagesTypes";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MessagesRequestPopUp } from "./Messages";

export function MessagesList({ users, selectedUser, setSelectedUser, mode = "normal" }: MessagesListProp) {

    return (<>

        {users.map(user => (
            <li key={user.username} className={cn("py-3 px-4 flex flex-row justify-between  hover:bg-[#16181c] w-full transition-all cursor-pointer", user.username == selectedUser.username ? "bg-[#16181c]  border-secondary border-r-2 " : "")} onClick={() => setSelectedUser(user)}>
                <div className="flex flex-row">
                    <Avatar className="mr-4">
                        <AvatarImage className="w-10 h-10 rounded-full border-[#ffffee] border-[1px] border-solid" src={user.imageUrl} />
                    </Avatar>
                    <div className="flex flex-col gap-0 overflow-hidden">
                        <div className="flex flex-row gap-1 items-center ">
                            <h3 className="text-primary text-[15px]">{user.name}</h3>
                            <span className="text-gray break-words">@{user.username}</span>
                            <div className="bg-gray rounded-full w-[3px] h-[3px]"></div>
                            <span className="text-gray break-words">{user.lastMessageTime}</span>
                        </div>
                        <span className={`overflow-hidden ${(user.username == selectedUser.username) || (user.lastMessageTime.length > 5) ? 'text-primary' : 'text-gray'}`}>{user.lastMessage}</span>
                    </div>
                </div>
                <div className="w-[60px] flex justify-end gap-3  flex-row items-first">
                    {user.lastMessageTime.length > 5 &&
                        <div>
                            <div className="bg-secondary rounded-full w-[10px] h-[10px] mt-2"></div>
                        </div>}
                    {mode == "request" &&
                        <Popover>
                            <PopoverTrigger className="z-30 ">
                                <div className="h-12 z-0 flex flex-row items-first     cursor-pointer">
                                    <XCircle />
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="min-w-[360px] max-w-[360px] max-h-[480px] min-h-[50px] p-0 pb-2 overflow-y-auto box-shadow bg-black   rounded-xl">
                                <MessagesRequestPopUp conversationUsername={user.username} handleBlock={() => { }} handleRemoveConversation={() => { }} />
                            </PopoverContent>
                        </Popover>}
                </div>
            </li>
        ))}</>
    );
}
