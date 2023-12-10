import { type Tweet } from "@/models/Tweet";
import { default as TweetComponent } from "../Tweet/Tweet";
import { Spinner } from "../Spinner";

type TweetsListProps = {
  pages: Tweet[][];
  fetcherRef?: (node?: Element | null | undefined) => void;
};

/*
NEEDED:
  loading state & error
*/

const TweetsList = ({ pages, fetcherRef }: TweetsListProps) => {
  if (!pages || pages.length === 0) {
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
      {pages.map((page, i) =>
        page.map((tweet: Tweet, j) => (
          <>
            <TweetComponent
              tweet={tweet}
              key={tweet.id + Math.floor(Math.random() * 50000)} // for mock server only
            />
            {i === pages.length - 1 && j === page.length - 1 && (
              <div className="py-10">
                <div ref={fetcherRef}></div>
                <Spinner />
              </div>
            )}
          </>
        ))
      )}
    </div>
  );
};

export default TweetsList;
