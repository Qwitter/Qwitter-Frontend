import { Trend } from "@/models/Trend";
import { CardContent } from "../ui/card";
import { TrendsListProp } from "./TrendListProp";

export function TrendList({ Trends }: TrendsListProp) {
  return (
    <>
      {Trends &&
        Trends.map((trend: Trend, index) => (
          <CardContent
            key={index}
            className="hover:cursor-pointer py-3 hover:bg-light-gray"
            data-testid="trend"
          >
            <div className="text-[#595d62] my-1 font-normal text-sm">
              Trending in {trend.location || "Egypt"}
            </div>
            <div className="text-white font-bold text-base" data-testid="trendName">{trend.trend}</div>
            <div className="text-[#595d62] font-normal text-sm" data-testid="postsCount">
              {trend.count} posts
            </div>
          </CardContent>
        ))}
    </>
  );
}
