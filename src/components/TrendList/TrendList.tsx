import { Trend } from "@/models/Trend";
import { CardContent } from "../ui/card";
import { useMutation } from "@tanstack/react-query";
import { GetTrendsService } from "@/lib/utils";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/UserContextProvider";

export function TrendList() {
  const [trends, setTrends] = useState<Trend[]>([]);
  const { token } = useContext(UserContext);
  const {
    mutateAsync: gettrendsFn,
    // isPending: FollowSuggestionsServicePending,
  } = useMutation({
    mutationFn: token ? () => GetTrendsService(token) : undefined,
    // mutationFn: GetTrendsService,
  });
  useEffect(() => {
    (async () => {
      const trends: Trend[] = await gettrendsFn();
      // setUsers(trends.slice(0, 3));
      // debugger;
      console.log(trends);
      setTrends(trends.slice(0, 3));
    })();
  }, [trends]);
  return (
    <>
      {trends &&
        trends.map((trend: Trend, index) => (
          <CardContent
            key={index}
            className="hover:cursor-pointer py-3 hover:bg-light-gray"
          >
            <div className="text-[#595d62] my-1 font-normal text-sm">
              Trending in {trend.location || "Egypt"}
            </div>
            <div className="text-white font-bold text-base">{trend.trend}</div>
            <div className="text-[#595d62] font-normal text-sm">
              {trend.count} posts
            </div>
          </CardContent>
        ))}
    </>
  );
}
