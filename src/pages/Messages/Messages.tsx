import { OptionsHeader } from "@/components";
import { Ban, Settings, Trash2 } from "lucide-react";
import {  useState } from "react";
import { MessageUser, MessagesRequestPopUpProp } from "../../models/MessagesTypes";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { MessagesMain } from "./MessagesMain";
import { MessagesList } from "./MessagesList";
import { MessagesSettings } from "./MessagesSettings";
import { MessagesConversation } from "./Conversation/MessagesConversation";
import { MessagesSide } from "./MessagesSide";
import { MessagesConversationInfo } from "./Conversation/MessagesConversationInfo";
export function Messages() {
    const location = useLocation();
    const previousLocation = location.state?.previousLocation;
    const pathname = location.pathname.endsWith('/')?location.pathname.slice(0,-1):location.pathname
    return (
        <>
            <div className={`max-w-[600px]  max-h-[100vh] scrollbar-thin overflow-y-auto ${pathname!="/Messages"?'max-largeX:hidden':''}  pb-16 relative flex flex-col z-0 flex-grow w-[72%]   h-full`}>
                <Routes location={previousLocation || location} >
                    <Route path="/requests" element={<MessagesRequests />} />
                    <Route index path="/*" element={<MessagesMain />} />
                </Routes>
            </div>
            <div className={`max-w-[600px] w-full ${pathname=="/Messages"?'max-largeX:hidden':''}  h-full flex-grow border-x border-primary border-opacity-30 `}>
                <Routes location={previousLocation || location} >
                    <Route path="/settings" element={<MessagesSettings />} />
                    <Route index path="/compose" element={<MessagesSide p={"Choose from your existing conversations, start a new one, or just keep swimming."} showButton />} />
                    <Route path="/:conversationId" element={<MessagesConversation />} />
                    <Route path="/:conversationId/info" element={<MessagesConversationInfo />} />
                    <Route index path="/" element={<MessagesSide p={"Choose from your existing conversations, start a new one, or just keep swimming."} showButton />} />
                    <Route path="/requests" element={<MessagesSide showButton={false} p={"Message requests from people you don't follow live here. To reply to their messages, you need to accept the request"} />} />
                </Routes>

            </div>

        </>
    );
}
export function MessagesRequestPopUp({ conversationUsername, handleBlock, handleRemoveConversation }: MessagesRequestPopUpProp) {
    return (
        <>
            <div className="w-full px-4 py-3 flex-row flex hover:bg-[#16181c] cursor-pointer" onClick={handleRemoveConversation}>
                <div className="pr-3 flex justify-center items-center ">
                    <Trash2 className="h-5 w-5 text-danger" />
                </div>
                <div className="flex flex-col">
                    <span className="text-danger text-[15px] font-bold">Delete conversation</span>
                    <span className="text-gray text-sm">This conversation will be deleted from your inbox. Other people in the conversation will still be able to see it.</span>
                </div>
            </div>
            <div className="w-full px-4 py-3 flex-row flex hover:bg-[#16181c] cursor-pointer" onClick={handleBlock}>
                <div className="pr-3 flex justify-center items-center ">
                    <Ban className="h-5 w-5 text-primary" />
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
        profileImageUrl: "",
        userName: "",
        name: "",
        isVerified: false,
        followersCount:0,
        followingCount:0
    });
    const handleSettingClick = () => {
        navigate('/Messages/settings');
    }

    return (
        <>
            <div className="px-4 w-full h-[53px] flex flex-row justify-between  sticky  top-0 bg-black bg-opacity-60 backdrop-blur-xl z-50 items-center" onClick={handleSettingClick}>
                <OptionsHeader header={"Message requests"} />
                <div className="flex justify-end items-center min-w-[56px] min-h-[32px]">
                    <div className='w-10 h-10 flex justify-center items-center cursor-pointer'>
                        <Settings className=' w-5 h-5' />
                    </div>
                </div>

            </div>
            <MessagesList mode="request" users={[]} selectedUser={selectedUser} setSelectedUser={SetSelectedUser} />
        </>
    )
}