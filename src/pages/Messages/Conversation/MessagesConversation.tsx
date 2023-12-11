import { ArrowDown, Info, MoveLeft, X } from "lucide-react";
import { HTMLProps, Ref, forwardRef, useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useInView } from "react-intersection-observer";
import { MessagesConversationInput } from "./MessagesConversationInput";
import { MessagesConversationMessage } from "./MessagesConversationMessage";
import { MessagesContext } from "@/contexts/MessagesContextProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateMessage, cn } from "@/lib/utils";
import { EVENTS,  MessagesMessage, conversation } from "../types/MessagesTypes";
import { useQuery } from "@tanstack/react-query";
import { getConversation } from "@/lib/utils";
import { Spinner } from "@/components/Spinner";
import { socket } from "@/lib/socketInit";
export function MessagesConversation() {
    const [text, setText] = useState("")
    const [chatMessages,setChatMessages] = useState<MessagesMessage[]>([]);
    const [selectedImageFile, setSelectedImageFile] = useState<File>();
    const token = localStorage.getItem("token")!;
    const { messageReply, setMessageReply, setCurrentConversation } = useContext(MessagesContext)

    const { ref, inView } = useInView();
    const { ref: refLastMessage, inView: lastMessageInView } = useInView();
    const { conversationId } = useParams()
    const navigate = useNavigate()

    const queryClient = useQueryClient()

    const messageContainerRef = useRef<HTMLDivElement>(null);



    const {
        isPending,
        data,
    } = useQuery<conversation>({
        queryKey: ["userConversation", conversationId],
        queryFn: () => getConversation({ token: token, conversationId: conversationId! })

    });
    useEffect(()=>{
        setTimeout(() => {
            handleScrollDown()
            console.log(data)
        }, 0);
        data&&setChatMessages(data.messages)
    },[data])

    useEffect(() => {
        messageContainerRef.current && messageContainerRef.current.scrollTo(0, messageContainerRef.current.scrollHeight);
        data && data.messages && setCurrentConversation(data)

    }, [data, messageContainerRef, setCurrentConversation]);

    const handleScrollDown = () => {
        messageContainerRef.current && messageContainerRef.current!.scrollTo(0, messageContainerRef.current!.scrollHeight);
    }

    const { mutate, isPending: isSending } = useMutation({
        mutationFn: CreateMessage,
        onSuccess: async (data) => {
            if (data) {
                socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, {
                    conversationId,
                    data,
                });

                await queryClient.cancelQueries({ queryKey: ['userConversation', conversationId] })
                const previousMessages = queryClient.getQueryData(['userConversation', conversationId]);

                queryClient.setQueryData(['userConversation', conversationId], (oldConversation: conversation) => {
                    oldConversation.messages = [data, ...oldConversation.messages]
                    setChatMessages([...oldConversation.messages])
                    setTimeout(() => {
                        
                        handleScrollDown()
                    }, 0);
                    setCurrentConversation(oldConversation)
                    return oldConversation;
                })
                handleScrollDown()

                return { previousMessages }

            }

        },
        onError: (data) => {
            console.log(data);

        }
    })
    useEffect(() => {
        socket.emit('JOIN_ROOM', conversationId);

        socket.on(EVENTS.SERVER.ROOM_MESSAGE, async (Message) => {
            queryClient.setQueryData(['userConversation', conversationId], (oldConversation: conversation) => {
                oldConversation.messages = [Message, ...oldConversation.messages]
                setChatMessages([...oldConversation.messages])
                setTimeout(() => {
                        
                    handleScrollDown()
                }, 0);
                setCurrentConversation(oldConversation)
                return oldConversation;
            })
            handleScrollDown()


        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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


    return (
        data && <div className="h-full">
            <div className="px-4 w-full h-[53px] basis-4 flex flex-row justify-center  sticky  top-[-1px] bg-black bg-opacity-60 backdrop-blur-xl z-50 items-center">
                <div className="hover:bg-[#191919] h-10 flex mr-2 lg:hidden rounded-full transition-all p-2 cursor-pointer"
                    data-testid="Back"
                    onClick={() => {
                        navigate(-1)
                    }}>
                    <MoveLeft className='max-w-[50px] ' />
                </div>
                {!inView && <img src={data?.photo || "https://i.ibb.co/S7XN04r/01eab91ff04ea5832a33040f7ebdb3d0.jpg"} className="w-8 h-8 rounded-full mr-2" />}
                <div className="w-full h-full flex  items-center">
                    <h2 className="font-bold text-[17px]">{data.name}</h2>
                </div>
                <div className="flex justify-end items-center min-w-[56px] min-h-[32px]">
                    <div className='w-10 h-10 flex justify-end items-center '>
                        <Link to={`/messages/${conversationId}/info`}>
                            <Info className=' w-5 h-5 cursor' />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="w-full relative mx-auto flex flex-col max-h-[calc(100vh-55px)] ">
                <div className="  overflow-y-auto" ref={messageContainerRef}>
                    {data && (!data.isGroup) && <div className=" w-full px-4 " onClick={() => navigate('/' + data?.users[0].userName)} > {/* change with real username */}
                        <MessagesConversationUserInfo chatPicture={data?.photo || "https://i.ibb.co/S7XN04r/01eab91ff04ea5832a33040f7ebdb3d0.jpg"} userName={data?.users[0].userName || ""} name={data?.users[0].name || ""} ref={ref} />
                    </div>}
                    <div className={cn('flex-shrink px-4 h-[calc(63vh-70px)]', data && data.isGroup && ' h-[85vh]')}>
                        {chatMessages && chatMessages.slice().reverse().map((message, index) => (<>
                            {index == chatMessages.length - 1 && <div ref={refLastMessage} className="w-full h-1"></div>}

                            <MessagesConversationMessage key={index} {...message} isGroup={data.isGroup} />
                        </>
                        ))
                        }
                    </div>
                    {!lastMessageInView && <div onClick={handleScrollDown} className=" absolute py-2 px-3 cursor-pointer rounded-2xl bottom-20 right-12 box-shadow backdrop-blur-sm bg-black bg-opacity-90 flex items-center justify-center">
                        <ArrowDown className="text-secondary w-6 h-6" />
                    </div>}
                </div>
                <div className="flex-grow  border-t relative  border-primary border-opacity-30 px-2    flex-shrink-0">
                    {messageReply && <div className="border-l-4 items-center   py-2 px-3 w-full bg-[#16181c] flex flex-row justify-between border-primary border-opacity-90">
                        <div className="flex flex-col max-h-[28vh] max-w-[95%] overflow-hidden  ">
                            <span className="text-primary text-[13px]">{messageReply?.userName}</span>
                            <span className="text-primary text-[13px]">{messageReply?.message}</span>
                        </div>
                        <div className="flex flex-row items-center max-h-[50px] justify-center ">
                            <div className=" flex justify-center items-center w-14 h-11 mr-2">
                                <img src={messageReply.image[0].value} alt="" />
                                {/* <TweetImagesViewer images={messageReply.image||[]} mode="view-only" screen="message" /> */}
                            </div>
                        <X className="h-5 w-5 text-gray cursor-pointer" onClick={() => setMessageReply(null)} />
                        </div>
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