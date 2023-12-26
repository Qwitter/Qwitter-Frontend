import { UsersListItem } from "../UsersListItem/UsersListItem";
import { User } from "@/models/User";
import { UsersListProp } from "./UsersListProp";

export function UsersList({ showDesc, users, listType }: UsersListProp) {
  return (
    <>
      {users?.length > 0 ? (
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
            followersCount={user.followersCount}
            followingCount={user.followingCount}
          />
        ))
      ) : (
        <div className="text-center text-2xl mt-5 text-primary">
          No users to show
        </div>
      )}
    </>
  );
}
