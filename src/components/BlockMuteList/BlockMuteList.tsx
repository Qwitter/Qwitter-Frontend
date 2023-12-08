import { GetBlockedService, GetMutedService } from "@/lib/utils";
import { OptionsHeader } from "../OptionsHeader/OptionsHeader";
import { UsersList } from "../UsersList/UsersList";
import { BlockMuteListProps } from "./BlockMuteListProps";

export function BlockMuteList({ headername, service }: BlockMuteListProps) {
  return (
    <>
      <div className=" w-full h-full border-r border-primary border-opacity-30 mb-20">
        <OptionsHeader header={headername} />
        <UsersList
          listType={service == "BlockList" ? "BlockList" : "MuteList"}
          showDesc={true}
          getusers={
            service == "BlockList" ? GetBlockedService : GetMutedService
          }
          isCard={false}
        />
      </div>
    </>
  );
}
