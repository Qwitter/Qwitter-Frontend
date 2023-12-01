import { Textarea } from "@/components/CreateTweet/Textarea";
import { Info, Image, ScanSearch, SendHorizonal, MoreHorizontal } from "lucide-react";
import { forwardRef, useContext, useRef, useState } from "react";
import { Link } from 'react-router-dom'
import { Images, Mention, MessagesMessage } from "./types/MessagesTypes";
import CreateTweetPopUp from "@/components/CreateTweet/CreateTweetPopUp";
import { MessagesList } from "./MessagesList";
import { chat, userArray } from "@/constants";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib";
import TweetImagesViewer from "@/components/TweetImagesViewer/TweetImagesViewer";
import moment from "moment";
import { UserContext } from "@/contexts/UserContextProvider";

const MessagesConversationUserInfo = forwardRef<HTMLDivElement>((_, ref) => (

    <div ref={ref}
        className="cursor-pointer mb-4 px-4 py-5 flex flex-col rounded-sm bg-black hover:bg-[#16181c] transition-all  justify-start items-center border-b border-primary border-opacity-30">
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

    return (
        <div className="h-full">
            <div className="px-4 w-full h-[53px] basis-4 flex flex-row justify-center  sticky  top-[-1px] bg-black bg-opacity-60 backdrop-blur-xl z-50 items-center">
                {!inView && <img src="https://github.com/shadcn.png" className="w-8 h-8 rounded-full mr-2" />}
                <div className="w-full h-full flex  items-center">
                    <h2 className="font-bold text-[17px]">Marwan samy</h2>
                </div>
                <div className="flex justify-end items-center min-w-[56px] min-h-[32px]">
                    <div className='w-10 h-10 flex justify-end items-center '>
                        <Link to="/Messages/compose">
                            <Info className=' w-5 h-5 cursor' />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="w-full mx-auto flex flex-col max-h-[calc(100vh-55px)] ">
                <div className="  overflow-y-auto">
                    <div className=" w-full px-4 ">
                        <MessagesConversationUserInfo ref={ref} />
                    </div>
                    <div className='flex-shrink px-4'>
                        <MessagesConversationMessage {...chat[0]} />
                        <MessagesConversationMessage {...chat[1]} />
                        <MessagesConversationMessage {...chat[2]} />
                        <MessagesConversationMessage {...chat[3]} />
                        <MessagesConversationMessage {...chat[4]} />

                    </div>
                </div>
                <MessagesConversationInput text={text} setText={setText} />
            </div>
        </div>
    )
}
function MessagesConversationMessage({ status, date, id, media, text, userName, userPhoto }: MessagesMessage) {
    const { user } = useContext(UserContext)
    const formatDate = (dateString: string) => {
        const date = moment(dateString);
        const now = moment();
        if (now.diff(date, 'days') === 0)
            return date.format('h:mm A');
        else if (now.diff(date, 'days') === 1)
            return date.format('Yesterday, h:mm A');
        else if (now.diff(date, 'days') < 7)
            return date.format('ddd h:mm A');
        else
            return date.format('MMM D, YYYY, h:mm A');

    };
    if (userName == user!.userName) {
        return (
            <div className="flex flex-col items-end pb-6">
                <div className="flex flex-row justify-end" >
                    <div className="w-[87.5%] group flex flex-row-reverse">
                        <div className="bg-secondary text-[15px] px-4 py-3 w-fit rounded-3xl rounded-br-sm">
                            <span className="text-primary text-[15px]">{text}</span>
                        </div  >
                        <div className="opacity-0 pr-1 flex flex-row  group-hover:opacity-100 ">
                            <div className="text-secondary h-full group relative max-w-[40px] flex items-center w-full cursor-pointer">
                                <MoreHorizontal className="w-10 h-10 p-2 rounded-3xl text-gray hover:bg-secondary hover:bg-opacity-10" />
                            </div>
                        </div>
                    </div>

                </div>
                <div >
                    <span className="text-gray text-[13px] ">{formatDate(date)}</span>
                </div>
            </div>
        )
    }
    return (
        <div className="flex flex-col pb-6">
            <div >
                <div className="w-[87.5%] group flex flex-row">
                    <div className="bg-[#2f3336] text-[15px] px-4 py-3 w-fit rounded-3xl rounded-bl-sm">
                        <span className="text-primary text-[15px]">{text}</span>
                    </div  >
                    <div className="opacity-0 pl-1 flex flex-row  group-hover:opacity-100 ">
                        <div className="text-secondary h-full group relative max-w-[40px] flex items-center w-full cursor-pointer">
                            <MoreHorizontal className="w-10 h-10 p-2 rounded-3xl text-gray hover:bg-secondary hover:bg-opacity-10" />
                        </div>
                    </div>
                </div>

            </div>
            <div >
                <span className="text-gray text-[13px] ">{formatDate(date)}</span>
            </div>
        </div>)
}
function MessagesConversationInput({ text, setText }: { text: string; setText: React.Dispatch<React.SetStateAction<string>> }) {
    const [mentionsAndTags, SetMentionsAndTags] = useState<Mention[]>([])
    const fileInput = useRef<HTMLInputElement>(null)
    const [selectedImageFile, setSelectedImageFile] = useState<File>()
    const [selectedImage, setSelectedImage] = useState<Images[]>()
    const [popup, setPopup] = useState({
        visible: false,
        content: '',
        index: 0,
        position: { top: 0, left: 0 },
    });
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {

        const inputText = e.target.value;
        setText(inputText);
    };
    const handleFileChange = () => {
        const file = fileInput.current!.files;
        selectedImageFile
        if (file) {
            setSelectedImageFile(file[0]);
            setSelectedImage([{ value: URL.createObjectURL(file[0]), type: "photo" }])
            fileInput.current!.value = ''
        }
    };
    const handleUploadImg = () => {
        fileInput.current?.click()
    }
    const handleRemoveImage = () => {
        setSelectedImage(undefined)
        setSelectedImageFile(undefined);

    }
    const handleUserClick = (username: string) => {
        // Find the mention in the current text and replace it with the selected username

        const mention = mentionsAndTags[popup.index]
        const startPosition = mention.position;
        const updatedText = text.slice(0, startPosition) + " " + username + text.slice(startPosition + mention.length);
        setText(updatedText.trimStart());

        // Close the popup
        setTimeout(() => {
            setPopup({ visible: false, content: "", index: 0, position: { top: 0, left: 0 } });
        }, 50);
    };
    return (
        <div className="py-1 px-3 border-t flex-grow  flex-shrink-0 border-primary border-opacity-30 relative">
            <div className="bg-[#202327] flex flex-col w-full  rounded-2xl ">
                <div className="flex flex-row  max-w-[75vw] items-center relative ">

                    {!selectedImage && <><div className="text-secondary group relative max-w-[40px] flex items-center w-full cursor-pointer" onClick={handleUploadImg}>
                        <Image className="w-10 h-10 p-2 rounded-3xl group-hover:bg-secondary group-hover:bg-opacity-25" />
                        <div className="absolute  bg-[#657b8b] rounded-sm text-primary text-xs px-2 py-1 opacity-0 bg-opacity-75 group-hover:opacity-100 transition-opacity bottom-full left-1/2 transform -translate-x-1/2 translate-y-[0]">
                            media
                        </div>
                    </div>
                        <div className="text-secondary h-full group relative max-w-[40px] flex items-center w-full cursor-pointer">
                            <ScanSearch className="w-10 h-10 p-2 rounded-3xl group-hover:bg-secondary group-hover:bg-opacity-25" />
                            <div className="absolute bg-[#657b8b] rounded-sm text-primary text-xs px-2 py-1 opacity-0 bg-opacity-75 group-hover:opacity-100 transition-opacity bottom-full left-1/2 transform -translate-x-1/2 translate-y-[0]">
                                GIF
                            </div>
                        </div></>
                    }
                    <div className="flex flex-col w-full pl-2">
                        {selectedImage && <div className="w-[20vw] max-h-[200px] overflow-y-hidden">
                            <TweetImagesViewer images={selectedImage} mode="edit" removeAttachment={handleRemoveImage} />
                        </div>}
                        <div className={cn("w-full max-w-[440px] max-h-[160px] overflow-y-auto relative", `${selectedImage ? 'max-w-[500px]' : ''}`)}>
                            <Textarea
                                text={text}
                                SetMentionsAndTags={SetMentionsAndTags}
                                mentionsAndTags={mentionsAndTags}
                                popup={popup}
                                setPopup={setPopup}
                                onChange={handleInputChange}
                                mode="Message"
                                highlightClassName={cn("text-sm bg-transparent overflow-x-hidden  max-w-[440px] ", `${selectedImage ? 'max-w-[540px]' : ''}`)}
                                className="bg-transparent text-sm overflow-x-hidden  placeholder:text-gray  focus:ring-transparent focus:border-none focus:outline-none resize-none border-none" placeholder="Start a new message" />
                        </div>
                    </div>
                    <div className="text-secondary h-full group relative max-w-[40px] flex items-center w-full cursor-pointer">
                        <SendHorizonal className="w-10 h-10 p-2 rounded-3xl group-hover:bg-secondary group-hover:bg-opacity-25" />
                        <div className="absolute bg-[#657b8b] w-fit rounded-sm text-primary text-xs px-2 py-1 opacity-0 bg-opacity-75 group-hover:opacity-100 transition-opacity bottom-full left-1/2 transform -translate-x-1/2 translate-y-[0]">
                            Send
                        </div>
                    </div>
                </div>

            </div>
            <input type="file" className="hidden" onChange={handleFileChange} ref={fileInput} accept="images/*" />

            <CreateTweetPopUp mode="Messages" popUp={popup} handleUserClick={handleUserClick} closePopup={() => setPopup({ visible: false, content: "", index: 0, position: { top: 0, left: 0 } })} />
        </div>
    );
}