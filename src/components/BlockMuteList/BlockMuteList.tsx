import { GetBlockedService, GetMutedService } from "@/lib/utils";
import { OptionsHeader } from "../OptionsHeader/OptionsHeader";
import { UsersList } from "../UsersList/UsersList";
import { BlockMuteListProps } from "./BlockMuteListProps";
import { UserContext } from "@/contexts/UserContextProvider";
import { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/models/User";
import { Skeleton } from "../ui/skeleton";

export function BlockMuteList({ headername, service }: BlockMuteListProps) {
  const { token } = useContext(UserContext);
  const { data: Blocked, refetch: refetchBlocked } = useQuery<User[]>({
    queryKey: ["Blocked"],
    queryFn: () => GetBlockedService(token!),
  });
  const { data: Muted, refetch: refetchMuted } = useQuery<User[]>({
    queryKey: ["Muted"],
    queryFn: () => GetMutedService(token!),
  });
  useEffect(() => {
    refetchBlocked();
    refetchMuted();
  }, [token, refetchBlocked, refetchMuted]);
  return (
    <>
      <div className=" w-full h-full border-r border-primary border-opacity-30 mb-20">
        <OptionsHeader header={headername} />
        {Blocked && Muted ? (
          <UsersList
            listType={service == "BlockList" ? "BlockList" : "MuteList"}
            showDesc={true}
            users={service == "BlockList" ? Blocked! : Muted!}
          />
        ) : (
          <Skeleton className="w-full  h-full " />
        )}
      </div>
    </>
  );
}
