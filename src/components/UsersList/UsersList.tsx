import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { UsersListItem } from "./UsersListItem";
import { User } from "@/models/User";
import { FollowRelation } from "@/models/FollowRelation";
export type UsersListProp = {
  getusers: () => Promise<any>;
  showDesc: boolean;
  listType: boolean;
};

export function UsersList({ showDesc, getusers }: UsersListProp) {
  const [users, setUsers] = useState<User[]>([]);
  const {
    mutateAsync: getusersFn,
    // isPending: FollowSuggestionsServicePending,
  } = useMutation({
    mutationFn: getusers,
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
      {users.map((user: User, index) => (
        <UsersListItem
          key={index}
          description={user.description}
          name={user.name}
          username={user.userName}
          showDesc={showDesc}
          verified={user.verified}
          profileImageUrl={user.profileImageUrl}
          itemType={FollowRelation.following}
        />
      ))}
    </>
  );
}
