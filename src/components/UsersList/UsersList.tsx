import { CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import { MdOutlineVerified } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FollowService } from "@/lib/utils";
export type UsersListProp = {
  getusers: () => Promise<any>;
  showDesc: boolean;
};

export function UsersList({ showDesc, getusers }: UsersListProp) {
  const [users, setUsers] = useState([]);
  const {
    mutateAsync: getusersFn,
    // isPending: FollowSuggestionsServicePending,
  } = useMutation({
    mutationFn: getusers,
  });
  const {
    mutateAsync: FollowServiceFn,
    // isPending: FollowServicePending,
  } = useMutation({
    mutationFn: FollowService,
  });
  useEffect(() => {
    (async () => {
      const users: any = await getusersFn();
      setUsers(users);
      console.log(users);
    })();
  }, []);
  return (
    <>
      {users.map((user: any, index) => (
        <CardContent
          key={index}
          className="hover:cursor-pointer py-3 hover:bg-light-gray"
        >
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
                <Button
                  onClick={() => {
                    FollowServiceFn(user.username);
                  }}
                  className="text-sm h-[30px] font-bold"
                >
                  <span className="text-black">Follow</span>
                </Button>
              </div>
              {showDesc && <div>{user.description}</div>}
            </div>
          </div>
        </CardContent>
      ))}
    </>
  );
}
