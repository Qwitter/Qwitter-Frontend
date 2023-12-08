import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { GetFollowSuggestionsService } from "@/lib/utils";
import { UsersList } from "../UsersList/UsersList";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContextProvider";

const GetFollowSuggestions = async (token: string) => {
  const res = await GetFollowSuggestionsService(token);
  return res;
};
export function FollowCard() {
  const { token } = useContext(UserContext);
  const { data, status } = useQuery({
    queryKey: ["followSuggestions"],
    queryFn: token ? () => GetFollowSuggestions(token!) : undefined,
  });
  console.log(data, status);
  return (
    <Card className="w-full bg-[#16181c] border-none">
      <CardHeader className=" h-[50px] mb-1 flex justify-center items-start">
        <CardTitle className="text-xl font-bold ">Who to follow</CardTitle>
      </CardHeader>
      <UsersList
        listType={"FollowList"}
        showDesc={false}
        getusers={GetFollowSuggestionsService}
        isCard={true}
      />
      <CardFooter className="hover:cursor-pointer mt-3 pt-3 hover:bg-light-gray rounded-br-lg rounded-bl-lg">
        <span className="text-secondary">show more</span>
      </CardFooter>
    </Card>
  );
}
