import { User } from "@/models/User";

export type UsersListProp = {
    users:User[];
    showDesc: boolean;
    listType: string;
    // isCard: boolean;
};