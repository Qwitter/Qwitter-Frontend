import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { GetFollowSuggestionsService } from "@/lib/utils";
import { UsersList } from "../UsersList/UsersList";

export function FollowCard() {
  return (
    <Card className="w-[350px] bg-[#16181c]  absolute left-96 top-64 border-none">
      <CardHeader className=" h-[50px] mb-1 flex justify-center items-start">
        <CardTitle className="text-xl font-bold ">Who to follow</CardTitle>
      </CardHeader>
      <UsersList showDesc={false} getusers={GetFollowSuggestionsService} />
      <CardFooter className="hover:cursor-pointer mt-3">
        <span className="text-secondary">show more</span>
      </CardFooter>
    </Card>
  );
}
