import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useState } from "react";
import "../../index.css";
export function FollowList() {
  const [Liststate, setListstate] = useState("Following");
  return (
    <>
      <Tabs defaultValue="Following" className="w-[400px] ">
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
        <TabsContent value="Following">yousef</TabsContent>
        <TabsContent value="Followers">osama</TabsContent>
      </Tabs>
    </>
  );
}
