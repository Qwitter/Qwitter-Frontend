import { Button, PopUpContainer } from "@/components"
import { HeaderButton } from "@/models/PopUpModel"
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Search, X, Check } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Spinner } from "@/components/Spinner";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { addUserToGroup, cn, getUsersSuggestionsToAdd } from "@/lib/utils";
import { UserContext } from "@/contexts/UserContextProvider";
import { MessageUser } from "./types/MessagesTypes";
import { MessagesContext } from "@/contexts/MessagesContextProvider";
function MessagesAddPeoplePopup() {
    const [isFocus, setFocus] = useState(false);
    const [peopleSearchText, setPeopleSearchText] = useState("");
    const { conversationId } = useParams()
    const [selectedUsers, setSelectedUsers] = useState<{ profileImageUrl: string; name: string; userName: string }[]>([]);
    const { token } = useContext(UserContext)
    const navigate = useNavigate();

    const handleXClick = () => { navigate(-1) }

    const handleAddClick = () => {
        mutate({
            token: token!, conversationId: conversationId!, users: selectedUsers.map(user => user.userName)
        })

    }

    const { mutate, isPending: isSubmitting } = useMutation({
        mutationFn: addUserToGroup,
        onSuccess: (data) => {
            if (data) {
                console.log(data)
                navigate('/Messages/' + conversationId)
            }

        },
        onError: (data) => {
            console.log(data);

        }
    })
    const {
        isPending,
        data,
        refetch
    } = useQuery<MessageUser[]>({
        queryKey: ["GroupUsers"],
        queryFn: () => getUsersSuggestionsToAdd(token!, peopleSearchText, conversationId!)
        ,
    });
    useEffect(() => {
        refetch();
    }, [peopleSearchText, refetch]);

    const handlePickUser = (user: MessageUser) => {
        const isUserSelected = selectedUsers.some((selectedUser) => selectedUser.userName === user.userName);

        if (isUserSelected) {
            const updatedUsers = selectedUsers.filter((selectedUser) => selectedUser.userName !== user.userName);
            setSelectedUsers(updatedUsers);
        } else
            setSelectedUsers([...selectedUsers, user]);

    };
    const removeSelected = (index: number) => {
        const updatedUsers = [...selectedUsers]
        updatedUsers.splice(index, 1)
        setSelectedUsers(updatedUsers);
    }
    const nextButton = <Button
        onClick={handleAddClick}
        className="py-0 h-8"
        disabled={selectedUsers.length == 0}
    >Add</Button>

    return (
        <PopUpContainer show={true}
            optionalHeader={nextButton}
            headerButton={HeaderButton.close}
            headerFunction={handleXClick}
            headerClassName="justify-between"
            isCompact
            className="  p-0"
            title="Add people">
            {isPending || isSubmitting ? <div className='w-full h-[180px] p-8'>
                <Spinner />
            </div> :
                <div className="w-full h-full items-start flex flex-col max-h-[calc(100vh-55px)]">
                    <div className={cn("flex flex-col w-full ", selectedUsers.length > 0 ? "" : "border-b border-primary border-opacity-30")}>
                        <div className="flex flex-row w-full items-center">
                            <div className="ml-3 flex justify-center items-center ">
                                <Search className={`w-5 h-5  ${isFocus ? 'text-secondary' : 'text-gray'} `} />
                            </div>
                            <input type="text"
                                placeholder="Search people"
                                value={peopleSearchText}
                                onChange={(e) => setPeopleSearchText(e.target.value)}
                                onFocus={() => setFocus(true)}
                                onBlur={() => setFocus(false)}
                                className="block rounded-sm z-10 placeholder:[#757575]   p-3 w-full text-sm bg-black border-none
                        border-b border-gray dark:text-white  focus:ring-0 "
                            />
                        </div>
                    </div>
                    {selectedUsers.length > 0 &&
                        <ul className="flex flex-row w-full flex-wrap max-h-fit  flex-shrink-0 border-b border-primary border-opacity-30   p-3 gap-2">
                            {selectedUsers.map((selectedUser, index) => (<li key={index} className="h-fit">
                                <div className="flex flex-row items-center pr-3 pl-1 cursor-pointer hover:bg-[#031019] transition-all py-1 gap-2 max-w-fit rounded-2xl border border-primary border-opacity-40" onClick={() => removeSelected(index)}>
                                    <img src={`http://${selectedUser.profileImageUrl}`} alt="" className="w-6 h-6 rounded-full" />
                                    <span>{selectedUser.name}</span>
                                    <div>
                                        <X className="w-5 h-5 text-secondary" />
                                    </div>
                                </div>
                            </li>))}
                        </ul>}
                    <div className="overflow-y-auto w-full ">
                        {peopleSearchText.length > 0 ? <ShowUsersSuggestions onUserClick={handlePickUser} selectedUsers={selectedUsers} users={data!} /> :
                            <ShowGroupPeople />
                        }
                    </div>
                </div>
            }
        </PopUpContainer>
    )
}
function ShowUsersSuggestions({ onUserClick, users, selectedUsers }: { selectedUsers: MessageUser[], users: MessageUser[], onUserClick: (user: MessageUser) => void }) {

    const { currentConversation } = useContext(MessagesContext)

    return (
        <ul className="flex-shrink min-h-[60vh]" >

            {
                users && users.slice(0, 12).map((user, index) => (
                    <li key={index} className={cn("py-3 px-4 flex flex-row justify-between hover:bg-[#16181c] w-full transition-all items-center cursor-pointer", (currentConversation && currentConversation.users.filter(obj => obj['userName'] === user.userName).length > 0) && "opacity-60 cursor-default")}
                        onClick={(currentConversation && currentConversation.users.filter(obj => obj['userName'] === user.userName).length > 0) ? () => { } : () => onUserClick(user)}>
                        <div className=" flex flex-row">
                            <Avatar className="mr-4">
                                <AvatarImage className="w-10 h-10 rounded-full border-[#ffffee46] border-[1px] border-solid" src={user.profileImageUrl || "https://i.pinimg.com/736x/62/1d/bd/621dbd7d208d5c17498e0f73bf02aee8.jpg"} />
                            </Avatar>
                            <div className="flex flex-col h-full gap-0 ">
                                <h3 className="text-primary text-[15px]">{user.name}</h3>
                                <span className="text-gray">@{user.userName}</span>
                            </div>
                        </div>
                        {selectedUsers && (selectedUsers.filter(obj => obj['userName'] === user.userName).length > 0 || (currentConversation && currentConversation.users.filter(obj => obj['userName'] === user.userName).length > 0)) && <div>
                            <Check className="w-4 h-4 text-secondary" />
                        </div>}
                    </li>
                ))

            }
        </ul>

    )
}
function ShowGroupPeople() {
    const { currentConversation } = useContext(MessagesContext)

    return (
        <ul className="flex-shrink min-h-[60vh]" >

            {
                currentConversation && currentConversation.users.slice(0, -1).map((user, index) => (
                    <li key={index} className={cn("py-3 px-4 flex flex-row justify-between  w-full transition-all items-center cursor-default opacity-70")}>
                        <div className=" flex flex-row">
                            <Avatar className="mr-4">
                                <AvatarImage className="w-10 h-10 rounded-full border-[#ffffee46] border-[1px] border-solid" src={user.profileImageUrl || "https://i.pinimg.com/736x/62/1d/bd/621dbd7d208d5c17498e0f73bf02aee8.jpg"} />
                            </Avatar><div className="flex flex-col h-full gap-0 ">
                                <h3 className="text-primary text-[15px]">{user.name}</h3>
                                <span className="text-gray">@{user.userName}</span>
                            </div>
                        </div>
                        <div>
                            <Check className="w-4 h-4 text-secondary" />

                        </div>
                    </li>
                ))

            }
        </ul>

    )
}
export default MessagesAddPeoplePopup


