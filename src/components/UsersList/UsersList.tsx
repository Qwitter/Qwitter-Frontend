// import { useMutation } from "@tanstack/react-query";
// import { useContext, useEffect, useState } from "react";
import { UsersListItem } from "../UsersListItem/UsersListItem";
import { User } from "@/models/User";
import { UsersListProp } from "./UsersListProp";
// import { UserContext } from "@/contexts/UserContextProvider";

export function UsersList({
  showDesc,
  users,
  listType,
}: 
UsersListProp) {
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
