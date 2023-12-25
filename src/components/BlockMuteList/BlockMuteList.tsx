import { GetBlockedService, GetMutedService } from "@/lib/utils";
import { OptionsHeader } from "../OptionsHeader/OptionsHeader";
import { UsersList } from "../UsersList/UsersList";
import { BlockMuteListProps } from "./BlockMuteListProps";
import { UserContext } from "@/contexts/UserContextProvider";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/models/User";
import { Spinner } from "../Spinner";

export function BlockMuteList({ headername, service }: BlockMuteListProps) {
  const { token } = useContext(UserContext);
  const { data: Blocked } = useQuery<User[]>({
    queryKey: ["Blocked", token],
    queryFn: () => GetBlockedService(token!),
  });
  const { data: Muted } = useQuery<User[]>({
    queryKey: ["Muted", token],
    queryFn: () => GetMutedService(token!),
  });
  return (
    <>
      <div data-testid="muteList" className=" w-full h-full border-r border-primary border-opacity-30 mb-20">
        <OptionsHeader header={headername} />
        {Blocked && Muted ? (
          <UsersList
            listType={service == "BlockList" ? "BlockList" : "MuteList"}
            showDesc={true}
            users={service == "BlockList" ? Blocked! : Muted!}
          />
        ) : (
          <div className="mx-auto">
            <Spinner />
          </div>
        )}
      </div>
    </>
  );
}
