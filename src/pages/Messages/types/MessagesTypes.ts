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
    users?: conversation[];
    conversations?: conversation[];
    messagesRequests?: number;
    newMessageRequest?: boolean;
    selectedUser?: MessageUser;
    selectedConversation?: conversation;
    mode: "normal" | "request" | "People" | "conversations";
    matchedPart?: string;
    setSelectedUser?: React.Dispatch<React.SetStateAction<MessageUser>>
    setSelectedConversation?: React.Dispatch<React.SetStateAction<conversation | undefined>>
    followButton?: React.ComponentType<{
        className?: string;
    }>;
    showDeletePopUp?: (conversationId:string) => void
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
    id: string;
    text: string;
    date: string;
    userName: string;
    profileImageUrl: string;
    replyToMessage: MessagesMessage;
    entities: {
        hasthtags: { text: string; count: 15 }[];
        media: { value: string; type: string; id: string }[];
        mentions: string[];
    };
};


export type ConversationPopUpProps = {
    show: boolean;
    setShow?: React.Dispatch<React.SetStateAction<boolean>>;
    conversationToDelete?: string;
}

export type conversation =  {
    seen: boolean;
    id?: string;
    name: string;
    photo: string;
    isGroup: boolean;
    users: conversationWithUserUser[];
    lastMessage?: MessagesMessage;
    messages: MessagesMessage[];
  };
  
export type conversationWithUserUser = {
    name: string;
    userName: string;
    userPhoto: string;

}
export type conversations = {
    "unseen": 0;
    "conversations": conversation[];
}

export const EVENTS = {
    connection: 'connection',
    CLIENT: {
        CREATE_ROOM: 'CREATE_ROOM',
        SEND_ROOM_MESSAGE: 'SEND_ROOM_MESSAGE',
        JOIN_ROOM: 'JOIN_ROOM',
    },
    SERVER: {
        ROOMS: 'ROOMS',
        JOINED_ROOM: 'JOINED_ROOM',
        ROOM_MESSAGE: 'ROOM_MESSAGE',
    },
};