import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { UsersListItem } from "../UsersListItem/UsersListItem";
import { User } from "@/models/User";
import { UsersListProp } from "./UsersListProp";

export function UsersList({ showDesc, getusers, listType }: UsersListProp) {
  const [users, setUsers] = useState<User[]>([]);
  // const { token } = useContext(UserContext);
  const token: string | null = localStorage.getItem("token");
  const {
    mutateAsync: getusersFn,
    // isPending: FollowSuggestionsServicePending,
  } = useMutation({
    mutationFn: token ? () => getusers(token) : undefined,
  });
  useEffect(() => {
    (async () => {
      const users: any = await getusersFn();
      setUsers(users);
      console.log(token);
      // debugger;
    })();
  }, [token]);

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
          listType={listType}
        />
      ))}
    </>
  );
}
