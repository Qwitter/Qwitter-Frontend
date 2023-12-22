import { TweetWithRetweet } from "@/models/Tweet";
import { default as TweetComponent } from "../Tweet/Tweet";
import { Spinner } from "../Spinner";

type TweetsListProps = {
  data: TweetWithRetweet[];
  fetcherRef?: (node?: Element | null | undefined) => void;
  childOnEnd?: React.ReactNode;
  isFetchingNextPage?: boolean;
  isFetching?: boolean;
  hasNextPage?: boolean;
};

const TweetsList = ({
  data,
  fetcherRef,
  childOnEnd,
  isFetchingNextPage,
  isFetching,
  hasNextPage,
}: TweetsListProps) => {


  if ((!data || data.length === 0) && isFetching) {
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
          {(hasNextPage || isFetchingNextPage) && i === data.length - 1 && (
            <div className="py-10">
              <div ref={fetcherRef}></div>
              <Spinner />
            </div>
          )}
          {!hasNextPage && !isFetchingNextPage && childOnEnd}
        </>
      ))}
    </div>
  );
};

export default TweetsList;
