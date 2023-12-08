import { Trend } from "@/models/Trend";
import { CardContent } from "../ui/card";
import { useQuery } from "@tanstack/react-query";
import { GetTrendsService } from "@/lib/utils";
import { useContext, useEffect } from "react";
import { UserContext } from "@/contexts/UserContextProvider";
import { TrendsListProp } from "./TrendListProp";

export function TrendList({ isCard }: TrendsListProp) {
  const { token } = useContext(UserContext);
  const { data: Trends, refetch: refetchTrends } = useQuery<Trend[]>({
    queryKey: ["Trends"],
    queryFn: () => GetTrendsService(token!),
    select: (data) => (isCard ? data.slice(0, 3) : data),
  });
  useEffect(() => {
    refetchTrends();
    console.log(Trends);
  }, [token]);
  return (
    <>
      {Trends &&
        Trends.map((trend: Trend, index) => (
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
