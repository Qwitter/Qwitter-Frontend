import { GetBlockedService, GetMutedService } from "@/lib/utils";
import { OptionsHeader } from "../OptionsHeader/OptionsHeader";
import { UsersList } from "../UsersList/UsersList";
import { BlockMuteListProps } from "./BlockMuteListProps";
import { UserContext } from "@/contexts/UserContextProvider";
import { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/models/User";

export function BlockMuteList({ headername, service }: BlockMuteListProps) {
  const { token } = useContext(UserContext);
  const {
    data: Blocked,
    refetch: refetchBlocked,
    isLoading: isBlockedLoading,
    isSuccess: isBlockedSuccess,
  } = useQuery<User[]>({
    queryKey: ["Blocked"],
    queryFn: () => GetBlockedService(token!),
  });
  const {
    data: Muted,
    refetch: refetchMuted,
    isLoading: isMutedLoading,
    isSuccess: isMutedSuccess,
  } = useQuery<User[]>({
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
        {(isBlockedSuccess || isMutedSuccess) && (
          <UsersList
            listType={service == "BlockList" ? "BlockList" : "MuteList"}
            showDesc={true}
            users={service == "BlockList" ? Blocked! : Muted!}
          />
        )}
        {(isBlockedLoading || isMutedLoading) && <div>loading...</div>}
      </div>
    </>
  );
}
