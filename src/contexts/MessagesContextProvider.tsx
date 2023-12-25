import { conversation } from "@/models/MessagesTypes";
import { createContext, useEffect, useState } from "react";

type MessagesContextProviderProps = {
    children: React.ReactNode;
};

type MessageReply = {
    replyId: string;
    message: string;
    userName: string;
    image: { value: string, type: string }[]
}

type MessagesContextType = {
    messageReply: MessageReply | null;
    userAllConversation: conversation[] | null;
    currentConversation: conversation | null
    setUserAllConversation: (conversations: conversation[] | null) => void;
    setCurrentConversation: (conversation: conversation) => void;
    setMessageReply: (messageReply: MessageReply | null) => void;

};


const defaultMessagesContext: MessagesContextType = {
    messageReply: null,
    currentConversation: null,
    userAllConversation: [],
    setUserAllConversation: () => { },
    setCurrentConversation: () => { },

    setMessageReply: () => { },


};
export const MessagesContext = createContext<MessagesContextType>(defaultMessagesContext);

const MessagesContextProvider = ({ children }: MessagesContextProviderProps) => {
    const [messageReply, setMessageReply] = useState<MessageReply | null>(null);
    const [userAllConversation, setUserAllConversation] = useState<conversation[] | null>(null);
    const [currentConversation, setCurrentConversation] = useState<conversation | null>(null);

    useEffect(() => {
        // Retrieve data from localStorage
        const storedUserAllConversation = localStorage.getItem("userAllConversation");
        const storedCurrentConversation = localStorage.getItem("currentConversation");
        const storedMessageReply = localStorage.getItem("messageReply");
        const parsedUserAllConversation = storedUserAllConversation&&storedUserAllConversation !== "undefined"
            ? JSON.parse(storedUserAllConversation)
            : null;
        const parsedCurrentConversation = storedCurrentConversation&&storedUserAllConversation !== "undefined"
            ? JSON.parse(storedCurrentConversation)
            : null;
        const parsedMessageReply = storedMessageReply&&storedUserAllConversation !== "undefined"
            ? JSON.parse(storedMessageReply)
            : null;

        setUserAllConversation(parsedUserAllConversation);
        setCurrentConversation(parsedCurrentConversation);
        setMessageReply(parsedMessageReply);
    }, []); 

    // Update localStorage when state changes
    useEffect(() => {
        userAllConversation&&localStorage.setItem("userAllConversation", JSON.stringify(userAllConversation));
    }, [userAllConversation]);

    useEffect(() => {
        currentConversation&&localStorage.setItem("currentConversation", JSON.stringify(currentConversation));
    }, [currentConversation]);

    useEffect(() => {
        messageReply&&localStorage.setItem("messageReply", JSON.stringify(messageReply));
    }, [messageReply]);

    return (
        <MessagesContext.Provider
            value={{
                currentConversation,
                setCurrentConversation,
                messageReply,
                setMessageReply,
                userAllConversation,
                setUserAllConversation
            }}
        >
            {children}
        </MessagesContext.Provider>
    );
};
export default MessagesContextProvider;
