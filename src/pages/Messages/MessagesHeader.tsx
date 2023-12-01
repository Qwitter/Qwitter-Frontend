import { cn } from "@/lib";
import { MailPlus, Settings } from "lucide-react";
import {  Link } from 'react-router-dom'
type MessageProps = {
    settingsIcon?: boolean;
    className?: string;
}

export function MessagesHeader({ settingsIcon = true, className }: MessageProps) {
    return (
        <div className={cn("px-4 w-full h-[53px] flex flex-row justify-center  sticky  top-[-1px] bg-black bg-opacity-60 backdrop-blur-xl z-50 items-center", className)}>
            <div className="w-full h-full flex  items-center">
                <h2 className="font-bold text-xl">Messages</h2>
            </div>
            <div className="flex justify-between items-center min-w-[56px] min-h-[32px]">


                <div className={cn('w-10 h-10 flex justify-center items-center', settingsIcon && "cursor-pointer")}>
                    <Link to="/Messages/settings" >
                        {settingsIcon && <Settings className=' w-5 h-5' />}
                    </Link>
                </div>
                <div className='w-10 h-10 flex justify-center items-center '>
                    <Link to="/Messages/compose">
                        <MailPlus className=' w-5 h-5 cursor' />
                    </Link>
                </div>
            </div>
        </div>
    )
}