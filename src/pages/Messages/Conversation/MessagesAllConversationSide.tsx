import { MailPlus } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { conversation } from "../../../models/MessagesTypes";
import { EVENTS } from '../../../models/Events';

import { useNavigate } from "react-router-dom";
import { MessagesList } from "../MessagesList";
import { ConversationLeavePopUp } from "../MessagesPopup/ConversationLeavePopUp";
import { UserContext } from "@/contexts/UserContextProvider";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserConversations } from "@/lib/utils";
import { Spinner } from "@/components/Spinner";
import { MessagesContext } from "@/contexts/MessagesContextProvider";
import { socket } from "@/lib/socketInit";

export function MessagesAllConversationSide({ messagesRequests = 0, newMessageRequest = false, setOpenConversation }: { setOpenConversation?: React.Dispatch<React.SetStateAction<string | undefined>>; newMessageRequest?: boolean; messagesRequests?: number; }) {
    const navigate = useNavigate();
    const { token } = useContext(UserContext);
    const { setUserAllConversation } = useContext(MessagesContext)
    const [conversationToDelete, setConversationToDelete] = useState("")
    const [show, setShow] = useState<boolean>(false);
    const queryClient = useQueryClient();

    const {
        isPending, data, refetch
    } = useQuery<conversation[]>({
        queryKey: ["getUserConversations"],
        queryFn: () => getUserConversations(token!),
    });
    useEffect(() => {
        setUserAllConversation(data!)
        refetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, data]);
    useEffect(() => {

        socket.on(EVENTS.SERVER.CONVERSATION, async (conversation: conversation) => {
            queryClient.setQueryData(['getUserConversations'], (old: conversation[]) => {
                const updated = old.filter(conv => conv.id != conversation.id);
                updated.unshift(conversation);
                return updated;
            })
            //queryClient.invalidateQueries({ queryKey: ["getUserConversations"] });

        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleRequestClick = () => {
        navigate('/Messages/requests');
    };
    const deleteConversation = (conversationId: string) => {
        setConversationToDelete(conversationId)
        setShow(true)
    }
    if (isPending) {
        return (
            <div className="w-full h-[280px] p-8">
                <Spinner />
            </div>
        );
    }

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
            {/*/*pinnedConversations[].length > 0 && (<>
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
            )*/}

            {isPending || !data ? <div className="w-full h-[280px] p-8">
                <Spinner />
            </div> : <MessagesList conversations={data}
                mode={"normal"}
                setOpenConversation={setOpenConversation}
                showDeletePopUp={deleteConversation}
            />}
            <ConversationLeavePopUp show={show} setShow={setShow} conversationToDelete={conversationToDelete} />
        </div>
    );
}
