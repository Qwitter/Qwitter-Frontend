import { cn } from "@/lib";
import { MailPlus, Settings } from "lucide-react";

type MessageProps = {
    handleSettingsClick?: () => void;
    settingsIcon?: boolean;
    className?: string;
}

export function MessagesHeader({ settingsIcon = true, handleSettingsClick = () => { }, className }: MessageProps) {
    return (
        <div className={cn("px-4 w-full h-[53px] flex flex-row justify-center  sticky  top-[-1px] bg-black bg-opacity-60 backdrop-blur-xl z-50 items-center", className)}>
            <div className="w-full h-full flex  items-center">
                <h2 className="font-bold text-xl">Messages</h2>
            </div>
            <div className="flex justify-between items-center min-w-[56px] min-h-[32px]">
                <div className={cn('w-10 h-10 flex justify-center items-center', settingsIcon && "cursor-pointer")} onClick={handleSettingsClick}>
                    {settingsIcon && <Settings className=' w-5 h-5' />}
                </div>
                <div className='w-10 h-10 flex justify-center items-center '>
                    <MailPlus className=' w-5 h-5' />
                </div>
            </div>
        </div>
    )
}