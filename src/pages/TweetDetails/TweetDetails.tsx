import { Spinner } from "@/components/Spinner";
import { default as TweetComponent } from "@/components/Tweet/Tweet";
import TweetsList from "@/components/TweetsList/TweetsList";
import { UserContext } from "@/contexts/UserContextProvider";
import { useInfiniteScroll } from "@/lib/useInfiniteScroll";
import { getTweetById, getTweetReplies } from "@/lib/utils";
import { TweetWithReplyAndRetweet } from "@/models/Tweet";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TweetDetails = ({compact=false}:{compact?:boolean}) => {
  const { tweetId } = useParams<{ tweetId: string }>();
  const [tweetWithRepliesId, setTweetWithRepliesId] = useState<string>(
    tweetId!
  );
  const { user, token } = useContext(UserContext);
  const navigate = useNavigate();
  const {
    data: replies,
    ref,
    refetch,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteScroll(
    async ({ pageParam }) => {
      if (!token || !tweetWithRepliesId) return () => {};
      return getTweetReplies(tweetWithRepliesId, token, pageParam, 10);
    },
    ["tweet", tweetId!, "replies"]
  );

  const dataArr = useMemo(() => {
    if (!replies?.pages[0]) return [];
    return replies?.pages.flat() || [];
  }, [replies]);

  useEffect(() => {
    if (!token) return;
    refetch();
  }, [token]);

  const {
    data: tweetData,
    isError,
    isLoading,
    isFetched,
  } = useQuery<{ tweet: TweetWithReplyAndRetweet }>({
    queryKey: ["tweet", tweetId],
    queryFn: () => getTweetById(tweetId!, token!),
    enabled: !!user && !!tweetId,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (tweetData?.tweet.retweetedTweet){
      setTweetWithRepliesId(tweetData?.tweet.retweetedTweet.id);
    }
  }, [tweetData]);

  if (isError) {
    return <div className="text-center">Sorry this tweet might not exist</div>;
  }

  if (isLoading || !tweetData || !isFetched || !user) {
    return (
      <div className={`flex items-center justify-center ${compact?'ml-5':'ml-72'} mt-5`}>
        <Spinner />
      </div>
    );
  }

  return (
    <div className="max-w-[600px] w-full h-full flex-grow border-r border-primary border-opacity-30 max-sm:w-[280px] ">
      <div className="flex flex-col  w-full sticky bg-opacity-60 backdrop-blur-xl top-0 bg-black  z-50 ">
       {!compact&& <div className="flex p-2 gap-8 items-center mb-4">
          <ArrowLeft
            className="cursor-pointer bg-transparent p-1 rounded-full transition-all hover:bg-primary hover:bg-opacity-20 w-8 h-8"
            onClick={() => navigate(-1)}
          />
          <h2 className="text-xl font-bold">Post</h2>
        </div>}
      </div>
      <TweetComponent tweet={tweetData.tweet} mode="page" size={compact?"compact":"normal"}  />
      <TweetsList
        fetcherRef={ref}
        data={dataArr}
        isFetching={isFetching}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
      />
    </div>
  );
};
export default TweetDetails;
