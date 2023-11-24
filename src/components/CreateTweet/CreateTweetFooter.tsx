import { Globe2, Image, ScanSearch, Smile, Vote } from "lucide-react";
import { Button } from "../ui/button";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { cn } from "@/lib";
export default function CreateTweetFooter({ text }: { text: string }) {
    const icons = [{ icon: Image, hover: "media" }, { icon: ScanSearch, hover: "GIF" }, { icon: Vote, hover: "Poll" }, { icon: Smile, hover: "Emoji" }]

    return (
        <div className="flex flex-col items-start w-full">
            <div className="h-12 flex flex-row items-center pb-3 w-full border-b border-primary border-opacity-20">
                <Globe2 color="rgb(29,155,240)" className="mr-1 w-4 h-4" strokeWidth="2.5" />
                <span className="text-secondary text-sm font-bold">Everyone can reply</span>
            </div>
            <div className="flex flex-row p-1 py-2 items-start w-full">
                <div className="w-full  flex flex-row items-center ">
                    <div className="w-full h-full ">
                        <div className="flex flex-row items-center h-full ">
                            {
                                icons.map((Icon, index) => (
                                    <div key={index} className="text-secondary h-full group relative max-w-[40px] w-full">
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
                                        path:{
                                            stroke:  text.length < 260 ? '#1d9bf0' : 280-text.length <=0 ?"#aa202a":"#ffd400"
                                        },
                                        text: {
                                            // Text color
                                            fill: 280-text.length>0 ? 'gray' : '#aa202a',
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
                        <Button variant="secondary" className=' px-5 py-2 mt-1 ml-2' type="submit"> Post</Button>
                    </div>

                </div>
            </div>
        </div>
    )
}