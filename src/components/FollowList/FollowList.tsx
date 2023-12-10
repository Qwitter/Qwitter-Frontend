import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useContext, useState } from "react";
import "../../index.css";
import { UsersList } from "../UsersList/UsersList";
import { GetFollowersService, GetFollowingsService } from "@/lib/utils";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "@/contexts/UserContextProvider";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/models/User";
import { Spinner } from "../Spinner";

export function FollowList({ type }: { type: string }) {
  const { token, user } = useContext(UserContext);
  const { data: Followings } = useQuery<User[]>({
    queryKey: ["followings", token, user?.userName],
    queryFn: () => GetFollowingsService(user?.userName!, token!),
  });
  const { data: Followers } = useQuery<User[]>({
    queryKey: ["followers", token, user?.userName],
    queryFn:
      token && user?.userName
        ? () => GetFollowersService(user?.userName, token)
        : undefined,
  });
  const [Liststate, setListstate] = useState(type);
  const navigate = useNavigate();
  const { username } = useParams();
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
              console.log(username);
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
            <div className="mx-auto">
              <Spinner />
            </div>
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
            <div className="mx-auto">
              <Spinner />
            </div>
          )}
        </TabsContent>
      </Tabs>
    </>
  );
}
