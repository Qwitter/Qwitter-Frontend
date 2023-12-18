import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useContext, useState } from "react";
import "../../index.css";
import { UsersList } from "@/components/UsersList/UsersList";
import { GetFollowersService, GetFollowingsService } from "@/lib/utils";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "@/contexts/UserContextProvider";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/models/User";
import { Spinner } from "../Spinner";

export function FollowList({ type }: { type: string }) {
  const [Liststate, setListstate] = useState(type);
  const navigate = useNavigate();
  const { token } = useContext(UserContext);
  const { username } = useParams();
  const { data: Followings } = useQuery<User[]>({
    queryKey: ["followings", token, username],
    queryFn: () => GetFollowingsService(username!, token!),
  });
  const { data: Followers } = useQuery<User[]>({
    queryKey: ["followers", token, username],
    queryFn: () => GetFollowersService(username!, token!),
  });
  return (
    <>
      <Tabs defaultValue={Liststate} className="max-w-[600px] w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            className="flex justify-center tabhover"
            value="Following"
            onClick={() => {
              setListstate("Following");
              navigate(`/Profile/${username}/Following`);
            }}
            data-testid="followingTab"
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
              navigate(`/Profile/${username}/Followers`);
            }}
            data-testid="followersTab"
          >
            <div className={Liststate == "Followers" ? "active-tab" : "tab"}>
              Followers
            </div>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Following" data-testid="followingList">
          {Followings ? (
            <UsersList
              listType={"FollowList"}
              showDesc={true}
              users={Followings!}
            />
          ) : (
            <div className="mx-auto">
              <Spinner />
            </div>
          )}
        </TabsContent>
        <TabsContent value="Followers" data-testid="followersList">
          {Followers ? (
            <UsersList
              listType={"FollowList"}
              showDesc={true}
              users={Followers!}
            />
          ) : (
            <div className="mx-auto">
              <Spinner />
            </div>
          )}
        </TabsContent>
      </Tabs>
    </>
  );
}
