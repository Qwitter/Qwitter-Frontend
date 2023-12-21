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

export const EVENTS = {
    connection: 'connection',
    CLIENT: {
        SEND_ROOM_MESSAGE: 'SEND_ROOM_MESSAGE', // Used for sending a message
        JOIN_ROOM: 'JOIN_ROOM', // Joiniing a room. It can be used by joining  a conversation room or a userName room for notifications.
    },
    SERVER: {
        ROOMS: 'ROOMS',
        JOINED_ROOM: 'JOINED_ROOM', // Sending a message that a user joined a room
        ROOM_MESSAGE: 'ROOM_MESSAGE', // Sending a message to the conversation room socket only
        NOTIFICATION: 'NOTIFICATION', // Sending a message to the room of the username
        MESSAGE: 'MESSAGE', // Sending a general message to the user on the room of the username
    },
};