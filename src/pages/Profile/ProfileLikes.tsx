import TweetsList from "@/components/TweetsList/TweetsList";
import { UserContext } from "@/contexts/UserContextProvider";
import { useInfiniteScroll } from "@/lib/useInfiniteScroll";
import { profileLikes } from "@/lib/utils";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

export const ProfileLikes = () => {
  const { username } = useParams();
  const { token } = useContext(UserContext);

  const { ref, data, refetch } = useInfiniteScroll(
    async ({ pageParam }) => {
      return await profileLikes(pageParam, 10, username!, token!);
    },
    ["tweets", "profile", "likes", username!]
  );

  useEffect(() => {
    if (!token) return;
    refetch();
  }, [token, refetch]);

  return <TweetsList pages={data?.pages || [[]]} fetcherRef={ref} />;
};
