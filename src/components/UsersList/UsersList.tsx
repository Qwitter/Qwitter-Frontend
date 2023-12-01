import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { UsersListItem } from "../UsersListItem/UsersListItem";
import { User } from "@/models/User";
import { UsersListProp } from "./UsersListProp";

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
      debugger;
      setUsers(users);
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
          isFollowing={user.isFollowing}
        />
      ))}
    </>
  );
}
