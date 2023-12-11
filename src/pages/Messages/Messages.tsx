import { OptionsHeader } from "@/components";
import { Ban, Settings, Trash2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { MessageUser, MessagesConversationInfoProps, MessagesRequestPopUpProp } from "./types/MessagesTypes";
import { userArray, tempInfo } from "@/constants";
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { MessagesMain } from "./MessagesMain";
import { MessagesList } from "./MessagesList";
import { MessagesSettings } from "./MessagesSettings";
import { MessagesConversation } from "./Conversation/MessagesConversation";
import { MessagesSide } from "./MessagesSide";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { MessagesContext } from "@/contexts/MessagesContextProvider";
import { cn } from "@/lib";
import { ConversationLeavePopUp } from "./ConversationLeavePopUp";
export function Messages() {
    const location = useLocation();
    const previousLocation = location.state?.previousLocation;

    return (
        <>
            <div className="max-w-[600px]  max-h-[100vh] scrollbar-thin overflow-y-auto pb-16 relative flex flex-col z-0 flex-grow w-[72%] max-largeX:hidden  h-full">
                <Routes location={previousLocation || location} >
                    <Route path="/requests" element={<MessagesRequests />} />
                    <Route index path="/*" element={<MessagesMain />} />
                </Routes>
            </div>
            <div className="max-w-[600px] w-full h-full flex-grow border-x border-primary border-opacity-30 ">
                <Routes location={previousLocation || location} >
                    <Route path="/settings" element={<MessagesSettings />} />
                    <Route index path="/compose" element={<MessagesSide p={"Choose from your existing conversations, start a new one, or just keep swimming."} showButton />} />
                    <Route path="/:conversationId" element={<MessagesConversation />} />
                    <Route path="/:conversationId/info" element={<MessagesConversationInfo {...tempInfo[0]} type={tempInfo[0].mode} />} />
                    <Route index path="/" element={<MessagesSide p={"Choose from your existing conversations, start a new one, or just keep swimming."} showButton />} />
                    <Route path="/requests" element={<MessagesSide showButton={false} p={"Message requests from people you don't follow live here. To reply to their messages, you need to accept the request"} />} />
                </Routes>

            </div>

        </>
    );
}
export function MessagesConversationInfo({ type = "direct", imageUrl, users, groupName, id }: MessagesConversationInfoProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const { saveGroup } = useContext(MessagesContext);
    const [show, setShow] = useState(false);
    const handleBlock = () => {

    }
    useEffect(() => {
        return saveGroup({ groupName: groupName!, groupImg: imageUrl });
    }, []);
    return (
        <div className=" w-full h-full border-r border-primary border-opacity-30 mb-20">
            <OptionsHeader header={type == "direct" ? 'Conversation info' : "Group info"} />
            {type == "group" && <>
                <div className="px-4 py-3 flex flex-row items-center">
                    <Avatar className="mr-4">
                        <AvatarImage className="w-10 h-10 rounded-full border-primary border-[2px] border-solid border-opacity-30" src={imageUrl} />
                    </Avatar>
                    <div className="flex flex-row justify-between w-full">
                        <span className="text-primary text-[15px] font-bold">{groupName}</span>
                        <Link className="text-secondary text-[15px] hover:underline" to={`/messages/${id}/group-info`} state={{ previousLocation: location }}>Edit</Link>
                    </div>
                </div>
                <div className="px-4 py-3 w-full border-t border-primary border-opacity-30">
                    <h2 className="text-primary text-xl font-bold text-start ">People</h2>

                </div>
            </>}
            <div className="max-h-[40vh] overflow-y-auto">
                <MessagesList mode="People" users={users} />

            </div>
            <div className={cn('block text-center cursor-pointer transition-all text-secondary hover:bg-[#031019] p-4 pb-5  border-primary border-opacity-30', type == "direct" ? 'border-t' : 'border-b')}
                onClick={type == "direct" ? handleBlock :
                    () => { navigate("/Messages/" + id + "/add", { state: { previousLocation: location } }); }}
            >
                {type == "direct" ? `Block @${users[0].userName}` : 'Add People'}</div>
            <div className='block text-center cursor-pointer transition-all text-danger  hover:bg-danger hover:bg-opacity-10 p-4'
                onClick={() => { setShow(true) }}
            >
                Leave Conversation</div>
            <ConversationLeavePopUp show={show} setShow={setShow} leaveFunction={() => { }} />

        </div>
    )
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
        userPhoto: "",
        userName: "",
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
            <div className="px-4 w-full h-[53px] flex flex-row justify-between  sticky  top-0 bg-black bg-opacity-60 backdrop-blur-xl z-50 items-center" onClick={handleSettingClick}>
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