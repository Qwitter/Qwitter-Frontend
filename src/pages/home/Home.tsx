import { useState } from "react";
import TweetsList from '@/components/TweetsList/TweetsList';
import { Skeleton } from "@/components/ui/skeleton";
import CreateTweetContainer from "@/components/CreateTweet/CreateTweetContainer";
import SearchInput from "@/components/SearchInput/SearchInput";
export function Home() {
    const [active, setActive] = useState("For you");

    return (
        <>
            <div className="max-w-[600px] w-full h-full flex-grow border-r border-primary border-opacity-30 ">
                <div className="flex flex-row min-h-[50px] w-full sticky  top-[-1px] bg-black bg-opacity-60 backdrop-blur-xl z-50 border-b border-primary border-opacity-30">
                    <div className="w-full  flex justify-center items-center  px-4 py-0 min-w-[56px] hover:bg-[#181818] transition-all cursor-pointer" onClick={()=>setActive("For you")}>
                        <span className={`${active=="For you" ? 'text-primary border-b-4 font-bold py-3 border-solid border-secondary ' : 'text-gray'} text-base  `}>
                            For you
                        </span>
                    </div>


                    <div className="w-full  flex justify-center items-center  px-4 py-0 min-w-[56px]  hover:bg-[#181818] transition-all cursor-pointer " onClick={()=>setActive("Following")}>
                        <span className={`${active=="Following" ? 'text-primary border-b-4 font-bold py-3 border-solid border-secondary ' : 'text-gray'} text-base  `}>
                            Following
                        </span>
                    </div>

                </div>
                <div>
                    <CreateTweetContainer mode="home" />
                </div>
                <TweetsList />
            </div>
            <div className="max-w-[600px]  pb-16 relative flex flex-col z-0 w-[36.5%] max-largeX:hidden  h-full">
                <div className="w-full sticky top-0 z-50 bg-black   ">
                    <SearchInput />
                </div>
                <div className="px-4 py-3 rounded-lg mt-5 bg-dark-gray">
                    <Skeleton className="w-full  h-[120px] " />
                </div>
                <div className="px-4 py-3 rounded-lg mt-5 bg-dark-gray">
                    <Skeleton className="w-full  h-[500px] " />
                </div>
                <div className="px-4 py-3 rounded-lg mt-5 bg-dark-gray">
                    <Skeleton className="w-full  h-[300px] " />
                </div>
            </div>
        </>
    );
}
