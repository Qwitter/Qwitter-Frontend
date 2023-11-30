import { Button, OptionsHeader } from "@/components";
import { Ban, Settings, Trash2 } from "lucide-react";
import { useState } from "react";
import { MessageUser, MessagesRequestPopUpProp, MessagesSideProp } from "./types/MessagesTypes";
import { AllowMessagesOptions, userArray } from "@/constants";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { MessagesMain } from "./MessagesMain";
import { MessagesList } from "./MessagesList";
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
export function MessagesRequestPopUp({conversationUsername,handleBlock,handleRemoveConversation}:MessagesRequestPopUpProp) {
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