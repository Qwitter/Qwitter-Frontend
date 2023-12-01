import { Trend } from "@/models/Trend";
import { CardContent } from "../ui/card";
import { useMutation } from "@tanstack/react-query";
import { GetTrendsService } from "@/lib/utils";
import { useEffect, useState } from "react";

export function TrendList() {
  const [trends, setTrends] = useState<Trend[]>([]);
  const {
    mutateAsync: gettrendsFn,
    // isPending: FollowSuggestionsServicePending,
  } = useMutation({
    mutationFn: GetTrendsService,
  });
  useEffect(() => {
    (async () => {
      const trends: Trend[] = await gettrendsFn();
      setTrends(trends);
    })();
  }, []);
  return (
    <>
      {trends.map((trend: Trend, index) => (
        <CardContent
          key={index}
          className="hover:cursor-pointer py-3 hover:bg-light-gray"
        >
          <div className="text-[#595d62] my-1">
            Trending in {trend.location}
          </div>
          <div className="text-white font-bold text-base">{trend.trend}</div>
          <div className="text-[#595d62] ">{trend.count} posts</div>
        </CardContent>
      ))}
    </>
  );
}
