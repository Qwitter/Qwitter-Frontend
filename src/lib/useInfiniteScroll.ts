import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
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
  const { ref, inView } = useInView();

  const {
    data,
    error,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isFetching,
  } = useInfiniteQuery({
    queryKey: queryKey,
    queryFn: fetchFunction,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      console.log(lastPage, allPages)
      if (lastPage && lastPage.length > 0) return allPages.length + 1;
      return null;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return {
    data,
    ref,
    isFetchingNextPage,
    error,
    isError,
    refetch,
    hasNextPage,
    isFetching,
  };
};
