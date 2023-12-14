import { HTMLProps, Ref, forwardRef } from "react";

interface MessagesConversationUserInfoProps extends HTMLProps<HTMLDivElement> {
    userName: string;
    name: string;
    chatPicture: string;
}
export const MessagesConversationUserInfo = forwardRef(
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
