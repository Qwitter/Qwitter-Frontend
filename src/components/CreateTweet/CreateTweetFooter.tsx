import { Image, ScanSearch, Smile, Vote, Check, LucideIcon } from "lucide-react";
import { Button } from "../ui/button";
import { whoToReply } from "../../constants"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { cn } from "@/lib";
import { useRef, useState } from "react";
import { CreateTweetFooterProp } from "./types/CreateTweetProps";
import EmojiPicker from 'emoji-picker-react';
import { EmojiStyle, Theme } from 'emoji-picker-react';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "../ui/use-toast";
export default function CreateTweetFooter({ mode, setFiles,handleTextChange ,text, files, selectedImages, setSelectedImages, isValid, handleSubmit, setVideoFile, videoFile }: CreateTweetFooterProp) {
    const icons = [{ icon: Image, hover: "media" }, { icon: ScanSearch, hover: "GIF" }, { icon: Vote, hover: "Poll" }, { icon: Smile, hover: "Emoji" }]
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
    const fileInput = useRef<HTMLInputElement>(null)


    const [currentWhoToReply, setCurrentWhoToReply] = useState({ ...whoToReply[0] })
    function handleUploadImg() {
        fileInput.current?.click()
    }

    const handleFileChange = () => {
        const filesTemp = fileInput.current!.files;
        if (filesTemp && filesTemp.length > 0) {
            const selectedFile = filesTemp[0];
            const tempFiles = [...files, selectedFile];
            setFiles(tempFiles);
            if (selectedFile.type.startsWith('image/')) {
                const newFiles = [...selectedImages, { value: URL.createObjectURL(selectedFile), type: "photo" }];
                setSelectedImages(newFiles)
            }
            else if (selectedFile.type.startsWith('video/') && selectedImages.length == 0) {
                setVideoFile(selectedFile);
            } else if (!selectedFile.type.startsWith('video/') && !selectedFile.type.startsWith('image/')) {
                toast({
                    description: 'Unsupported file type. Please select an image or a video.',
                    variant: "destructive"
                });
            }
            fileInput.current!.value = ''

        }
    };

    return (
        <div className="flex flex-col items-start w-full">
            {(text.length != 0 || mode == "popUp" || selectedImages.length > 0) && mode != "reply" &&
                <Popover open={isPopupOpen} onOpenChange={setPopupOpen} >
                    <PopoverTrigger className="z-30 w-full">
                        <div className="h-12 z-0 flex flex-row items-center pb-3 w-full border-b border-primary border-opacity-20 cursor-pointer">
                            <currentWhoToReply.icon color="rgb(29,155,240)" className="mr-1 w-4 h-4" strokeWidth="2.5" />
                            <span data-testid="whoCanReply" className="text-secondary text-sm font-bold">{currentWhoToReply.text} can reply</span>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-[320px] h-[380px] min-h-[100px]  overflow-y-auto box-shadow bg-black  text-primary text-xs rounded-xl">
                        <ReplyPopup closePopup={() => { setPopupOpen(false) }} currentWhoToReply={currentWhoToReply} setCurrentWhoToReply={setCurrentWhoToReply} />
                    </PopoverContent>
                </Popover>

            }
            <div className="flex flex-row p-1 py-2 items-start w-full">
                <div className="w-full  flex flex-row items-center ">
                    <div className="w-full h-full ">
                        <div className="flex flex-row items-center h-full ">
                            {
                                icons.map((Icon, index) => (
                                    index < 3 ?
                                        (<div key={index} className={cn("text-secondary h-full  relative max-w-[40px] w-full", index == 0 && (videoFile || selectedImages.length > 3) ? "opacity-40" : "group  cursor-pointer")}
                                            onClick={index == 0 && !videoFile && selectedImages.length < 4 ? handleUploadImg : index == icons.length - 1 ? () => { setPopupOpen(true) } : () => { }}>
                                            <Icon.icon className="w-10 h-10 p-2 rounded-3xl group-hover:bg-secondary group-hover:bg-opacity-25" />
                                            <div className="absolute bg-[#657b8b] rounded-sm text-primary text-xs px-2 py-1 opacity-0 bg-opacity-75 group-hover:opacity-100 transition-opacity bottom-full left-1/2 transform -translate-x-1/2 -translate-y-[-65px]" data-testid={Icon.hover}>
                                                {Icon.hover}
                                            </div>
                                        </div>)
                                        :
                                        (<Popover open={isEmojiPickerOpen} onOpenChange={setIsEmojiPickerOpen} >
                                            <PopoverTrigger className="z-30 ">
                                                <div className={cn("text-secondary h-full  relative max-w-[40px] w-full group  cursor-pointer")}
                                                    onClick={() => { setIsEmojiPickerOpen(true) }}>
                                                    <Icon.icon className="w-10 h-10 p-2 rounded-3xl group-hover:bg-secondary group-hover:bg-opacity-25" />
                                                    <div className="absolute bg-[#657b8b] rounded-sm text-primary text-xs px-2 py-1 opacity-0 bg-opacity-75 group-hover:opacity-100 transition-opacity bottom-full left-1/2 transform -translate-x-1/2 -translate-y-[-65px]" data-testid={Icon.hover}>
                                                        {Icon.hover}
                                                    </div>
                                                </div>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[220px] h-[380px] min-h-[100px]  border-none bg-transparent rounded-xl">
                                                <EmojiPicker  theme={Theme.DARK} emojiStyle={EmojiStyle.TWITTER} width={300} height={400} onEmojiClick={(emoji)=>{handleTextChange(text+emoji.emoji)}} skinTonesDisabled  autoFocusSearch  />
                                            </PopoverContent>
                                        </Popover>)

                                ))
                            }

                        </div>
                    </div>

                    <div className="flex flex-row items-center">
                        {
                            text.length <= 290 && text.length > 0 &&
                            (<div className={cn("transition-all w-[30px] h-[30px] flex flex-col justify-center items-center ", text.length + 1 > 260 ? "w-[38px] h-[38px]" : "")} data-testid="charsLeft">
                                <CircularProgressbar value={text.length} maxValue={280} text={text.length + 1 > 260 ? `${280 - text.length}` : ""}
                                    styles={{
                                        path: {
                                            stroke: text.length < 260 ? '#1d9bf0' : 280 - text.length <= 0 ? "#aa202a" : "#ffd400"
                                        },
                                        text: {
                                            // Text color
                                            fill: 280 - text.length > 0 ? 'gray' : '#aa202a',
                                            // Text size
                                            fontSize: '40px',
                                            fontWeight: 600
                                        },
                                        trail: {
                                            stroke: '#2f3336'
                                        },
                                        background: {
                                            fill: '#3e98c7',
                                        }

                                    }}
                                />
                            </div>)

                        }
                        {
                            text.length > 290 && <span className="text-danger text-sm">{280 - text.length}</span>

                        }
                        {text.length > 0 &&
                            <div className="w-[1px] h-[31px] bg-[#3E4144] ml-[8px] mr-3"></div>}
                        <Button variant="secondary" className=' px-5 py-2 mt-1 ml-2'  {...{ disabled: (text.trim().length == 0 && (selectedImages.length > 0 || videoFile)) ? false : !isValid }} type="button" onClick={handleSubmit} data-testid="postTweet"> Post</Button>
                    </div>
                    <input type="file" className="hidden" onChange={handleFileChange} ref={fileInput} accept={selectedImages.length > 0 ? "image/*" : "image/*,video/*"} data-testid="uploadImage" multiple={false} />
                </div>
            </div>
        </div>
    )
}
function ReplyPopup({ currentWhoToReply, setCurrentWhoToReply, closePopup }: {
    currentWhoToReply: { text: string, icon: LucideIcon }, setCurrentWhoToReply: React.Dispatch<React.SetStateAction<{
        text: string;
        icon: LucideIcon;
    }>>, closePopup: () => void
}) {

    return (
        <>
            <div className="w-full px-4 py-3 flex flex-col gap-1" data-testid="whoCanReplyPopup" >
                <span className="text-primary font-bold text-[15px]">who can reply?</span>
                <p className="text-gray text-[15px] ">Choose who can reply to this post. Anyone mentioned can always reply</p>
            </div>
            <ul >
                {
                    whoToReply.map(option => (
                        <li key={option.text} className="py-3 px-4 flex flex-row items-center hover:bg-[#16181c] w-full transition-all cursor-pointer" onClick={() => { setCurrentWhoToReply(option); closePopup() }}>


                            <div className="rounded-full  bg-secondary mr-4 w-10 h-10 flex justify-center items-center">
                                <option.icon />

                            </div>
                            <p className="text-primary w-3/5 text-[15px] font-bold break-words">{option.text}</p>
                            {
                                option.text == currentWhoToReply.text && <Check className="w-5 ml-5 h-5" />
                            }
                        </li>
                    ))

                }
            </ul>
        </>
    )
}