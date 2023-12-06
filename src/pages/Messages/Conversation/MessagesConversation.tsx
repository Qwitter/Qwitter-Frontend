import { Info, X } from "lucide-react";
import { HTMLProps, Ref, forwardRef, useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useInView } from "react-intersection-observer";
import { MessagesConversationInput } from "./MessagesConversationInput";
import { MessagesConversationMessage } from "./MessagesConversationMessage";
import { MessagesContext } from "@/contexts/MessagesContextProvider";
import { useMutation } from "@tanstack/react-query";
import { CreateMessage } from "@/lib/utils";
import { io } from 'socket.io-client'
import { EVENTS,  conversation,  conversationWithUserUser } from "../types/MessagesTypes";
import { useQuery } from "@tanstack/react-query";
import { getConversation } from "@/lib/utils";
import { UserContext } from "@/contexts/UserContextProvider";
import { Spinner } from "@/components/Spinner";

export function MessagesConversation() {
    const [text, setText] = useState("")
    const { ref, inView } = useInView();
    const { conversationId } = useParams()
    const navigate = useNavigate()
    const { token } = useContext(UserContext);
    const [selectedImageFile, setSelectedImageFile] = useState<File>();

    const { messageReply, setMessageReply } = useContext(MessagesContext)
    // const SOCKET_URL:string = process.env.VITE_BACKEND_URL as string ;
    const SOCKET_URL = "http://qwitterback.cloudns.org:3000";
    const {
        isPending,
        data,
        refetch
    } = useQuery<conversation>({
        queryKey: ["userConversation", token, conversationId],
        queryFn: () => getConversation({ token: token!, conversationId: conversationId! })
        ,refetchOnReconnect:"always",
        refetchIntervalInBackground:true,
        refetchInterval: 500,
        
    });
    const { mutate, isPending: isSending } = useMutation({
        mutationFn: CreateMessage,
        onSuccess: (data) => {
            if (data) {
                console.log(data)
            }

        },
        onError: (data) => {
            console.log(data);

        }
    })
    useEffect(() => {
        console.log(data)
        refetch();
    }, [data, refetch]);
    useEffect(() => {
        const socket = io(SOCKET_URL);
        socket.emit('JOIN_ROOM', conversationId);
        console.log(SOCKET_URL)
        socket.on(EVENTS.SERVER.ROOM_MESSAGE, (Message) => {
            console.log(Message)
        });
    }, [])
    if (isPending) {
        return (
            <div className="w-full h-[500px] p-8">
                <Spinner />
            </div>
        );
    }
    const handleSubmit = () => {
        if (!isSending) {
            const formData = new FormData();
            formData.append("text", text);
            formData.append("replyId", messageReply?.replyId || "");
            formData.append("media", selectedImageFile || "");
            mutate({ token: token!, formData: formData, conversationId: conversationId! })
            setText("");
            setSelectedImageFile(undefined);
            setMessageReply(null)
        }
    }
    const handleNameOfChat = (users: conversationWithUserUser[]): string => {

        if (users.length === 0) {
            return '';
        }
        console.log(users)
        // Exclude the last user and concatenate names
        const concatenatedNames = users!.slice(0, -1).map((user) => user.name).join(', ');

        // Return the result
        return concatenatedNames;
    };
    return (
        <div className="h-full">
            <div className="px-4 w-full h-[53px] basis-4 flex flex-row justify-center  sticky  top-[-1px] bg-black bg-opacity-60 backdrop-blur-xl z-50 items-center">
                {!inView && <img src={data?.photo || "https://i.ibb.co/S7XN04r/01eab91ff04ea5832a33040f7ebdb3d0.jpg"} className="w-8 h-8 rounded-full mr-2" />}
                <div className="w-full h-full flex  items-center">
                    <h2 className="font-bold text-[17px]">{handleNameOfChat(data?.users || [])}</h2>
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
                    <div className=" w-full px-4 " onClick={data && (data.type == "direct") ? () => navigate('/' + data?.users[0]) : () => { }} > {/* change with real username */}
                        <MessagesConversationUserInfo chatPicture={data?.photo || "https://i.ibb.co/S7XN04r/01eab91ff04ea5832a33040f7ebdb3d0.jpg"} userName={data?.users[0].userName || ""} name={handleNameOfChat(data?.users || [])} ref={ref} />
                    </div>
                    <div className='flex-shrink px-4 h-[calc(63vh-70px)]'>
                        {data && data.messages.map((message) => (
                            <MessagesConversationMessage {...message} />
                        ))
                        }
                    </div>
                </div>
                <div className="flex-grow  border-t relative  border-primary border-opacity-30 px-2    flex-shrink-0">
                    {messageReply && <div className="border-l-4 items-center   py-2 px-3 w-full bg-[#16181c] flex flex-row justify-between border-primary border-opacity-90">
                        <div className="flex flex-col max-h-[28vh] max-w-[95%] overflow-hidden  ">
                            <span className="text-primary text-[13px]">{messageReply?.userName}</span>
                            <span className="text-primary text-[13px]">{messageReply?.message}</span>
                        </div>
                        <X className="h-5 w-5 text-gray cursor-pointer" onClick={() => setMessageReply(null)} />

                    </div>}
                    <MessagesConversationInput selectedImageFile={selectedImageFile} setSelectedImageFile={setSelectedImageFile} handleSubmit={handleSubmit} text={text} setText={setText} />
                </div>
            </div>
        </div>
    )
}
interface MessagesConversationUserInfoProps extends HTMLProps<HTMLDivElement> {
    userName: string;
    name: string;
    chatPicture: string;
}
const MessagesConversationUserInfo = forwardRef(
    ({ userName, name, chatPicture }: MessagesConversationUserInfoProps, ref: Ref<HTMLDivElement>) => (
        <div ref={ref}
            className="cursor-pointer mb-4 px-4 pb-16 py-5 flex flex-col rounded-sm bg-black hover:bg-[#16181c] transition-all  justify-start items-center border-b border-primary border-opacity-30">
            <img src={chatPicture} alt="" className="w-16 h-16 rounded-full" />
            <div className="flex  flex-col mb-1">
                <span className="text-primary text-center text-[15px] font-semibold">{name}</span>
                <span className="text-gray text-center text-[15px] ">@{userName}</span>
            </div>
            <span className="text-gray text-sm"> Joined at November 2023</span>

        </div>

    ));