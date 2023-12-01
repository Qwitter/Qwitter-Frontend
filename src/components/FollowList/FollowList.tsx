import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useState } from "react";
import "../../index.css";
import { UsersList } from "../UsersList/UsersList";
import { GetFollowersService } from "@/lib/utils";
export function FollowList() {
  const [Liststate, setListstate] = useState("Followers");
  return (
    <>
      <Tabs defaultValue="Followers" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            className={Liststate == "Following" ? "active-tab" : "tab"}
            value="Following"
            onClick={() => setListstate("Following")}
          >
            Following
          </TabsTrigger>
          <TabsTrigger
            className={Liststate == "Followers" ? "active-tab" : "tab"}
            value="Followers"
            onClick={() => setListstate("Followers")}
          >
            Followers
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Following"></TabsContent>
        <TabsContent value="Followers">
          <UsersList showDesc={true} getusers={GetFollowersService} />
        </TabsContent>
      </Tabs>
    </>
  );
}
