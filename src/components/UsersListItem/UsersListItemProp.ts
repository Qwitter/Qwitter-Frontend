import { FollowRelation } from "@/models/FollowRelation";

export type UsersListItemProp = {
    showDesc: boolean;
    itemType: FollowRelation;
    verified: boolean;
    profileImageUrl: string;
    name: string;
    username: string;
    description: string;
    isFollowing: boolean;
};