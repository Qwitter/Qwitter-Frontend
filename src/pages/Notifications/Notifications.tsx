import { useState } from "react";
import TweetsList from '@/components/TweetsList/TweetsList';
import { Skeleton } from "@/components/ui/skeleton";
import CreateTweetContainer from "@/components/CreateTweet/CreateTweetContainer";
import SearchInput from "@/components/SearchInput/SearchInput";
export function Notifications() {
    const [active, setActive] = useState("ALL");

    return (
        <>
            <div className="max-w-[600px] w-full h-full flex-grow border-r border-primary border-opacity-30 ">
                <div className="flex flex-col min-h-[50px] w-full sticky  top-[-1px] bg-black  z-50 border-b border-primary border-opacity-30">
                    <div className="px-4 w-full h-[53px]">
                        <div className="w-full h-full flex  items-center">
                        <h2 className="font-bold text-xl">Notifications</h2>
                        </div>
                    </div>
                    <div className="flex flex-row min-h-[50px] w-full sticky  top-[-1px]  z-50 border-b border-primary border-opacity-30">

                        <div className="w-full  flex justify-center items-center  px-4 py-0 min-w-[56px] hover:bg-[#181818] transition-all cursor-pointer" onClick={() => setActive("ALL")}>
                            <span className={`${active == "ALL" ? 'text-primary border-b-4 font-bold py-3 border-solid border-secondary ' : 'text-gray'} text-base  `}>
                                ALL
                            </span>
                        </div>
                        <div className="w-full  flex justify-center items-center  px-4 py-0 min-w-[56px] hover:bg-[#181818] transition-all cursor-pointer" onClick={() => setActive("Verified")}>
                            <span className={`${active == "Verified" ? 'text-primary border-b-4 font-bold py-3 border-solid border-secondary ' : 'text-gray'} text-base  `}>
                                Verified
                            </span>
                        </div>


                        <div className="w-full  flex justify-center items-center  px-4 py-0 min-w-[56px]  hover:bg-[#181818] transition-all cursor-pointer " onClick={() => setActive("Mentions")}>
                            <span className={`${active == "Mentions" ? 'text-primary border-b-4 font-bold py-3 border-solid border-secondary ' : 'text-gray'} text-base  `}>
                                Mentions
                            </span>
                        </div>
                    </div>

                </div>
                
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
