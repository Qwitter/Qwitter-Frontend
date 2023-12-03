export type MessagesSearchProp = {
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
    className?: string;
    inputClassName?: string;
    showSearch: boolean;
    handleInputFocus: () => void;
    setShowSearch: React.Dispatch<React.SetStateAction<boolean>>
}
export type Images = {
    value: string;
    type: string;
};
export type MessageUser = {
    id?: number;
    userPhoto: string;
    userName: string;
    name: string;
    isVerified?: boolean;
    lastMessage?: string;
    lastMessageTime?: string;
}
export type Mention = {
    position: number;
    length: number;
    mention: string;
}
export type MessagesListProp = {
    users: MessageUser[];
    messagesRequests?: number;
    newMessageRequest?: boolean;
    selectedUser?: MessageUser;
    mode: "normal" | "request" | "People" | "conversations";
    matchedPart?: string;
    setSelectedUser?: React.Dispatch<React.SetStateAction<MessageUser>>
    followButton?: React.ComponentType<{
        className?: string;
    }>;
    showDeletePopUp?: () => void
}
export type MessagesSideProp = {
    p: string;
    showButton?: boolean;
    h2?: string;
    button?: string;
}
export type MessagesRequestPopUpProp = {
    conversationUsername: string;
    handleBlock: () => void;
    handleRemoveConversation: () => void;
}
export type MessagesMessage = {

    "status": string,
    "id": string,
    "text": string
    "date": string,
    "userName": string,
    "userPhoto": string,
    "isReply": string,
    "media": {
        "url": string,
        "type": string
    }
}
export type MessagesConversationInfoProps = {
    type: "group" | "direct" | string;
    imageUrl: string;
    id: number;
    name:string;
    groupName?: string;
    users: { userName: string; userPhoto: string; isFollowing: boolean; }[]
}
export type ConversationPopUpProps = {
    show: boolean;
    setShow?: React.Dispatch<React.SetStateAction<boolean>>;
    leaveFunction?: () => void;
}