import { Trash2, ForwardIcon, Copy } from "lucide-react";
import { useContext, useState } from "react";
import { MessagesContext } from "@/contexts/MessagesContextProvider";
import { ConversationRemoveMessagePopUp } from "./ConversationRemoveMessagePopUp";
import { MessagesMessage } from "../types/MessagesTypes";

export function MessagesConversationPopUp({ isUser,text,setChatMessages ,setIsOpen,image, replyId,userNameOFReplyMessage ,messageId}: {setChatMessages:React.Dispatch<React.SetStateAction<MessagesMessage[]>>;isUser:boolean;image:[{ value:string, type:string }] ;messageId:string; userNameOFReplyMessage:string;replyId: string; text: string; setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; }) {
    const handleCopyText = () => {
        navigator.clipboard.writeText(text);
        setIsOpen(false);
    };
    const { setMessageReply } = useContext(MessagesContext);
    const [show, setShow] = useState<boolean>(false);
    const handleHidePopUp = () => {
        setShow(false)
        setIsOpen(false);
    };
    const handleSetReply = () => {
        setMessageReply({ image:image,message: text, replyId: replyId,userName:userNameOFReplyMessage });
        setIsOpen(false);
    };

    return (
        <>
            <div data-testid="reply" className="w-full px-4 py-3 flex-row flex hover:bg-[#16181c] cursor-pointer" onClick={handleSetReply}>
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
            {isUser&& <div data-testid="delete" className="w-full px-4 py-3 flex-row flex hover:bg-[#16181c] cursor-pointer">
                <div className="pr-3 flex justify-center items-center ">
                    <Trash2 className="h-5 w-5 text-primary" />
                </div>
                <span className="text-primary text-[15px] font-bold" onClick={()=>setShow(true)}>Delete for All</span>
            </div>}
            <ConversationRemoveMessagePopUp setChatMessages={setChatMessages} show={show} setShow={handleHidePopUp} messageId={messageId} />

        </>
    );
}
