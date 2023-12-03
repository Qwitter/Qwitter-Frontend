import { createContext, useState } from "react";

type MessagesContextProviderProps = {
    children: React.ReactNode;
};
type Group = {
    groupName: string;
    groupImg: string;
}
type MessageReply ={
    replyId:string;
    message:string;
    userName:string;
    
}
type MessagesContextType = {
    group: Group | null;
    messageReply:MessageReply |null;
    setMessageReply:(messageReply:MessageReply|null)=>void;
    setGroup: (group: Group | null) => void;

    saveGroup: (group: Group) => void;
};

const defaultMessagesContext: MessagesContextType = {
    group: null,
    messageReply:null,
    setMessageReply:()=>{},
    saveGroup: () => { },
    setGroup: () => {},

};
export const MessagesContext = createContext<MessagesContextType>(defaultMessagesContext);

const MessagesContextProvider = ({ children }: MessagesContextProviderProps) => {
    const [group, setGroup] = useState<Group | null>(null);
    const [messageReply, setMessageReply] = useState<MessageReply | null>(null);
    // useEffect(() => {
    //     const storedUser = localStorage.getItem("user");
    //     const storedToken = localStorage.getItem("token");

    //     if (storedUser && storedToken) {
    //         setUser(JSON.parse(storedUser));
    //         setToken(storedToken);
    //     }
    // }, []);

    const saveGroup = (newGroup: Group) => {
        setGroup(newGroup);
    };



    return (
        <MessagesContext.Provider
            value={{ group, saveGroup,setGroup,messageReply,setMessageReply }}
        >
            {children}
        </MessagesContext.Provider>
    );
};
export default MessagesContextProvider;
