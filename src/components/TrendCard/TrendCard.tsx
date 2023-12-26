import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendList } from "../TrendList/TrendList";
import { useNavigate } from "react-router-dom";
import { UserContext } from "@/contexts/UserContextProvider";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { Trend } from "@/models/Trend";
import { GetTrendsService } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

export function TrendCard() {
  const navigate = useNavigate();
  const { token } = useContext(UserContext);
  const { data: Trends } = useQuery<Trend[]>({
    queryKey: ["Trends", token],
    queryFn: () => GetTrendsService(token!),
    select: (data) => data.slice(0, 3),
  });
  return (
    <>
      {Trends ? (
        <Card className="bg-[#16181c] w-full  border-none">
          <CardHeader className=" h-[50px] mb-1 flex justify-center items-start">
            <CardTitle className="text-xl font-bold ">
              What’s happening
            </CardTitle>
          </CardHeader>
          <TrendList Trends={Trends!} />
          <CardFooter className="hover:cursor-pointer mt-3 pt-3 hover:bg-light-gray rounded-br-lg rounded-bl-lg"
            onClick={() => {
              navigate("/Explore");
            }}
          >
            <span
              className="text-secondary"
            
              data-testid="showMoreTrends"
            >
              show more
            </span>
          </CardFooter>
        </Card>
      ) : (
        <Skeleton className="w-full h-[400px] rounded-lg" />
      )}
    </>
  );
}
