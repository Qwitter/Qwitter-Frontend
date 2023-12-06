import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useState } from "react";
import "../../index.css";
import { UsersList } from "../UsersList/UsersList";
import {
  GetBlockedService,
  GetFollowersService,
  GetFollowingsService,
  GetMutedService,
} from "@/lib/utils";
import { useNavigate } from "react-router-dom";
export function FollowList({ type }: { type: string }) {
  const [Liststate, setListstate] = useState(type);
  const navigate = useNavigate();
  return (
    <>
      <Tabs defaultValue={Liststate} className="max-w-[600px] w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            className="flex justify-center tabhover"
            value="Following"
            onClick={() => {
              setListstate("Following");
              navigate("/Following");
            }}
          >
            <div className={Liststate == "Following" ? "active-tab" : "tab"}>
              Following
            </div>
          </TabsTrigger>
          <TabsTrigger
            className="flex justify-center tabhover"
            value="Followers"
            onClick={() => {
              setListstate("Followers");
              navigate("/Followers");
            }}
          >
            <div className={Liststate == "Followers" ? "active-tab" : "tab"}>
              Followers
            </div>
          </TabsTrigger>
          <TabsTrigger
            className="flex justify-center tabhover"
            value="Muted"
            onClick={() => {
              setListstate("Muted");
              navigate("/Muted");
            }}
          >
            <div className={Liststate == "Muted" ? "active-tab" : "tab"}>
              Muted
            </div>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Following">
          <UsersList
            listType={"FollowList"}
            showDesc={true}
            getusers={GetFollowingsService}
            isCard={false}
          />
        </TabsContent>
        <TabsContent value="Followers">
          <UsersList
            listType={"FollowList"}
            showDesc={true}
            getusers={GetFollowersService}
            isCard={false}
          />
        </TabsContent>
        <TabsContent value="Muted">
          <UsersList
            listType={"MuteList"}
            showDesc={true}
            getusers={GetMutedService}
            isCard={false}
          />
        </TabsContent>
      </Tabs>
    </>
  );
}
