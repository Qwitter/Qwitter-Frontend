import { Image, ScanSearch, Smile, Vote, Check, LucideIcon } from "lucide-react";
import { Button } from "../ui/button";
import { whoToReply } from "../../constants"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { cn } from "@/lib";
import { useEffect, useRef, useState } from "react";
type Images = {
    value: string;
    type: string;
}
export default function CreateTweetFooter({ text,selectedFile,setSelectedFile,isValid }: {isValid:boolean; text: string;selectedFile:Images[];setSelectedFile:React.Dispatch<React.SetStateAction<Images[]>> }) {
    const icons = [{ icon: Image, hover: "media" }, { icon: ScanSearch, hover: "GIF" }, { icon: Vote, hover: "Poll" }, { icon: Smile, hover: "Emoji" }]
    const [isPopupOpen, setPopupOpen] = useState(false);
    const fileInput = useRef<HTMLInputElement>(null)

    const togglePopup = () => {
        setPopupOpen(!isPopupOpen);
    };
    const [currentWhoToReply, setCurrentWhoToReply] = useState({ ...whoToReply[0] })
    function handleUploadImg() {
        fileInput.current?.click()
    }

    const handleFileChange = () => {
        const file = fileInput.current!.files;
        if (file) {
            const newFiles = [...selectedFile, { value: URL.createObjectURL(file[0]), type: "photo" }];
            setSelectedFile(newFiles)
            fileInput.current!.value=''
        }
    };

    return (
        <div className="flex flex-col items-start w-full">
            <div className="h-12 flex flex-row items-center pb-3 w-full border-b border-primary border-opacity-20 cursor-pointer" onClick={togglePopup}>
                <currentWhoToReply.icon color="rgb(29,155,240)" className="mr-1 w-4 h-4" strokeWidth="2.5" />
                <span className="text-secondary text-sm font-bold">{currentWhoToReply.text} can reply</span>
            </div>
            {isPopupOpen && <ReplyPopup closePopup={() => { setPopupOpen(false) }} currentWhoToReply={currentWhoToReply} setCurrentWhoToReply={setCurrentWhoToReply} />}
            <div className="flex flex-row p-1 py-2 items-start w-full">
                <div className="w-full  flex flex-row items-center ">
                    <div className="w-full h-full ">
                        <div className="flex flex-row items-center h-full ">
                            {
                                icons.map((Icon, index) => (
                                    <div key={index} className="text-secondary h-full group relative max-w-[40px] w-full cursor-pointer" onClick={index == 0 ? handleUploadImg : () => { }}>
                                        <Icon.icon className="w-10 h-10 p-2 rounded-3xl group-hover:bg-secondary group-hover:bg-opacity-25" />
                                        <div className="absolute bg-[#657b8b] rounded-sm text-primary text-xs px-2 py-1 opacity-0 bg-opacity-75 group-hover:opacity-100 transition-opacity bottom-full left-1/2 transform -translate-x-1/2 -translate-y-[-65px]">
                                            {Icon.hover}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="flex flex-row items-center">
                        {
                            text.length <= 290 && text.length > 0 &&
                            (<div className={cn("transition-all w-[30px] h-[30px] flex flex-col justify-center items-center ", text.length + 1 > 260 ? "w-[38px] h-[38px]" : "")}>
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
                        <Button variant="secondary" className=' px-5 py-2 mt-1 ml-2' disabled={!isValid} type="submit"> Post</Button>
                    </div>
                    <input type="file" className="hidden" onChange={handleFileChange} ref={fileInput} accept="images/*" />
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
    const [position, setPosition] = useState<'above' | 'below'>('below');
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Calculate the height of the popup
        const popupHeight = popupRef.current!.offsetHeight!;

        // Calculate the distance from the bottom of the parent container to the bottom of the viewport
        const distanceToBottom = window.innerHeight - popupRef.current!.getBoundingClientRect().bottom;

        // Calculate the distance from the top of the parent container to the top of the viewport
        const distanceToTop = popupRef.current!.getBoundingClientRect().top;

        // Determine whether there is enough space below or above the parent container
        const hasSpaceBelow = distanceToBottom >= popupHeight + 50;
        const hasSpaceAbove = distanceToTop >= popupHeight + 50;

        // Set the position of the popup accordingly
        if (hasSpaceBelow && !hasSpaceAbove) {
            setPosition('below');
        } else if (hasSpaceAbove && !hasSpaceBelow) {
            setPosition('above');
        }

    }, []);
    return (
        <div
            ref={popupRef}
            style={{ [position === 'above' ? 'bottom' : 'top']: 'calc(50%)' }}
            className=
            "absolute w-[320px] h-[350px] min-h-[100px] pt-4 overflow-y-auto box-shadow z-40 bg-black  text-primary text-xs rounded-xl"
        >
            <div className="w-full px-4 py-3 flex flex-col gap-1">
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
        </div>
    )
}