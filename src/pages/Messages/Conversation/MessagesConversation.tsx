import { ArrowDown, Info, MoveLeft, X } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { MessagesConversationInput } from "./MessagesConversationInput";
import { MessagesConversationMessage } from "./MessagesConversationMessage";
import { MessagesContext } from "@/contexts/MessagesContextProvider";
import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { CreateMessage, cn } from "@/lib/utils";
import { EVENTS, MessagesMessage, conversation } from "../../../models/MessagesTypes";
import { getConversation } from "@/lib/utils";
import { Spinner } from "@/components/Spinner";
import { socket } from "@/lib/socketInit";
import { MessagesConversationUserInfo } from "./MessagesConversationUserInfo";
import ImageGrid from "../ImageGrid";
import { v4 as uuidv4 } from 'uuid';
import { User } from "@/models/User";
export function MessagesConversation({conversationAccordionId}:{conversationAccordionId?:string}) {
  const [text, setText] = useState("");

  const [chatMessages, setChatMessages] = useState<MessagesMessage[]>([]);
  const [selectedImageFile, setSelectedImageFile] = useState<File>();

  const [shouldScroll, setShouldScroll] = useState(true);
  const [isFirstPage, setIsFirstPage] = useState(true);

  const [scroll, setScroll] = useState(0);

  const token = localStorage.getItem("token")!;
  const { VITE_DEFAULT_IMAGE } = import.meta.env;

  const user = JSON.parse(localStorage.getItem("user")!)as User;
  const { messageReply, setMessageReply, setCurrentConversation } =
    useContext(MessagesContext);
  const {conversationId:conversationUrlId} =useParams()
  const conversationId  = conversationAccordionId?conversationAccordionId:conversationUrlId;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { ref, inView } = useInView();
  const { ref: refLastMessage, inView: lastMessageInView } = useInView();
  const { ref: refFirstMessage, inView: firstMessageInView } = useInView();
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const conversationContainerRef = useRef<HTMLDivElement>(null);

  const handlePaging = ({
    pageParam,
  }: {
    pageParam: number;
  }): Promise<conversation> => {
    if (pageParam == 1) setIsFirstPage(true);
    else setShouldScroll(false);

    return getConversation({
      token: token,
      conversationId: conversationId!,
      limit: 10,
      pageParam: pageParam,
    });
  };
  const handlePagingMessages = (data: InfiniteData<conversation, unknown>) => {
    return ([] as MessagesMessage[]).concat(
      ...data.pages.map((page) => page.messages)
    );
  };
  const handleScrollDown = () => {
    messageContainerRef.current &&
      messageContainerRef.current.scrollTo(
        0,
        messageContainerRef.current.scrollHeight
      );
  };
  const updateChatMessages = (Message: MessagesMessage,updateMessage:boolean=false,logicalId?:string) => {
    queryClient.setQueryData(
      ["userConversation", conversationId],
      (oldConversation: InfiniteData<conversation, unknown>) => {
        if (updateMessage) {
          const index = oldConversation.pages[0].messages.findIndex(
            (message) => message.logicalId == logicalId
          )
          oldConversation.pages[0].messages[index] = Message;
        }
        else{
        oldConversation.pages[0].messages = [
          Message,
          ...oldConversation.pages[0].messages,
        ];
      }
        setChatMessages([...handlePagingMessages(oldConversation)]);
        setTimeout(() => {
          handleScrollDown();
        }, 0);
        return oldConversation;
      }
    );
    handleScrollDown();
  };

  const makeTempMessage = (formData:FormData,logicalId:string,error:boolean=false)=>{
    const replyToMessage = messageReply?chatMessages.find(
      (message) => message.id == messageReply.replyId 
      ):null;
      const text =formData.get("text")! as string;
      const media = formData.get("media") as File;
    const tempMessageSending = {
      isMessage: true,
      id: "",
      text: text,
      date: new Date().toString(),
      userName:user.userName,
      profileImageUrl:user.profileImageUrl,
      sending:!error,
      error:error,
      logicalId:logicalId,
      replyToMessage: replyToMessage?replyToMessage:null,
      entities: {
          hasthtags:[],
          media: media?[{ value: URL.createObjectURL(media) , type: media.type.startsWith('video')?"video":"photo", id: "123" }]:[],
          mentions: [],
      }
    }
    return tempMessageSending;
  }

  const handleScrollWithValue = (value: number) => {
    messageContainerRef.current &&
      messageContainerRef.current.scrollTo(0, value);
  };
  const handleSubmit = () => {
    if (!isSending) {
      const formData = new FormData();
      formData.append("text", text);
      formData.append("replyId", messageReply?.replyId || "");
      formData.append("media", selectedImageFile || "");

      mutate({
        token: token!,
        formData: formData,
        conversationId: conversationId!,
        logicalId: `${uuidv4()}`
      });
      setText("");
      setSelectedImageFile(undefined);
      setMessageReply(null);
    }
  };
  const { isPending, data, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["userConversation", conversationId],
      initialPageParam: 1,
      getNextPageParam: (data, allPages) => {
        return data.messages.length == 10 ? allPages.length + 1 : undefined;
      },
      queryFn: handlePaging,
    });

  const { mutate, isPending: isSending } = useMutation({
    mutationFn: CreateMessage,
    onSuccess: async (data,{logicalId}) => {
      if (data) {
        socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, {
          conversationId,
          data,
        });

        await queryClient.cancelQueries({
          queryKey: ["userConversation", conversationId],
        });
        const previousMessages = queryClient.getQueryData([
          "userConversation",
          conversationId,
        ]);
        updateChatMessages(data,true,logicalId);
        handleScrollDown();

        return { previousMessages };
      }
    },
    onMutate({ formData,logicalId}) {
    
      updateChatMessages(makeTempMessage(formData,logicalId));
      handleScrollDown(); 
    },
    onError: (_,{logicalId,formData}) => {
      updateChatMessages( makeTempMessage(formData,logicalId,true),true,logicalId);
      handleScrollDown(); 

    },
  });

  useEffect(() => {
    socket.emit("JOIN_ROOM", conversationId);

    socket.on(EVENTS.SERVER.ROOM_MESSAGE, async (Message) => {
      updateChatMessages(Message);
      handleScrollDown();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTimeout(() => {
      !shouldScroll &&
        handleScrollWithValue(
          messageContainerRef.current!.scrollHeight -
          scroll -
          messageContainerRef.current!.scrollTop
        );
      shouldScroll && handleScrollDown();
    }, 0);

    if (data) {
      setChatMessages(handlePagingMessages(data));
      console.log(data.pages[0]);

      isFirstPage && setCurrentConversation(data.pages[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (firstMessageInView && hasNextPage && data) {
      setScroll(messageContainerRef.current!.scrollHeight);
      fetchNextPage();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstMessageInView]);

  if (isPending) {
    return (
      <div className="w-full h-[500px] p-8">
        <Spinner />
      </div>
    );
  }

  return (
    data && (
      <div className="h-full">
        {!conversationAccordionId&&(<div className="px-4 w-full h-[53px] basis-4 flex flex-row justify-center  sticky  top-[-1px] bg-black bg-opacity-60 backdrop-blur-xl z-50 items-center">
          <div
            className="hover:bg-[#191919] h-10 flex mr-2 lg:hidden rounded-full transition-all p-2 cursor-pointer"
            data-testid="Back"
            onClick={() => {
              navigate(-1);
            }}
          >
            <MoveLeft className="max-w-[50px] " />
          </div>

          {
            !inView && data.pages[0].isGroup&&!data.pages[0].photo ?
              <ImageGrid
                className="w-10 h-8 rounded-full mr-2"
                images={data.pages[0].users.map(conversation => conversation.profileImageUrl || VITE_DEFAULT_IMAGE)} /> :
              <img
                src={data.pages[0].isGroup? data.pages[0].photo :
                  data.pages[0].users[0].profileImageUrl ||VITE_DEFAULT_IMAGE
                }
                className="w-8 h-8 rounded-full mr-2"
              />
          }

          <div className="w-full h-full flex  items-center">
            <h2 className="font-bold text-[17px]">{data.pages[0].name}</h2>
          </div>
          <div className="flex justify-end items-center min-w-[56px] min-h-[32px]">
            <div className="w-10 h-10 flex justify-end items-center ">
              <Link to={`/messages/${conversationId}/info`}>
                <Info className=" w-5 h-5 cursor" />
              </Link>
            </div>
          </div>
        </div>)}
        <div className={cn("w-full relative mx-auto flex flex-col max-h-[calc(100vh-55px)] ",conversationAccordionId&&"h-[53vh] max-h-[400px]")}>
          <div className={`${conversationAccordionId&&"overflow-x-hidden"}  overflow-y-auto`} ref={messageContainerRef}>
            {!data.pages[0].isGroup && !hasNextPage && (
              <div
                className=" w-full px-4 "
                onClick={() => navigate("/Profile/" + data?.pages[0].users[0].userName)}
              >
                {" "}
                {/* change with real username */}
                <MessagesConversationUserInfo
                  chatPicture={
                    data.pages[0].isGroup ? data.pages[0].photo : data.pages[0].users[0].profileImageUrl ||
                      "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
                  }
                  userName={data?.pages[0].users[0].userName || ""}
                  name={data?.pages[0].users[0].name || ""}
                  ref={ref}
                />
              </div>
            )}
            {hasNextPage && (
              <div className="py-10">
                <div ref={refFirstMessage}></div>
                <Spinner />
              </div>
            )}
            <div
              ref={conversationContainerRef}
              className={cn(
                "flex-shrink px-4 h-[calc(63vh-70px)]",
                (data.pages[0].isGroup || hasNextPage) && " h-[85vh]", data.pages[0].blocked && "h-[80vh]"
              )}
            >
              {chatMessages &&
                chatMessages
                  .slice()
                  .reverse()
                  .map((message, index) => (
                    <>
                      {index == chatMessages.length - 1 && (
                        <div
                          key={"refLastMessage"}
                          ref={refLastMessage}
                          className="w-full h-1"
                        ></div>
                      )}

                      <MessagesConversationMessage
                        key={index}
                        isAccordion={!!conversationAccordionId}
                        setChatMessages={setChatMessages}
                        {...message}
                        isGroup={data.pages[0].isGroup}
                      />
                    </>
                  ))}
              {data && data.pages[0].blocked && <p className="text-center w-full text-gray text-sm pb-5">
                You can no longer send messages to this person
              </p>}
            </div>
            {!lastMessageInView && (
              <div
                onClick={handleScrollDown}
                className=" absolute py-2 px-3 cursor-pointer rounded-2xl bottom-20 right-12 box-shadow backdrop-blur-sm bg-black bg-opacity-90 flex items-center justify-center"
              >
                <ArrowDown className="text-secondary w-6 h-6" />
              </div>
            )}
          </div>
          {data && data.pages[0].blocked == false &&
            <div className="flex-grow  border-t relative  border-primary border-opacity-30 px-2    flex-shrink-0">
              {messageReply && (
                <div className="border-l-4 items-center   py-2 px-3 w-full bg-[#16181c] flex flex-row justify-between border-primary border-opacity-90">
                  <div className="flex flex-col max-h-[28vh] max-w-[95%] overflow-hidden  ">
                    <span className="text-primary text-[13px]">
                      {messageReply?.userName}
                    </span>
                    <span className="text-primary text-[13px]">
                      {messageReply?.message}
                    </span>
                  </div>
                  <div className="flex flex-row items-center max-h-[50px] justify-center ">
                    <div className=" flex justify-center items-center w-14 h-11 mr-2">
                      <img src={messageReply.image[0].value} alt="" />
                    </div>
                    <X
                      className="h-5 w-5 text-gray cursor-pointer"
                      onClick={() => setMessageReply(null)}
                    />
                  </div>
                </div>
              )}
              <MessagesConversationInput
                selectedImageFile={selectedImageFile}
                isAccordion ={!!conversationAccordionId}
                setSelectedImageFile={setSelectedImageFile}
                handleSubmit={handleSubmit}
                text={text}
                setText={setText}
              />
            </div>

          }
        </div>
      </div>
    )
  );
}
