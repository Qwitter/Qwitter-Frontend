import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useState } from "react";
import "../../index.css";
import { UsersList } from "../UsersList/UsersList";
import { GetFollowersService, GetFollowingsService } from "@/lib/utils";
import { BlockButton } from "../BlockButton/BlockButton";
export function FollowList() {
  const [Liststate, setListstate] = useState("Following");
  return (
    <>
      <Tabs defaultValue={Liststate} className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            className="flex justify-center tabhover"
            value="Following"
            onClick={() => setListstate("Following")}
          >
            <div className={Liststate == "Following" ? "active-tab" : "tab"}>
              Following
            </div>
          </TabsTrigger>
          <TabsTrigger
            className="flex justify-center tabhover"
            value="Followers"
            onClick={() => setListstate("Followers")}
          >
            <div className={Liststate == "Followers" ? "active-tab" : "tab"}>
              Followers
            </div>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Following">
          <UsersList
            listType={"FollowList"}
            showDesc={true}
            getusers={GetFollowingsService}
          />
          <BlockButton isBlocked={false} username="yousefjoo" />
        </TabsContent>
        <TabsContent value="Followers">
          <UsersList
            listType={"FollowList"}
            showDesc={true}
            getusers={GetFollowersService}
          />
        </TabsContent>
      </Tabs>
    </>
  );
}
