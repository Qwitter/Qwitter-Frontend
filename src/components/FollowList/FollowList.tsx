import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useContext, useEffect, useState } from "react";
import "../../index.css";
import { UsersList } from "../UsersList/UsersList";
import { GetFollowersService, GetFollowingsService } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { UserContext } from "@/contexts/UserContextProvider";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/models/User";
import { Skeleton } from "../ui/skeleton";

export function FollowList({ type }: { type: string }) {
  const { token, user } = useContext(UserContext);
  const { data: Followings, refetch: refetchFollowings } = useQuery<User[]>({
    queryKey: ["followings"],
    queryFn: () => GetFollowingsService(user?.userName!, token!),
  });
  const { data: Followers, refetch: refetchFollowers } = useQuery<User[]>({
    queryKey: ["followers"],
    queryFn: () => GetFollowersService(user?.userName!, token!),
  });
  useEffect(() => {
    refetchFollowings();
    refetchFollowers();
  }, [token, refetchFollowers, refetchFollowings]);
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
        </TabsList>
        <TabsContent value="Following">
          {Followings ? (
            <UsersList
              listType={"FollowList"}
              showDesc={true}
              users={Followings!}
            />
          ) : (
            <Skeleton className="w-full  h-[800px]" />
          )}
        </TabsContent>
        <TabsContent value="Followers">
          {Followers ? (
            <UsersList
              listType={"FollowList"}
              showDesc={true}
              users={Followers!}
            />
          ) : (
            <Skeleton className="w-full h-[800px] " />
          )}
        </TabsContent>
      </Tabs>
    </>
  );
}
