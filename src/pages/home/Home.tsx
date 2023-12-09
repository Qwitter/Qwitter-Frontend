import { useContext, useEffect, useState } from "react";
import TweetsList from "@/components/TweetsList/TweetsList";
import CreateTweetContainer from "@/components/CreateTweet/CreateTweetContainer";
import SearchInput from "@/components/SearchInput/SearchInput";
import { useInfiniteScroll } from "@/lib/useInfiniteScroll";
import { timelineTweets } from "@/lib/utils";
import { UserContext } from "@/contexts/UserContextProvider";
import { FollowCard } from "@/components/FollowCard/FollowCard";
import { TrendCard } from "@/components/TrendCard/TrendCard";
export function Home() {
  const [active, setActive] = useState("For you");
  const { token } = useContext(UserContext);
  const { data, ref, refetch } = useInfiniteScroll(
    async ({ pageParam }) => {
      return await timelineTweets(pageParam, 10, token!); // "123456" should be replaced with token
    },
    ["tweets", "timeline"]
  );

  useEffect(() => {
    // console.log(data);
  }, [data]);

  useEffect(() => {
    if (!token) return;
    refetch();
    console.log("refetch");
  }, [token, refetch]);

  return (
    <>
      <div className="max-w-[600px] w-full h-full flex-grow border-r border-primary border-opacity-30 ">
        <div className="flex flex-row min-h-[50px] w-full sticky  top-[-1px] bg-black bg-opacity-60 backdrop-blur-xl z-50 border-b border-primary border-opacity-30">
          <div
            className="w-full  flex justify-center items-center  px-4 py-0 min-w-[56px] hover:bg-[#181818] transition-all cursor-pointer"
            onClick={() => setActive("For you")}
          >
            <span
              className={`${
                active == "For you"
                  ? "text-primary border-b-4 font-bold py-3 border-solid border-secondary "
                  : "text-gray"
              } text-base  `}
            >
              For you
            </span>
          </div>

          <div
            className="w-full  flex justify-center items-center  px-4 py-0 min-w-[56px]  hover:bg-[#181818] transition-all cursor-pointer "
            onClick={() => setActive("Following")}
          >
            <span
              className={`${
                active == "Following"
                  ? "text-primary border-b-4 font-bold py-3 border-solid border-secondary "
                  : "text-gray"
              } text-base`}
            >
              Following
            </span>
          </div>
        </div>
        <div>
          <CreateTweetContainer mode="home" />
        </div>
        
      </div>
      {/* <div className="max-w-[600px]  pb-16 relative flex flex-col z-0 w-[36.5%] max-largeX:hidden  h-full">
        <div className="w-full sticky top-0 z-50 bg-black   ">
          <SearchInput />
        </div>
        <div className="mt-5 rounded-lg bg-dark-gray">
          <TrendCard />
        </div>
        <div className="mt-5 rounded-lg bg-dark-gray">
          <FollowCard />
        </div>
      </div> */}
    </>
  );
}
