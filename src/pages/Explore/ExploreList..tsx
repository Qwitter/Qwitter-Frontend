import { Trend } from "@/models/Trend";
import { TrendList } from "../../components/TrendList/TrendList";
import { GetTrendsService } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { UserContext } from "@/contexts/UserContextProvider";
import { Spinner } from "../../components/Spinner";
import SearchInput from "../../components/SearchInput/SearchInput";

export function ExploreList() {
  const { token } = useContext(UserContext);
  const { data: Trends } = useQuery<Trend[]>({
    queryKey: ["Trends", token],
    queryFn: () => GetTrendsService(token!),
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="max-w-[600px] w-full h-full flex-grow border-r border-primary border-opacity-30 ">
      <div className="sticky top-0 z-50 backdrop-blur-sm ">
        <div className="w-[90%] mx-auto ">
          <SearchInput isSearchPage />
        </div>
        <div className="border-b  border-primary border-opacity-30"></div>
      </div>
      {Trends ? (
        <TrendList Trends={Trends!} />
      ) : (
        <div className="mx-auto">
          <Spinner />
        </div>
      )}
    </div>
  );
}
