import { TweetWithRetweet } from "@/models/Tweet";
import { default as TweetComponent } from "../Tweet/Tweet";
import { Spinner } from "../Spinner";
import { useEffect } from "react";

type TweetsListProps = {
  data: TweetWithRetweet[];
  fetcherRef?: (node?: Element | null | undefined) => void;
  hasMoreData?: boolean;
  childOnEnd?: React.ReactNode;
};

/*
NEEDED:
  loading state & error
*/

const TweetsList = ({
  data,
  fetcherRef,
  hasMoreData,
  childOnEnd,
}: TweetsListProps) => {
  useEffect(() => {
    console.log(data);
  }, [data]);

  if (!data || data.length === 0) {
    return (
      <div className="mt-52">
        <Spinner />
      </div>
    );
  }

  return (
    <div
      className="max-w-[600px] mx-auto border-primary border-opacity-30 border-t"
      data-testid="Tweet"
    >
      {data.map((tweet, i) => (
        <>
          <TweetComponent
            tweet={tweet}
            key={tweet.id}
            // key={tweet.id + Math.floor(Math.random() * 50000)} // for mock server only
          />
          {hasMoreData && i === data.length - 1 && (
            <div className="py-10">
              <div ref={fetcherRef}></div>
              <Spinner />
            </div>
          )}
          {!hasMoreData && childOnEnd}
        </>
      ))}
    </div>
  );
};

export default TweetsList;
