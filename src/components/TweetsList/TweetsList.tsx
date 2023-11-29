import { type Tweet } from "@/models/Tweet";
import { default as TweetComponent } from "../Tweet/Tweet";
import { useInfiniteScroll } from "@/lib/useInfiniteScroll";
import { timelineTweets } from "@/lib/utils";

type TweetsListProps = {
  tweets?: Tweet[];
};

/*
NEEDED:
  loading state & error
*/

const TweetsList = ({ tweets }: TweetsListProps) => {
  const { data, ref } = useInfiniteScroll(
    async ({ pageParam }) => {
      return await timelineTweets(pageParam, 10, "123456"); // "123456" should be replaced with token
    },
    ["tweets", "timeline"]
  );

  return (
    <div className="max-w-[600px] mx-auto border-primary border-opacity-30 border-t">
      {data?.pages.map((page) =>
        page.map((tweet: Tweet) => (
          <TweetComponent
            tweet={tweet}
            key={tweet.id + Math.floor(Math.random() * 50000)} // for mockserver only
          />
        ))
      )}
      <div ref={ref}></div>
    </div>
  );
};

export default TweetsList;
