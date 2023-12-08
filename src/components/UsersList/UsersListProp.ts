import { User } from "@/models/User";

export type UsersListProp = {
    // getusers: (username:string,token:string) => Promise<any>;
    users:User[];
    showDesc: boolean;
    listType: string;
    isCard: boolean;
};