import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

/*
NEEDED:
  loading state & error
*/

export const useInfiniteScroll = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchFunction: ({ pageParam }: { pageParam: number }) => Promise<any>,
  queryKey: string[]
) => {
  const [hasMoreData, setHasMoreData] = useState(false);
  const { ref, inView } = useInView();

  const {
    data,
    error,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: queryKey,
    queryFn: fetchFunction,
    initialPageParam: 1,
    getNextPageParam: (_, allPages) => {
      return allPages.length + 1;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (!isFetchingNextPage && !hasNextPage) setHasMoreData(false);
    else setHasMoreData(true);
  }, [isFetchingNextPage, hasNextPage, setHasMoreData]);

  return {
    data,
    ref,
    isFetchingNextPage,
    error,
    isError,
    refetch,
    hasMoreData,
    hasNextPage,
  };
};
