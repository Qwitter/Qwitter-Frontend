import { Trend } from "@/models/Trend";
import { TrendList } from "../TrendList/TrendList";
import { GetTrendsService } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContextProvider";
import { Spinner } from "../Spinner";

export function ExploreList() {
  const { token } = useContext(UserContext);
  const { data: Trends } = useQuery<Trend[]>({
    queryKey: ["Trends", token],
    queryFn: () => GetTrendsService(token!),
  });
  return (
    <>
      <div className="max-w-[600px] w-full h-full flex-grow border-r border-primary border-opacity-30 ">
        {Trends ? (
          <TrendList Trends={Trends!} />
        ) : (
          <div className="mx-auto">
            <Spinner />
          </div>
        )}
      </div>
    </>
  );
}
