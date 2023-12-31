import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useContext, useState } from "react";
import "../../index.css";
import { UsersList } from "../UsersList/UsersList";
import { GetTweetLikersService, GetTweetRetweetersService } from "@/lib/utils";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "@/contexts/UserContextProvider";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/models/User";
import { Spinner } from "../Spinner";
import { OptionsHeader } from "../OptionsHeader/OptionsHeader";

export function LikeRetweetList({ type }: { type: string }) {
  const [Liststate, setListstate] = useState(type);
  const { token } = useContext(UserContext);
  const { tweetId } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { data: Likers, refetch: refetchLikers } = useQuery<User[]>({
    queryKey: ["Likers", token, tweetId],
    queryFn: () => GetTweetLikersService(tweetId!, token!),
  });
  const { data: Retweeters, refetch: refetchRetweeters } = useQuery<User[]>({
    queryKey: ["Retweeters", token, tweetId],
    queryFn: () => GetTweetRetweetersService(tweetId!, token!),
  });
  return (
    <>
      <OptionsHeader header="Post engagements" />
      <Tabs defaultValue={Liststate} className="max-w-[600px] w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            className="flex justify-center tabhover"
            value="Likers"
            onClick={() => {
              refetchLikers();
              setListstate("Likers");
              const path = pathname.replace("Retweeters", "Likers");
              navigate(path);
            }}
          >
            <div className={Liststate == "Likers" ? "active-tab" : "tab"}>
              Likers
            </div>
          </TabsTrigger>
          <TabsTrigger
            className="flex justify-center tabhover"
            value="Retweeters"
            onClick={() => {
              refetchRetweeters();
              setListstate("Retweeters");
              const path = pathname.replace("Likers", "Retweeters");
              navigate(path);
            }}
          >
            <div className={Liststate == "Retweeters" ? "active-tab" : "tab"}>
              Retweeters
            </div>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Likers">
          {Likers ? (
            <UsersList
              listType={"FollowList"}
              showDesc={true}
              users={Likers!}
            />
          ) : (
            <div className="mx-auto">
              <Spinner />
            </div>
          )}
        </TabsContent>
        <TabsContent value="Retweeters">
          {Retweeters ? (
            <UsersList
              listType={"FollowList"}
              showDesc={true}
              users={Retweeters!}
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
