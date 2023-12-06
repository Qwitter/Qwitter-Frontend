export type UsersListProp = {
    getusers: (username:string,token:string) => Promise<any>;
    showDesc: boolean;
    listType: string;
    isCard: boolean;
};