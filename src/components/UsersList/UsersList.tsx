import { useMutation } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { UsersListItem } from "../UsersListItem/UsersListItem";
import { User } from "@/models/User";
import { UsersListProp } from "./UsersListProp";
import { UserContext } from "@/contexts/UserContextProvider";

export function UsersList({
  showDesc,
  getusers,
  listType,
  isCard,
}: UsersListProp) {
  const [users, setUsers] = useState<User[]>([]);
  const { token, user } = useContext(UserContext);
  const {
    mutateAsync: getusersFn,
    // isPending: FollowSuggestionsServicePending,
  } = useMutation({
    mutationFn: token ? () => getusers(user?.userName!, token) : undefined,
  });
  useEffect(() => {
    (async () => {
      const users: User[] = await getusersFn();
      if (isCard) setUsers(users.slice(0, 3));
      else setUsers(users);
    })();
  }, [token]);

  return (
    <>
      {users &&
        users.map((user: User, index) => (
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
