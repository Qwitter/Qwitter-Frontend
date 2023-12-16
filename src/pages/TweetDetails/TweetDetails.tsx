import { Spinner } from "@/components/Spinner";
import { default as TweetComponent } from "@/components/Tweet/Tweet";
import TweetsList from "@/components/TweetsList/TweetsList";
import { UserContext } from "@/contexts/UserContextProvider";
import { useInfiniteScroll } from "@/lib/useInfiniteScroll";
import { getTweetById, getTweetReplies } from "@/lib/utils";
import { TweetWithRetweet } from "@/models/Tweet";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useContext, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TweetDetails = () => {
  const { tweetId } = useParams<{ tweetId: string }>();
  const { user, token } = useContext(UserContext);
  const navigate = useNavigate();
  const {
    data: replies,
    ref,
    refetch,
    hasMoreData,
  } = useInfiniteScroll(
    async ({ pageParam }) => {
      return await getTweetReplies(tweetId!, token!, pageParam, 10);
    },
    ["tweet", tweetId!, "replies"]
  );

  const dataArr = useMemo(() => {
    console.log(replies?.pages.flat());
    return replies?.pages.flat() || [];
  }, [replies]);

  useEffect(() => {
    if (!token) return;
    refetch();
    // console.log(data);
  }, [token]);

  const {
    data: tweetData,
    isError,
    isLoading,
    isFetched,
  } = useQuery<{ tweet: TweetWithRetweet }>({
    queryKey: ["tweet", tweetId],
    queryFn: () => getTweetById(tweetId!, token!),
    enabled: !!user && !!tweetId,
  });

  useEffect(() => {
    console.log(tweetData);
  }, [tweetData]);

  if (isError) {
    return <div className="text-center">Sorry this tweet might not exist</div>;
  }

  if (isLoading || !tweetData || !isFetched || !user) {
    return (
      <div className="flex items-center justify-center ml-72">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="max-w-[600px] w-full h-full flex-grow border-r border-primary border-opacity-30 ">
      <div className="flex flex-col  w-full sticky bg-opacity-60 backdrop-blur-xl top-0 bg-black  z-50 ">

        <div className="flex p-2 gap-8 items-center mb-4">
          <ArrowLeft
            className="cursor-pointer bg-transparent p-1 rounded-full transition-all hover:bg-primary hover:bg-opacity-20 w-8 h-8"
            onClick={() => navigate(-1)}
          />
          <h2 className="text-xl font-bold">Post</h2>
        </div>
      </div>
      <TweetComponent tweet={tweetData.tweet} mode="page"/>
      <TweetsList fetcherRef={ref} data={dataArr} hasMoreData={hasMoreData} />
    </div>
  );
};
export default TweetDetails;
