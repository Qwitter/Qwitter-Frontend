import { UserContext } from "@/contexts/UserContextProvider";
import { GetFollowSuggestionsService } from "@/lib/utils";
import { User } from "@/models/User";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { UsersList } from "../UsersList/UsersList";
import { OptionsHeader } from "../OptionsHeader/OptionsHeader";
import { Spinner } from "../Spinner";

export default function ConnectionList() {
  const { token } = useContext(UserContext);
  const { data: FollowSuggestions } = useQuery<User[]>({
    queryKey: ["followSuggestions", token],
    queryFn: () => GetFollowSuggestionsService(token!),
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="max-w-[600px] w-full h-full flex-grow border-r border-primary border-opacity-30">
      <OptionsHeader header="Connection" />
      <div className="border-b border-primary border-opacity-30"></div>
      {FollowSuggestions ? (
        <UsersList
          listType={"FollowList"}
          showDesc={true}
          users={FollowSuggestions!}
        />
      ) : (
        <div className="mx-auto">
          <Spinner />
        </div>
      )}
    </div>
  );
}
