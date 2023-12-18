import TweetsList from "@/components/TweetsList/TweetsList";
import { UserContext } from "@/contexts/UserContextProvider";
import { useInfiniteScroll } from "@/lib/useInfiniteScroll";
import { timelineTweets } from "@/lib/utils";
import { useContext, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export function ExploreSearchTop() {
  const { token } = useContext(UserContext);
  const [SearchParams] = useSearchParams();
  const { data, ref, hasMoreData } = useInfiniteScroll(
    async ({ pageParam }) => {
      return await timelineTweets(
        pageParam,
        10,
        token!,
        SearchParams.get("q")!
      );
    },
    ["tweets", "timeline"]
  );
  const dataArr = useMemo(() => {
    return data?.pages.flat() || [];
  }, [data]);
  return (
    <>
      <TweetsList fetcherRef={ref} data={dataArr} hasMoreData={hasMoreData} />
    </>
  );
}
