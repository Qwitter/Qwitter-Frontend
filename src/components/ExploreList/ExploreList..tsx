import { Trend } from "@/models/Trend";
import { TrendList } from "../TrendList/TrendList";
import { GetTrendsService } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { UserContext } from "@/contexts/UserContextProvider";

export function ExploreList() {
  const { token } = useContext(UserContext);
  const { data: Trends, refetch: refetchTrends } = useQuery<Trend[]>({
    queryKey: ["Trends"],
    queryFn: () => GetTrendsService(token!),
  });
  useEffect(() => {
    refetchTrends();
  }, [token, refetchTrends]);
  return (
    <>
      <div className="max-w-[600px] w-full h-full flex-grow border-r border-primary border-opacity-30 ">
        <TrendList Trends={Trends!} />
      </div>
    </>
  );
}
