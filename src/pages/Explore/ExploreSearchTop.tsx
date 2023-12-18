import TweetsList from "@/components/TweetsList/TweetsList";
import { UserContext } from "@/contexts/UserContextProvider";
import { useInfiniteScroll } from "@/lib/useInfiniteScroll";
import { timelineTweets } from "@/lib/utils";
import { useContext, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export function ExploreSearchTop() {
  const { token } = useContext(UserContext);
  const [SearchParams] = useSearchParams();
  const { data, ref, isFetching, isFetchingNextPage, hasNextPage } =
    useInfiniteScroll(
      async ({ pageParam }) => {
        return await timelineTweets(
          pageParam,
          10,
          token!,
          SearchParams.get("q")!
        );
      },
      ["searchTweets", token!, SearchParams.get("q")!]
    );
  const dataArr = useMemo(() => {
    return data?.pages.flat() || [];
  }, [data]);
  return (
    <>
      <TweetsList
        fetcherRef={ref}
        data={dataArr}
        isFetching={isFetching}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
      />
    </>
  );
}
