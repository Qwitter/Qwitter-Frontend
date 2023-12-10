import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { GetFollowSuggestionsService } from "@/lib/utils";
import { UsersList } from "../UsersList/UsersList";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { UserContext } from "@/contexts/UserContextProvider";
import { User } from "@/models/User";
import { Skeleton } from "../ui/skeleton";

export function FollowCard() {
  const { token } = useContext(UserContext);
  const {
    data: FollowSuggestions,
    refetch: refetchFollowSuggestions,
  } = useQuery<User[]>({
    queryKey: ["followSuggestions"],
    queryFn: () => GetFollowSuggestionsService(token!),
    select: (data) => data?.slice(0, 3),
  });
  useEffect(() => {
    refetchFollowSuggestions();
  }, [token, refetchFollowSuggestions]);
  return (
    <>
      {FollowSuggestions ? (
        <Card className="w-full bg-[#16181c] border-none">
          <CardHeader className=" h-[50px] mb-1 flex justify-center items-start">
            <CardTitle className="text-xl font-bold ">Who to follow</CardTitle>
          </CardHeader>

          <UsersList
            listType={"FollowList"}
            showDesc={false}
            users={FollowSuggestions!}
          />

          <CardFooter className="hover:cursor-pointer mt-3 pt-3 hover:bg-light-gray rounded-br-lg rounded-bl-lg">
            <span className="text-secondary">show more</span>
          </CardFooter>
        </Card>
      ) : (
        <Skeleton className="w-full h-[400px] rounded-lg" />
      )}
    </>
  );
}
