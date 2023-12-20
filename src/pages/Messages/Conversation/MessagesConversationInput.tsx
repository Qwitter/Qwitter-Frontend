import { Textarea } from "@/components/CreateTweet/textarea";
import { Image, ScanSearch, SendHorizonal } from "lucide-react";
import { useRef, useState } from "react";
import { Mention } from "../types/MessagesTypes";
import CreateTweetPopUp from "@/components/CreateTweet/CreateTweetPopUp";
import { cn } from "@/lib";
import TweetImagesViewer from "@/components/TweetImagesViewer/TweetImagesViewer";
import { BigPlayButton, Player } from "video-react";
import { HiOutlineXMark } from "react-icons/hi2";


export function MessagesConversationInput({ text, setText, handleSubmit, selectedImageFile, setSelectedImageFile }:
    {
        selectedImageFile: File | undefined; setSelectedImageFile: React.Dispatch<React.SetStateAction<File | undefined>>
        handleSubmit: () => void; text: string; setText: React.Dispatch<React.SetStateAction<string>>;
    }) {
    const [selectedImage, setSelectedImage] = useState<{ value: string; type: string }[]>([])

    const [mentionsAndTags, SetMentionsAndTags] = useState<Mention[]>([]);
    const fileInput = useRef<HTMLInputElement>(null);
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
        selectedImageFile;
        if (file) {
            setSelectedImage([{ value: URL.createObjectURL(file[0]), type: file[0].type.startsWith('video') ? "video" : "photo" }])
            setSelectedImageFile(file[0]);
            fileInput.current!.value = '';
        }
    };
    const handleUploadImg = () => {
        fileInput.current?.click();
    };
    const handleRemoveImage = () => {
        setSelectedImageFile(undefined);
        setSelectedImage([]);

    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && e.code === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
            e.preventDefault()
            if (text.trim().length> 0) {
                handleSubmit()
                handleRemoveImage()
            }
        }

    }
    const handleUserClick = (username: string) => {
        // Find the mention in the current text and replace it with the selected username
        const mention = mentionsAndTags[popup.index];
        const startPosition = mention.position;
        const updatedText = text.slice(0, startPosition) + " " + username + text.slice(startPosition + mention.length);
        setText(updatedText.trimStart());

        // Close the popup
        setTimeout(() => {
            setPopup({ visible: false, content: "", index: 0, position: { top: 0, left: 0 } });
        }, 50);
    };
    return (
        <div className="py-1 px-3relative">
            <div className="bg-[#202327] flex flex-col w-full  rounded-2xl ">
                <div className="flex flex-row  max-w-[75vw] items-center relative ">

                    {!selectedImageFile && <><div className="text-secondary group relative max-w-[40px] flex items-center w-full cursor-pointer" onClick={handleUploadImg}>
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
                        </div></>}
                    <div className="flex flex-col w-full pl-2 ">
                        {selectedImageFile && (selectedImage[0].type == "video" ?
                            <div
                                className="my-4 relative  rounded-lg overflow-hidden max-h-[200px] max-w-[300px]"
                                onClick={(e) => e.preventDefault()}
                            >
                                
                                <HiOutlineXMark
                                    className="tweet-image-remover-icon z-20"
                                    onClick={() => handleRemoveImage()}
                                />
                                
                                <Player
                                    playsInline
                                    src={selectedImage[0].value}
                                >
                                    <BigPlayButton position="center" />
                                </Player>
                            </div> : <div >
                                <TweetImagesViewer screen="message" images={selectedImage} mode="edit" removeAttachment={handleRemoveImage} />
                            </div>)}
                        <div className={cn("w-full max-w-[440px] max-h-[160px] overflow-y-auto relative", `${selectedImageFile ? 'max-w-[500px]' : ''}`)}>
                            <Textarea
                                text={text}
                                SetMentionsAndTags={SetMentionsAndTags}
                                mentionsAndTags={mentionsAndTags}
                                popup={popup}
                                setPopup={setPopup}
                                onKeyDown={handleKeyDown}
                                onChange={handleInputChange}
                                mode="Message"
                                highlightClassName={cn("text-sm bg-transparent overflow-x-hidden  max-w-[440px] ", `${selectedImageFile ? 'max-w-[540px]' : ''}`)}
                                className="bg-transparent text-sm overflow-x-hidden  placeholder:text-gray  focus:ring-transparent focus:border-none focus:outline-none resize-none border-none" placeholder="Start a new message" />
                        </div>
                    </div>
                    {text.trim().length > 0 || selectedImage.length > 0 ? <button className="text-secondary h-full group relative max-w-[40px] flex items-center w-full cursor-pointer" onClick={handleSubmit}>
                        <SendHorizonal className="w-10 h-10 p-2 rounded-3xl group-hover:bg-secondary group-hover:bg-opacity-25" />
                        <div className="absolute bg-[#657b8b] w-fit rounded-sm text-primary text-xs px-2 py-1 opacity-0 bg-opacity-75 group-hover:opacity-100 transition-opacity bottom-full left-1/2 transform -translate-x-1/2 translate-y-[0]">
                            Send
                        </div>
                    </button> :
                        <div className="text-secondary h-full opacity-50  relative max-w-[40px] flex items-center w-full " >
                            <SendHorizonal className="w-10 h-10 p-2 rounded-3xl " />
                            <div className="absolute bg-[#657b8b] w-fit rounded-sm text-primary text-xs px-2 py-1 opacity-0 bg-opacity-75 group-hover:opacity-100 transition-opacity bottom-full left-1/2 transform -translate-x-1/2 translate-y-[0]">
                                Send
                            </div>
                        </div>

                    }
                </div>

            </div>
            <input type="file" className="hidden" onChange={handleFileChange} ref={fileInput} accept="images/*" />

            <CreateTweetPopUp mode="Messages" popUp={popup} handleUserClick={handleUserClick} closePopup={() => setPopup({ visible: false, content: "", index: 0, position: { top: 0, left: 0 } })} />
        </div>
    );
}
