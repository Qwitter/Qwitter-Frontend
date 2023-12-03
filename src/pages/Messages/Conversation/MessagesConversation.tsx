import { Info, X } from "lucide-react";
import { forwardRef, useContext, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom'
import { chat } from "@/constants";
import { useInView } from "react-intersection-observer";
import { MessagesConversationInput } from "./MessagesConversationInput";
import { MessagesConversationMessage } from "./MessagesConversationMessage";
import { MessagesContext } from "@/contexts/MessagesContextProvider";

const MessagesConversationUserInfo = forwardRef<HTMLDivElement>((_, ref) => (
    <div ref={ref}
        className="cursor-pointer mb-4 px-4 pb-16 py-5 flex flex-col rounded-sm bg-black hover:bg-[#16181c] transition-all  justify-start items-center border-b border-primary border-opacity-30">
        <img src="https://github.com/shadcn.png" alt="" className="w-16 h-16 rounded-full" />
        <div className="flex flex-col mb-1">
            <span className="text-primary text-center text-[15px] font-semibold">Marwan</span>
            <span className="text-gray text-[15px] ">@Marwan23548</span>
        </div>
        <span className="text-gray text-sm"> Joined at November 2023</span>

    </div>

));
export function MessagesConversation() {
    const [text, setText] = useState("")
    const { ref, inView } = useInView();
    const {conversationId} = useParams()
    const navigate = useNavigate()
    const {messageReply,setMessageReply} = useContext(MessagesContext) 

    return (
        <div className="h-full">
            <div className="px-4 w-full h-[53px] basis-4 flex flex-row justify-center  sticky  top-[-1px] bg-black bg-opacity-60 backdrop-blur-xl z-50 items-center">
                {!inView && <img src="https://github.com/shadcn.png" className="w-8 h-8 rounded-full mr-2" />}
                <div className="w-full h-full flex  items-center">
                    <h2 className="font-bold text-[17px]">Marwan samy</h2>
                </div>
                <div className="flex justify-end items-center min-w-[56px] min-h-[32px]">
                    <div className='w-10 h-10 flex justify-end items-center '>
                        <Link to={`/messages/${conversationId}/info`}>
                            <Info className=' w-5 h-5 cursor' />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="w-full mx-auto flex flex-col max-h-[calc(100vh-55px)] ">
                <div className="  overflow-y-auto">
                    <div className=" w-full px-4 " onClick={()=>navigate('/Marwansamy')} > {/* change with real username */}
                        <MessagesConversationUserInfo ref={ref} />
                    </div>
                    <div className='flex-shrink px-4'>
                        { chat.map((message)=>(
                            <MessagesConversationMessage {...message} />
                        ))
                    }
                    </div>
                </div>
                <div className="flex-grow  border-t  border-primary border-opacity-30 px-2    flex-shrink-0">
                    {messageReply&&<div className="border-l-4 items-center   py-2 px-3 w-full bg-[#16181c] flex flex-row justify-between border-primary border-opacity-90">
                        <div className="flex flex-col max-h-[28vh] max-w-[95%] overflow-hidden  ">
                            <span className="text-primary text-[13px]">{messageReply?.userName}</span>
                            <span className="text-primary text-[13px]">{messageReply?.message}</span>
                        </div>
                        <X className="h-5 w-5 text-gray cursor-pointer" onClick={()=>setMessageReply(null)} /> 

                    </div>}
                <MessagesConversationInput text={text} setText={setText} />
                </div>
            </div>
        </div>
    )
}

