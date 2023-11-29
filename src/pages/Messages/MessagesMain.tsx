import { MailPlus } from "lucide-react";
import { useState } from "react";
import { MessageUser } from "./types/MessagesTypes";
import { pinnedConversations, userArray } from "@/constants";
import { useNavigate } from "react-router-dom";
import { MessagesSearch, MessagesList } from "./Messages";
import { MessagesHeader } from "./MessagesHeader";

type MessagesMainProps = {
    showMessagesHeader?: boolean;
}

export function MessagesMain({ showMessagesHeader = true }: MessagesMainProps) {
    const [messagesSearchText, setMessagesSearchText] = useState("");
    const navigate = useNavigate();

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
    };

    const handleRequestClick = () => {
        navigate('/Messages/requests');
    };
    const messagesRequests = 2;
    const newMessageRequest = true;
    return (
        <>
            {
                showMessagesHeader && (<>
                    <MessagesHeader handleSettingsClick={handleSettingClick} settingsIcon={true} />
                    <MessagesSearch text={messagesSearchText} setText={setMessagesSearchText} />
                </>
                )}
            <div>
                {messagesRequests > 0 &&
                    <div className="py-3 px-4 flex flex-row justify-between  hover:bg-[#16181c] w-full transition-all cursor-pointer" onClick={handleRequestClick}>
                        <div className=" flex flex-row">
                            <div className="mr-4 w-12 flex justify-center items-center h-12 bg-black rounded-full border border-primary border-opacity-30">
                                <MailPlus className="w-5 h-5" />
                            </div><div className="flex flex-col h-full">
                                <h3 className="text-primary text-[15px] font-semibold">Message requests</h3>
                                <span className="text-gray text-[13px]">{messagesRequests} requests</span>
                            </div>
                        </div>
                        {newMessageRequest && <div className="bg-secondary rounded-full w-[10px] h-[10px] mt-2"></div>}
                    </div>}
                {pinnedConversations.length > 0 && (<>
                    <div className="w-full py-3 pl-4">
                        <span className="text-primary text-xl font-bold">
                            Pinned conversations
                        </span>
                    </div>
                    <MessagesList users={pinnedConversations}
                        selectedUser={selectedUser}
                        mode="normal"
                        setSelectedUser={SetSelectedUser} />
                    <div className="w-full py-3 pl-4">
                        <span className="text-primary text-xl font-bold">
                            All conversations
                        </span>
                    </div>
                </>
                )}
                <MessagesList users={userArray}
                    mode={"normal"}
                    selectedUser={selectedUser}
                    setSelectedUser={SetSelectedUser} />
            </div></>
    );
}
