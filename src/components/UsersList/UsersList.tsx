import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import { MdOutlineVerified } from "react-icons/md";
import { GetFollowSuggestionsService } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
export type UsersListProp = {
  getusers: any;
  showDesc: boolean;
};

export function UsersList({ showDesc, getusers }: UsersListProp) {
  const [users, setUsers] = useState<any>([]);
  const {
    mutateAsync: GetFollowSuggestionsServiceFn,
    // isPending: FollowSuggestionsServicePending,
  } = useMutation({
    mutationFn: getusers,
  });
  useEffect(() => {
    // const follower
    (async () => {
      const users: any = await GetFollowSuggestionsServiceFn();
      setUsers(users);
      console.log(users);
    })();
  }, []);
  return (
    <>
      {users.map((user: any) => (
        <CardContent className="hover:cursor-pointer py-3 hover:bg-light-gray">
          <div className="flex ">
            <img
              src={user.profileImageUrl}
              alt="profilePic"
              className="w-[40px] h-[40px] rounded-full mr-3"
            ></img>
            <div className="flex-col flex-1">
              <div className="flex justify-between ">
                <div className="flex-col">
                  <div className="flex items-center">
                    <span className="mr-1">{user.name}</span>
                    {user.verified && (
                      <MdOutlineVerified className="text-blue-600" />
                    )}
                  </div>
                  <div className="text-[#595d62]">{user.username}</div>
                </div>
                <Button className="text-sm h-[30px] font-bold">
                  <span className="text-black">Follow</span>
                </Button>
              </div>
              {showDesc && <div>{user.description}</div>}
            </div>
          </div>
        </CardContent>
      ))}
      {/* <Card className="w-[350px] bg-[#16181c]  absolute left-96 top-[50px] border-none">
        <CardContent className="hover:cursor-pointer py-3 hover:bg-light-gray">
          <div className="flex ">
            <img
              src="https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
              alt="profilePic"
              className="w-[40px] h-[40px] rounded-full mr-3"
            ></img>
            <div className="flex-col flex-1">
              <div className="flex justify-between ">
                <div className="flex-col">
                  <div className="flex items-center">
                    <span className="mr-1">yousef</span>
                    <MdOutlineVerified className="text-blue-600" />
                  </div>
                  <div className="text-[#595d62]">@yousef20</div>
                </div>
                <Button className="text-sm h-[30px] font-bold">
                  <span className="text-black">Follow</span>
                </Button>
              </div>
              {showDesc && <div>this is desc of the fucking user</div>}
            </div>
          </div>
        </CardContent>
      </Card> */}
    </>
  );
}
