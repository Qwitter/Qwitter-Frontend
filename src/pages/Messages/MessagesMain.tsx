import { User, MailPlus, Mail } from "lucide-react";
import { useState } from "react";
import { MessageUser } from "./types/MessagesTypes";
import { pinnedConversations, searchHeaderOptions, tempMessagesSearch, userArray } from "@/constants";
import { useNavigate } from "react-router-dom";
import { MessagesList } from "./MessagesList";
import { MessagesSearch } from "./MessagesSearch";
import { MessagesHeader } from "./MessagesHeader";
import { MessagesSide } from "./MessagesSide";
import { ConversationLeavePopUp } from "./ConversationLeavePopUp";

type MessagesMainProps = {
    showMessagesHeader?: boolean;
}

export function MessagesMain({ showMessagesHeader = true }: MessagesMainProps) {
    const [messagesSearchText, setMessagesSearchText] = useState("");
    const [showSearch, setShowSearch] = useState(false)


    const handleInputFocus = () => {
        setShowSearch(true)
    }
    const messagesRequests = 2;
    const newMessageRequest = true;
    return (
        <>
            {
                showMessagesHeader && (<>
                    <MessagesHeader settingsIcon={true}  />
                    <MessagesSearch setShowSearch={setShowSearch} showSearch={showSearch} handleInputFocus={handleInputFocus} text={messagesSearchText} setText={setMessagesSearchText} />
                </>
                )}
            {
                showSearch ? <SearchResults text={messagesSearchText} /> : <Main messagesRequests={messagesRequests} newMessageRequest={newMessageRequest} />
            }

        </>
    );
}
function SearchResults({ text }: { text: string }) {
    const [active, setActive] = useState("ALL");

    return (<>
        {text.length === 0 ?
            <div className="mt-7 flex w-full justify-center">
                <span className="text-gray text-[15px]">Try searching for people, groups, or messages</span>
            </div> : <div>
                <SearchResultsHeader active={active} setActive={setActive} />

                <SearchMessagesResults active={active} text={text} />

            </div>
        }
    </>
    )
}

function SearchResultsHeader({ active, setActive }: { active: string; setActive: React.Dispatch<React.SetStateAction<string>>; }) {
    return (
        <ul className="flex flex-row min-h-[50px] w-full   z-50 border-b border-primary border-opacity-30">
            {searchHeaderOptions.map((option, index) => (
                <li key={index} className="w-full  flex justify-center items-center  px-4 py-0 min-w-[56px] hover:bg-[#181818] transition-all cursor-pointer" onClick={() => setActive(option)}>
                    <span className={`${active == option ? 'text-primary border-b-4 font-bold py-3 border-solid border-secondary ' : 'text-gray'} text-base  `}>
                        {option}
                    </span>
                </li>
            ))
            }
        </ul>
    )
}
function SearchMessagesResults({ active, text }: { active: string; text: string; }) {

    if (active == "ALL") {
        if (tempMessagesSearch.users.length + tempMessagesSearch.conversations.length == 0) {
            return (
                <>
                    <SearchNoResult text={text} />
                </>
            )
        }
        return (
            <div>
                {tempMessagesSearch.users.length > 0 && <><div className="pl-4 flex flex-row items-center border-b border-primary border-opacity-30">
                    <div className='w-10 h-10 flex justify-start items-center '>
                        <User fill="white" className=' w-5 h-5' />
                    </div>
                    <div className="w-full h-full flex  items-center">
                        <h2 className="font-bold text-xl">People</h2>
                    </div>
                </div>
                    <MessagesList mode="People" matchedPart={text} users={tempMessagesSearch.users} /></>}
                {tempMessagesSearch.conversations.length > 0 && <><div className="pl-4 flex flex-row items-center border-b border-primary border-opacity-30">
                    <div className='w-10 h-10 flex justify-start items-center '>
                        <Mail fill="white" className='text-black w-6 h-6' />
                    </div>
                    <div className="w-full h-full flex  items-center">
                        <h2 className="font-bold text-xl">Messages</h2>
                    </div>
                </div>
                    <MessagesList mode="conversations" matchedPart={text} users={tempMessagesSearch.conversations} /></>}
            </div>
        )
    }
    if (active == "People") {
        return (<>
            <MessagesList mode="People" matchedPart={text} users={tempMessagesSearch.conversations} />
            </>
        )
    }
    if (active == "Messages") {
        return (<>
            <MessagesList mode="conversations" matchedPart={text} users={tempMessagesSearch.conversations} />
            </>
        )
    }
    return (
        <SearchNoResult text={text} />
    )
}

function SearchNoResult({ text }: { text: string; }) {
    return (
        <div className="my-7 w-full">
            <MessagesSide p="The term you entered did not bring up any results" h2={`No results for "${text}"`} button="Start new messages" showButton />
        </div>

    )
}
function Main({ messagesRequests, newMessageRequest }: { newMessageRequest: boolean; messagesRequests: number; }) {
    const navigate = useNavigate();
    const [selectedUser, SetSelectedUser] = useState<MessageUser>({
        userPhoto: "",
        userName: "",
        name: "",
        isVerified: false,
        lastMessage: "",
        lastMessageTime: "3h"
    });

    const handleRequestClick = () => {
        navigate('/Messages/requests');
    };
    const [show, setShow] = useState<boolean>(false);
    return (
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
                showDeletePopUp={()=>setShow(true)}
                setSelectedUser={SetSelectedUser} />
            <ConversationLeavePopUp show={show} setShow={setShow} leaveFunction={()=>{}}/>
        </div>
    )
}