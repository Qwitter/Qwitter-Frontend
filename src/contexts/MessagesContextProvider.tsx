import { conversation } from "@/pages/Messages/types/MessagesTypes";
import { createContext, useState } from "react";

type MessagesContextProviderProps = {
    children: React.ReactNode;
};

type MessageReply = {
    replyId: string;
    message: string;
    userName: string;
    image:{value:string,type:string}[]
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

    // useEffect(() => {
    //     const storedUser = localStorage.getItem("user");
    //     const storedToken = localStorage.getItem("token");

    //     if (storedUser && storedToken) {
    //         setUser(JSON.parse(storedUser));
    //         setToken(storedToken);
    //     }
    // }, []);




    return (
        <MessagesContext.Provider
            value={{
                currentConversation, setCurrentConversation,
                messageReply,
                setMessageReply, userAllConversation, setUserAllConversation
            }}
        >
            {children}
        </MessagesContext.Provider>
    );
};
export default MessagesContextProvider;
