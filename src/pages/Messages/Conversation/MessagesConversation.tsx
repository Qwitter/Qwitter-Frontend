import { ArrowDown, Info, MoveLeft, X } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useInView } from "react-intersection-observer";
import { MessagesConversationInput } from "./MessagesConversationInput";
import { MessagesConversationMessage } from "./MessagesConversationMessage";
import { MessagesContext } from "@/contexts/MessagesContextProvider";
import { InfiniteData, useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateMessage, cn } from "@/lib/utils";
import { EVENTS, MessagesMessage, conversation } from "../types/MessagesTypes";
import { getConversation } from "@/lib/utils";
import { Spinner } from "@/components/Spinner";
import { socket } from "@/lib/socketInit";
import { MessagesConversationUserInfo } from "./MessagesConversationUserInfo";
export function MessagesConversation() {
    const [text, setText] = useState("")

    const [chatMessages, setChatMessages] = useState<MessagesMessage[]>([]);
    const [selectedImageFile, setSelectedImageFile] = useState<File>();

    const [shouldScroll, setShouldScroll] = useState(true);
    const [isFirstPage, setIsFirstPage] = useState(true);

    const [scroll, setScroll] = useState(0)

    const token = localStorage.getItem("token")!;
    const { messageReply, setMessageReply, setCurrentConversation } = useContext(MessagesContext)
    const { conversationId } = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { ref, inView } = useInView();
    const { ref: refLastMessage, inView: lastMessageInView } = useInView();
    const { ref: refFirstMessage, inView: firstMessageInView } = useInView();
    const messageContainerRef = useRef<HTMLDivElement>(null);
    const conversationContainerRef = useRef<HTMLDivElement>(null);

    const handlePaging = ({ pageParam }: { pageParam: number }): Promise<conversation> => {
        if (pageParam == 1)
            setIsFirstPage(true)
        else
            setShouldScroll(false)

        return getConversation({ token: token, conversationId: conversationId!, limit: 10, pageParam: pageParam })
    }
    const handlePagingMessages = (data: InfiniteData<conversation, unknown>) => {
        return ([] as MessagesMessage[]).concat(...data.pages.map(page => page.messages));
    }
    const handleScrollDown = () => {
        messageContainerRef.current && messageContainerRef.current.scrollTo(0, messageContainerRef.current.scrollHeight);
    }

    const handleScrollWithValue = (value: number) => {
        messageContainerRef.current && messageContainerRef.current.scrollTo(0, value);
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
    const {
        isPending,
        data,
        fetchNextPage,
        hasNextPage
    } = useInfiniteQuery({
        queryKey: ["userConversation", conversationId],
        initialPageParam: 1,
        getNextPageParam: (data, allPages) => {
            return data.messages.length == 10 ? allPages.length + 1 : undefined
        },
        queryFn: handlePaging,

    }
    );

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

                queryClient.setQueryData(['userConversation', conversationId], (oldConversation: InfiniteData<conversation, unknown>) => {

                    oldConversation.pages[0].messages = [data, ...oldConversation.pages[0].messages]
                    setChatMessages([...handlePagingMessages(oldConversation)])
                    setTimeout(() => {

                        handleScrollDown()
                    }, 0);
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
            queryClient.setQueryData(['userConversation', conversationId], (oldConversation: InfiniteData<conversation, unknown>) => {

                oldConversation.pages[0].messages = [Message, ...oldConversation.pages[0].messages]
                setChatMessages([...handlePagingMessages(oldConversation)])
                setTimeout(() => {

                    handleScrollDown()
                }, 0);
                return oldConversation;
            })
            handleScrollDown()


        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setTimeout(() => {
            !shouldScroll && handleScrollWithValue(messageContainerRef.current!.scrollHeight - scroll - messageContainerRef.current!.scrollTop);
            shouldScroll && handleScrollDown()
        }, 0);

        if (data) {
            setChatMessages(handlePagingMessages(data))
            isFirstPage && setCurrentConversation(data.pages[0])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    useEffect(() => {
        if (firstMessageInView && hasNextPage && data) {
            setScroll(messageContainerRef.current!.scrollHeight)
            fetchNextPage()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [firstMessageInView])



    if (isPending) {
        return (
            <div className="w-full h-[500px] p-8">
                <Spinner />
            </div>
        );
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
                {!inView && <img src={data.pages[0].photo || "https://i.ibb.co/S7XN04r/01eab91ff04ea5832a33040f7ebdb3d0.jpg"} className="w-8 h-8 rounded-full mr-2" />}
                <div className="w-full h-full flex  items-center">
                    <h2 className="font-bold text-[17px]">{data.pages[0].name}</h2>
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

                <div className="  overflow-y-auto" ref={messageContainerRef} >
                    {!(data.pages[0].isGroup) && !hasNextPage && <div className=" w-full px-4 " onClick={() => navigate('/' + data?.pages[0].users[0].userName)} > {/* change with real username */}
                        <MessagesConversationUserInfo chatPicture={data.pages[0].photo || "https://i.ibb.co/S7XN04r/01eab91ff04ea5832a33040f7ebdb3d0.jpg"} userName={data?.pages[0].users[0].userName || ""} name={data?.pages[0].users[0].name || ""} ref={ref} />
                    </div>}
                    {hasNextPage && <div className="py-10">
                        <div ref={refFirstMessage}></div>
                        <Spinner />
                    </div>}
                    <div ref={conversationContainerRef} className={cn('flex-shrink px-4 h-[calc(63vh-70px)]', data && (data.pages[0].isGroup || hasNextPage) && ' h-[85vh]')}>
                        {chatMessages && chatMessages.slice().reverse().map((message, index) => (<>
                            {index == chatMessages.length - 1 && <div key={"refLastMessage"} ref={refLastMessage} className="w-full h-1"></div>}

                            <MessagesConversationMessage key={index} {...message} isGroup={data.pages[0].isGroup} />
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
