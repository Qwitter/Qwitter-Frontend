import TweetsList from "@/components/TweetsList/TweetsList";
import { UserContext } from "@/contexts/UserContextProvider";
import { useInfiniteScroll } from "@/lib/useInfiniteScroll";
import { profileReplies } from "@/lib/utils";
import { useContext, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

export const ProfileReplies = () => {
  const { username } = useParams();
  const { token } = useContext(UserContext);

  const { ref, data, refetch, hasMoreData } = useInfiniteScroll(
    async ({ pageParam }) => {
      return await profileReplies(pageParam, 10, username!, token!);
    },
    ["tweets", "profile", "replies", username!]
  );

  useEffect(() => {
    if (!token) return;
    refetch();
  }, [token, refetch]);

  const dataArr = useMemo(() => {
    // console.log(data?.pages.flat());
    return data?.pages.flat() || [];
  }, [data]);

  return (
    <TweetsList data={dataArr} fetcherRef={ref} hasMoreData={hasMoreData} />
  );
};
