import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

/*
NEEDED:
  loading state & error
*/

export const useInfiniteScroll = (
  fetchFunction: ({ pageParam }: { pageParam: number }) => Promise<any>,
  queryKey: string[]
) => {
  const { ref, inView } = useInView();

  const {
    data,
    error,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: queryKey,
    queryFn: fetchFunction,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length + 1;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return { data, ref, isFetchingNextPage, error, isError };
};
