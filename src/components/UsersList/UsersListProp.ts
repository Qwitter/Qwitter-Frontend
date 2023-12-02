export type UsersListProp = {
    getusers: (token:string) => Promise<any>;
    showDesc: boolean;
    listType: string;
};