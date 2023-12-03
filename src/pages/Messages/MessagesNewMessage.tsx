import { Button, PopUpContainer } from "@/components"
import { HeaderButton } from "@/models/PopUpModel"
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Search, X, Check } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Spinner } from "@/components/Spinner";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn, getUsersSuggestions } from "@/lib/utils";
import { User } from "@/models/User";
import { UserContext } from "@/contexts/UserContextProvider";

function MessagesNewMessage() {
    const [isFocus, setFocus] = useState(false);
    const [peopleSearchText, setPeopleSearchText] = useState("");
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
    const navigate = useNavigate();
    const userConversations = [{
        name: "Charlie Davis",
        email: "charlie.davis@example.com",
        birthDate: "1983-09-12",
        userName: "charlie_d",
        createdAt: "2023-01-25T11:45:00Z",
        location: "Suburbia",
        bio: "Tech geek and gadget lover",
        website: "http://www.charliedavis.com",
        passwordChangedAt: "2023-01-27T18:15:00Z",
        id: "6",
        google_id: "google321",
        profileImageUrl: "github.com/shadcn.png",
        profileBannerUrl: "http://www.example.com/charliedavis-banner.jpg",
    },
    {
        name: "Sophie Martin",
        email: "sophie.martin@example.com",
        birthDate: "1992-07-18",
        userName: "sophie_m",
        createdAt: "2023-01-30T09:15:00Z",
        location: "Coastal City",
        bio: "Foodie and travel enthusiast",
        website: "http://www.sophiemartin.com",
        passwordChangedAt: "2023-02-01T15:30:00Z",
        id: "7",
        google_id: "google876",
        profileImageUrl: "github.com/shadcn.png",
        profileBannerUrl: "http://www.example.com/sophiemartin-banner.jpg",
    },]
    const handleXClick = () => { navigate(-1) }
    const handleNextClick = () => { }

    const { token } = useContext(UserContext)
    const {
        isPending,
        data,
        refetch
    } = useQuery<User[]>({
        queryKey: ["MessagesUsers"],
        queryFn: () => getUsersSuggestions(token!, " " + peopleSearchText)
        ,
    });
    useEffect(() => {
        refetch();
    }, [peopleSearchText, refetch]);

    const handlePickUser = (user: User) => {
        const isUserSelected = selectedUsers.some((selectedUser) => selectedUser.userName === user.userName);

        if (isUserSelected) {
            const updatedUsers = selectedUsers.filter((selectedUser) => selectedUser.userName !== user.userName);
            setSelectedUsers(updatedUsers);
        } else
            setSelectedUsers([...selectedUsers, user]);

    };
    const removeSelected = (index: number) => {
        const updatedUsers =[...selectedUsers]
        updatedUsers.splice(index, 1)
        setSelectedUsers(updatedUsers);
    }
    const nextButton = <Button
        onClick={handleNextClick}
        className="py-0 h-8"
        disabled={selectedUsers.length == 0}
    >Next</Button>

    return (
        <PopUpContainer show={true}
            optionalHeader={nextButton}
            headerButton={HeaderButton.close}
            headerFunction={handleXClick}
            headerClassName="justify-between"
            isCompact
            className="  p-0"
            title="New message">
                {isPending?   <div className='w-full h-[180px] p-8'>
                <Spinner />
            </div>:
            <div className="w-full h-full items-start flex flex-col max-h-[calc(100vh-55px)]">
                <div className={cn("flex flex-col w-full ",selectedUsers.length>0?"":"border-b border-primary border-opacity-30")}>
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
                {selectedUsers.length>0 &&
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
                    <ShowUsersSuggestions onUserClick={handlePickUser} selectedUsers={selectedUsers} users={peopleSearchText.length > 0 ? data! : userConversations} />
                </div>
            </div>
        }
        </PopUpContainer>
    )
}
function ShowUsersSuggestions({ onUserClick, users, selectedUsers }: { selectedUsers: User[], users: User[], onUserClick: (user: User) => void }) {


    return (
         <ul className="flex-shrink min-h-[60vh]" >

            {
               users&& users.slice(0, 10).map(user => (
                    <li key={user.userName} className="py-3 px-4 flex flex-row justify-between hover:bg-[#16181c] w-full transition-all items-center cursor-pointer"
                        onClick={() => onUserClick(user)}>
                        <div className=" flex flex-row">
                            <Avatar className="mr-4">
                                <AvatarImage className="w-10 h-10 rounded-full border-[#ffffee] border-[1px] border-solid" src={`${user?.profileImageUrl}`} />
                            </Avatar><div className="flex flex-col h-full gap-0 ">
                                <h3 className="text-primary text-[15px]">{user.name}</h3>
                                <span className="text-gray">@{user.userName}</span>
                            </div>
                        </div>
                        {selectedUsers && selectedUsers.filter(obj => obj['userName'] === user.userName).length > 0 && <div>
                            <Check className="w-4 h-4 text-secondary" />
                        </div>}
                    </li>
                ))

            }
        </ul>
        
    )
}
export default MessagesNewMessage


