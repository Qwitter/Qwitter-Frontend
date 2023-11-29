export type MessagesSearchProp = {
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
}
export type MessageUser ={
    id?:string;
    imageUrl: string;
    username: string;
    name: string;
    isVerified: boolean;
    lastMessage: string;
    lastMessageTime:string;
}
export type MessagesListProp = {
    users: MessageUser[];
    messagesRequests?:number;
    newMessageRequest?:boolean;
    selectedUser:MessageUser;
    mode:"normal"|"request";
    setSelectedUser: React.Dispatch<React.SetStateAction<MessageUser>>
}
export type MessagesSideProp = {
    p:string;
    showButton:boolean;
}
export type MessagesRequestPopUpProp={
    conversationUsername:string;
    handleBlock:()=>void;
    handleRemoveConversation:()=>void;
}