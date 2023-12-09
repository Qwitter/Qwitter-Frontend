import { Trash2, ForwardIcon, Copy } from "lucide-react";
import { useContext, useState } from "react";
import { MessagesContext } from "@/contexts/MessagesContextProvider";
import { ConversationRemoveMessagePopUp } from "./ConversationRemoveMessagePopUp";

export function MessagesConversationPopUp({ text, setIsOpen, replyId,userNameOFReplyMessage ,messageId}: {messageId:string; userNameOFReplyMessage:string;replyId: string; text: string; setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; }) {
    const handleCopyText = () => {
        navigator.clipboard.writeText(text);
        setIsOpen(false);
    };
    const { setMessageReply } = useContext(MessagesContext);
    const [show, setShow] = useState<boolean>(false);

    const handleSetReply = () => {
        setMessageReply({ message: text, replyId: replyId,userName:userNameOFReplyMessage });
        setIsOpen(false);
    };

    return (
        <>
            <div className="w-full px-4 py-3 flex-row flex hover:bg-[#16181c] cursor-pointer" onClick={handleSetReply}>
                <div className="pr-3 flex justify-center items-center ">
                    <ForwardIcon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-primary text-[15px] font-bold">Reply</span>

            </div>
            <div className="w-full px-4 py-3 flex-row flex hover:bg-[#16181c] cursor-pointer" onClick={handleCopyText}>
                <div className="pr-3 flex justify-center items-center ">
                    <Copy className="h-5 w-5 text-primary" />
                </div>
                <span className="text-primary text-[15px] font-bold">Copy message</span>
            </div>
            <div className="w-full px-4 py-3 flex-row flex hover:bg-[#16181c] cursor-pointer">
                <div className="pr-3 flex justify-center items-center ">
                    <Trash2 className="h-5 w-5 text-primary" />
                </div>
                <span className="text-primary text-[15px] font-bold" onClick={()=>setShow(true)}>Delete for You</span>
            </div>
            <ConversationRemoveMessagePopUp show={show} setShow={setShow} messageId={messageId} />

        </>
    );
}
