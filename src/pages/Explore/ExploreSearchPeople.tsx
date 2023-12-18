import { Spinner } from "@/components/Spinner";
import { UsersList } from "@/components/UsersList/UsersList";
import { UserContext } from "@/contexts/UserContextProvider";
import { getUsersSuggestions } from "@/lib/utils";
import { User } from "@/models/User";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useSearchParams } from "react-router-dom";

export function ExploreSearchPeople() {
  const { token } = useContext(UserContext);
  const [searchParams] = useSearchParams();
  const { data: ExploreSearchPeopleResult } = useQuery<User[]>({
    queryKey: ["ExploreSearchPeopleResult", searchParams.get("q"), token],
    queryFn: () => getUsersSuggestions(token!, searchParams.get("q")!),
  });
  return (
    <>
      {ExploreSearchPeopleResult ? (
        <UsersList
          listType={"FollowList"}
          showDesc={true}
          users={ExploreSearchPeopleResult!}
        />
      ) : (
        <div className="mx-auto">
          <Spinner />
        </div>
      )}
    </>
  );
}
