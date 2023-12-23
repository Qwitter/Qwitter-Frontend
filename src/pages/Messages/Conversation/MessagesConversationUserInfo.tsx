import { UserNameHoverCard } from "@/components/UserNameHoverCard/UserNameHoverCard";
import { MessageUser } from "@/models/MessagesTypes";
import { HTMLProps, Ref, forwardRef } from "react";
import { Link, useLocation } from "react-router-dom";

interface MessagesConversationUserInfoProps extends HTMLProps<HTMLDivElement> {

    user: MessageUser;
    chatPicture: string;
}
export const MessagesConversationUserInfo = forwardRef(

    ({ user, chatPicture }: MessagesConversationUserInfoProps, ref: Ref<HTMLDivElement>) =>{ 
        const location =useLocation();
        const { VITE_DEFAULT_IMAGE } = import.meta.env;

        return(
        <div ref={ref}
            className="cursor-pointer mb-4 px-4 pb-16 py-5 flex flex-col rounded-sm bg-black hover:bg-[#16181c] transition-all  justify-start items-center border-b border-primary border-opacity-30">
            <Link 
            to={"/flow/photo"}
            state={{previousLocation: location ,photo:chatPicture}}
            onClick={(e)=>e.stopPropagation()}
            >
            <img src={chatPicture} alt="" className="w-16 h-16 rounded-full" />
            </Link>
            <div className="flex  flex-col mb-1">
                <UserNameHoverCard
                    name={user?.name || ""}
                    isFollowing={user?.isFollowing || false}
                    description={user?.description || ""}
                    userName={user?.userName || ""}
                    followersCount={user?.followersCount || 0}
                    followingCount={user?.followingCount || 0}
                    profileImageUrl={user?.profileImageUrl || VITE_DEFAULT_IMAGE}
                />
                <span className="text-gray text-center text-[15px] ">@{user.userName}</span>
            </div>
            <span className="text-gray text-sm"> Joined at November 2023</span>

        </div>
    )});
