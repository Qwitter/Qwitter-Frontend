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
    profileImageUrl: string;
    userName: string;
    followersCount:number;
    followingCount:number;
    description?:string;
    isFollowed?:boolean;
    isFollowing?:boolean;
    name: string;
    isBlocked?:boolean;
    isMuted?:boolean;
    isVerified?: boolean;
}
export type Mention = {
    position: number;
    length: number;
    mention: string;
}
export type MessagesListProp = {
    users?: conversation[];
    conversations?: conversation[];
    messagesRequests?: number;
    newMessageRequest?: boolean;
    setOpenConversation?: React.Dispatch<React.SetStateAction<string|undefined>>;
    selectedUser?: MessageUser;
    selectedConversation?: conversation;
    mode: "normal" | "request" | "People" | "conversations"|"Group";
    matchedPart?: string;
    setSelectedUser?: React.Dispatch<React.SetStateAction<MessageUser>>
    setSelectedConversation?: React.Dispatch<React.SetStateAction<conversation | undefined>>
    followButton?: React.ComponentType<{
        className?: string;
    }>;
    showDeletePopUp?: (conversationId: string) => void
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
    isMessage: boolean;
    isAccordion?:boolean;
    isGroup?: boolean;
    id: string;
    text: string;
    date: string;
    setChatMessages?:React.Dispatch<React.SetStateAction<MessagesMessage[]>>;
    userName: string;
    profileImageUrl: string;
    sending?:boolean;
    error?:boolean;
    logicalId?:string;
    replyToMessage: MessagesMessage|null;
    entities: {
        hasthtags: { text: string; count: 15 }[];
        media: { value: string; type: string; id: string }[];
        mentions: string[];
    };
};


export type ConversationPopUpProps = {
    show: boolean;
    setShow?: React.Dispatch<React.SetStateAction<boolean>>;
    setChatMessages?:React.Dispatch<React.SetStateAction<MessagesMessage[]>>
    conversationToDelete?: string;
    messageId?: string;
    userName?: string;
}

export type conversation = {
    type?: string;
    seen: boolean;
    blocked:boolean;
    id?: string;
    name: string;
    photo: string;
    isGroup: boolean;
    users: MessageUser[];
    lastMessage?: MessagesMessage;
    fullName?:string;
    messages: MessagesMessage[];
};


export type conversations = {
    "unseen": 0;
    "conversations": conversation[];
}
export type SearchConversations = {
    status: string;
    groups: conversation[];
    people: conversation[];
    messages: conversation[]
}

