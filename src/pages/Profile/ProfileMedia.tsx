import TweetsList from "@/components/TweetsList/TweetsList";
import { UserContext } from "@/contexts/UserContextProvider";
import { useInfiniteScroll } from "@/lib/useInfiniteScroll";
import { profileMedia } from "@/lib/utils";
import { useContext, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

export const ProfileMedia = () => {
  const { username } = useParams();
  const { token } = useContext(UserContext);

  const { ref, data, refetch, isFetching, isFetchingNextPage, hasNextPage } =
    useInfiniteScroll(
      async ({ pageParam }) => {
        return await profileMedia(pageParam, 10, username!, token!);
      },
      ["tweets", "profile", "media", username!]
    );

  useEffect(() => {
    if (!token) return;
    refetch();
  }, [token, refetch]);

  const dataArr = useMemo(() => {
    return data?.pages.flat() || [];
  }, [data]);

  return (
    <>
      <div></div>
      <TweetsList
        data={dataArr}
        fetcherRef={ref}
        isFetching={isFetching}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
      />
    </>
  );
};
