import { useContext, useEffect, useMemo, useState } from "react";
import TweetsList from "@/components/TweetsList/TweetsList";
import CreateTweetContainer from "@/components/CreateTweet/CreateTweetContainer";
import { useInfiniteScroll } from "@/lib/useInfiniteScroll";
import { timelineForYouTweets, timelineTweets } from "@/lib/utils";
import { UserContext } from "@/contexts/UserContextProvider";

export function Home() {
  const [active, setActive] = useState("For you");
  const { token } = useContext(UserContext);
  const { data, ref, refetch, isFetching, isFetchingNextPage, hasNextPage } =
    useInfiniteScroll(
      async ({ pageParam }) => {
        if (active == "For you")
          return await timelineForYouTweets(pageParam, 10, token!)
        
        else
          return await timelineTweets(pageParam, 10, token!,"");
      },
      ["tweets", "timeline",active]
    );

  useEffect(() => {
    if (!token) return;
    refetch();
  }, [token]);

  const dataArr = useMemo(() => {
    return data?.pages.flat() || [];
  }, [data]);

  return (
    <div className="max-w-[600px] w-full h-full flex-grow border-r border-primary border-opacity-30 max-sm:w-[280px]">
      <div className="flex flex-row min-h-[50px] w-full sticky  top-[-1px] bg-black bg-opacity-60 backdrop-blur-xl z-50 border-b border-primary border-opacity-30">
        <div
          className="w-full  flex justify-center items-center  px-4 py-0 min-w-[56px] hover:bg-[#181818] transition-all cursor-pointer"
          onClick={() => setActive("For you")}
        >
          <span
            className={`${active == "For you"
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
            className={`${active == "Following"
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
        <TweetsList
          fetcherRef={ref}
          data={dataArr}
          isFetching={isFetching}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
        />
      </div>
    </div>
  );
}
