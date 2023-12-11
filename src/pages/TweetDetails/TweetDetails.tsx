import { Spinner } from "@/components/Spinner";
import { default as TweetComponent } from "@/components/Tweet/Tweet";
import { UserContext } from "@/contexts/UserContextProvider";
import { getTweetById } from "@/lib/utils";
import { Tweet } from "@/models/Tweet";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

const TweetDetails = () => {
  const { tweetId } = useParams<{ tweetId: string }>();
  const { user, token } = useContext(UserContext);

  const {
    data: tweetData,
    isError,
    isLoading,
    isFetched,
  } = useQuery<{ tweet: Tweet }>({
    queryKey: ["tweet", tweetId],
    queryFn: () => getTweetById(tweetId!, token!),
    enabled: !!user && !!tweetId,
  });

  useEffect(() => {
    console.log(tweetData)
  }, [tweetData]);

  if (isError) {
    return <div className="text-center">Sorry this tweet might not exist</div>;
  }

  if (isLoading || !tweetData || !isFetched || !user) {
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return <TweetComponent tweet={tweetData.tweet} />;
};
export default TweetDetails;
