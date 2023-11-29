import { Button, OptionsHeader, TextInput } from "@/components";
import { Ban, Search, Settings, Trash2, X, XCircle } from "lucide-react";
import { useState } from "react";
import { MessageUser, MessagesListProp, MessagesRequestPopUpProp, MessagesSearchProp, MessagesSideProp } from "./types/MessagesTypes";
import { AllowMessagesOptions, userArray } from "@/constants";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MessagesMain } from "./MessagesMain";
export function Messages() {
    const location = useLocation();
    const previousLocation = location.state?.previousLocation;
    return (
        <>
            <div className="max-w-[600px]  pb-16 relative flex flex-col z-0 flex-grow w-[72%] max-largeX:hidden  h-full">
                <Routes location={previousLocation || location} >
                    <Route path="/requests" element={<MessagesRequests />} />
                    <Route index path="/*" element={<MessagesMain />} />
                </Routes>
            </div>
            <div className="max-w-[600px] w-full h-full flex-grow border-x border-primary border-opacity-30 ">
                <Routes location={previousLocation || location} >
                    <Route path="/settings" element={<MessagesSettings />} />
                    <Route index path="/" element={<MessagesSide p={"Choose from your existing conversations, start a new one, or just keep swimming."} showButton />} />
                    <Route path="/requests" element={<MessagesSide showButton={false} p={"Message requests from people you don't follow live here. To reply to their messages, you need to accept the request"} />} />
                </Routes>

            </div>

        </>
    );
}

function MessagesSettings() {
    const [optionValue, setOptionValue] = useState('Everyone');
    return (
        <div className=" w-full h-full border-r border-primary border-opacity-30 mb-20">
            <OptionsHeader header='Direct Messages' />
            <div className="px-4 py-3">
                <div className="flex flex-col">
                    <span className="text-primary text-[15px] font-semibold"> Allow message requests from:</span>
                    <span className="text-gray text-[13px]"> People you follow will always be able to message you</span>
                </div>
                <RadioGroup defaultValue="option-one"
                    value={optionValue}
                    onValueChange={setOptionValue}
                >
                    <ul className="mt-2">
                        {
                            AllowMessagesOptions.map((option, index) => (
                                <li key={index} id={option} className="w-full flex flex-row items-center justify-between py-1 cursor-pointer" onClick={() => setOptionValue(option)}>
                                    <label >{option}</label>
                                    <RadioGroupItem className="w-5 h-5 border-gray border text-secondary" value={option} />
                                </li>
                            ))
                        }
                    </ul>
                </RadioGroup>
            </div>
        </div>
    )
}
function MessagesSide({ p, showButton }: MessagesSideProp) {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <div className="w-full h-full max-h-[100vh] flex justify-center items-center">
            <div className="max-w-[400px] px-8 mx-8 ">
                <h2 className="text-primary text-[31px] font-bold">Select a message</h2>
                <p className="text-gray text-[15px] break-words mb-7">{p}
                </p>
                {showButton && <Button variant={"secondary"} className="py-3 w-[200px]" onClick={() => navigate('/Messages/compose', { state: { previousLocation: location } })} >New Messages</Button>
                }</div>
        </div>
    )
}
export function MessagesSearch({ text, setText, }: MessagesSearchProp) {
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setText(value)
    }
    const handleXClick = () => {
        setText("")
    }
    return (<>
        <div className="px-3 mb-2">
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
                inputClassName='px-8 pr-[15%] sm:pr-[15%] pl-[13.5%] sm:pl-[14%] rounded-full ' />
        </div>
    </>)
}

export function MessagesList({ users, selectedUser, setSelectedUser, mode = "normal" }: MessagesListProp) {

    return (<>

        {users.map(user => (
            <li key={user.username} className={cn("py-3 px-4 flex flex-row justify-between  hover:bg-[#16181c] w-full transition-all cursor-pointer", user.username == selectedUser.username ? "bg-[#16181c]  border-secondary border-r-2 " : "")} onClick={() => setSelectedUser(user)} >
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
                        </div>
                    }
                    {mode == "request" &&
                        <Popover  >
                            <PopoverTrigger className="z-30 ">
                                <div className="h-12 z-0 flex flex-row items-first     cursor-pointer">
                                    <XCircle />
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="min-w-[360px] max-w-[360px] max-h-[480px] min-h-[50px] p-0 pb-2 overflow-y-auto box-shadow bg-black   rounded-xl">
                                <MessagesRequestPopUp conversationUsername={user.username} handleBlock={()=>{}} handleRemoveConversation={()=>{}} />
                            </PopoverContent>
                        </Popover>}
                </div>
            </li>
        ))
        }</>
    )
}
function MessagesRequestPopUp({conversationUsername,handleBlock,handleRemoveConversation}:MessagesRequestPopUpProp) {
    return (
        <>
            <div className="w-full px-4 py-3 flex-row flex hover:bg-[#16181c] cursor-pointer" onClick={handleRemoveConversation}>
                <div className="pr-3 flex justify-center items-center ">
                    <Trash2 className="h-5 w-5 text-danger"  />
                </div>
                <div className="flex flex-col">
                    <span className="text-danger text-[15px] font-bold">Delete conversation</span>
                    <span className="text-gray text-sm">This conversation will be deleted from your inbox. Other people in the conversation will still be able to see it.</span>
                </div>
            </div>
            <div className="w-full px-4 py-3 flex-row flex hover:bg-[#16181c] cursor-pointer" onClick={handleBlock}>
                <div className="pr-3 flex justify-center items-center ">
                    <Ban className="h-5 w-5 text-primary"  />
                </div>
                <div className="flex flex-col">
                    <span className="text-primary text-[15px] font-bold">Block @{conversationUsername}</span>
                    <span className="text-gray text-sm">Blocking will prevent this person from sending you message requests in the future.</span>
                </div>
            </div>
        </>
    )
}
function MessagesRequests() {
    const navigate = useNavigate()
    const [selectedUser, SetSelectedUser] = useState<MessageUser>({
        imageUrl: "",
        username: "",
        name: "",
        isVerified: false,
        lastMessage: "",
        lastMessageTime: "3h"
    });
    const handleSettingClick = () => {
        navigate('/Messages/settings');
    }

    return (
        <>
            <div className="px-4 w-full h-[53px] flex flex-row justify-between  sticky  top-[-1px] bg-black bg-opacity-60 backdrop-blur-xl z-50 items-center" onClick={handleSettingClick}>
                <OptionsHeader header={"Message requests"} />
                <div className="flex justify-end items-center min-w-[56px] min-h-[32px]">
                    <div className='w-10 h-10 flex justify-center items-center cursor-pointer'>
                        <Settings className=' w-5 h-5' />
                    </div>
                </div>

            </div>
            <MessagesList mode="request" users={userArray} selectedUser={selectedUser} setSelectedUser={SetSelectedUser} />
        </>
    )
}