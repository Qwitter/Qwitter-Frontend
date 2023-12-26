import { Button, PopUpContainer } from "@/components";
import { HeaderButton } from "@/models/PopUpModel";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Search, X, Check } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Spinner } from "@/components/Spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CreateConversation,
  cn,
  getConversationsUsersSuggestions,
} from "@/lib/utils";
import { UserContext } from "@/contexts/UserContextProvider";
import { MessageUser } from "../../../models/MessagesTypes";
import { MessagesContext } from "@/contexts/MessagesContextProvider";
import ImageGrid from "../ImageGrid";
function MessagesNewMessage() {
  const [isFocus, setFocus] = useState(false);
  const [peopleSearchText, setPeopleSearchText] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<MessageUser[]>([]);
  const { token } = useContext(UserContext);
  const navigate = useNavigate();

  const handleXClick = () => {
    navigate(-1);
  };

  const handleNextClick = () => {
    mutate({
      token: token!,
      users: selectedUsers.map((user) => user.userName),
    });
  };

  const { mutate, isPending: isSubmitting } = useMutation({
    mutationFn: CreateConversation,
    onSuccess: (data) => {
      if (data) {
        navigate("/Messages/" + data.id);
      }
    },
    onError: (data) => {
      console.log(data);
    },
  });
  const { isPending, data, refetch } = useQuery<MessageUser[]>({
    queryKey: ["MessagesUsers"],
    queryFn: () => getConversationsUsersSuggestions(token!, peopleSearchText),
  });
  useEffect(() => {
    refetch();
  }, [peopleSearchText, refetch]);

  const handlePickUser = (user: MessageUser) => {
    const isUserSelected = selectedUsers.some(
      (selectedUser) => selectedUser.userName === user.userName
    );

    if (isUserSelected) {
      const updatedUsers = selectedUsers.filter(
        (selectedUser) => selectedUser.userName !== user.userName
      );
      setSelectedUsers(updatedUsers);
    } else setSelectedUsers([...selectedUsers, user]);
  };
  const removeSelected = (index: number) => {
    const updatedUsers = [...selectedUsers];
    updatedUsers.splice(index, 1);
    setSelectedUsers(updatedUsers);
  };
  const nextButton = (
    <Button
      onClick={handleNextClick}
      className="py-0 h-8"
      disabled={selectedUsers.length == 0}
    >
      Next
    </Button>
  );

  return (
    <PopUpContainer
      show={true}
      optionalHeader={nextButton}
      headerButton={HeaderButton.close}
      headerFunction={handleXClick}
      headerClassName="justify-between"
      isCompact
      className="  p-0"
      title="New message"
    >
      {isPending || isSubmitting ? (
        <div className="w-full h-[180px] p-8">
          <Spinner />
        </div>
      ) : (
        <div className="w-full h-full items-start flex flex-col max-h-[calc(100vh-55px)]">
          <div
            className={cn(
              "flex flex-col w-full ",
              selectedUsers.length > 0
                ? ""
                : "border-b border-primary border-opacity-30"
            )}
          >
            <div className="flex flex-row w-full items-center">
              <div className="ml-3 flex justify-center items-center ">
                <Search
                  className={`w-5 h-5  ${isFocus ? "text-secondary" : "text-gray"
                    } `}
                />
              </div>
              <input
                type="text"
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
          {selectedUsers.length > 0 && (
            <ul data-testid="searchedUsers" className="flex flex-row w-full flex-wrap max-h-fit  flex-shrink-0 border-b border-primary border-opacity-30   p-3 gap-2">
              {selectedUsers.map((selectedUser, index) => (
                <li key={index} className="h-fit">
                  <div
                    className="flex flex-row items-center pr-3 pl-1 cursor-pointer hover:bg-[#031019] transition-all py-1 gap-2 max-w-fit rounded-2xl border border-primary border-opacity-40"
                    onClick={() => removeSelected(index)}
                  >
                    <img
                      src={selectedUser.profileImageUrl || "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"}
                      alt=""
                      className="w-6 h-6 rounded-full"
                    />
                    <span>{selectedUser.name}</span>
                    <div>
                      <X className="w-5 h-5 text-secondary" />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div data-testid="searchedUsers" className="overflow-y-auto w-full ">
            {peopleSearchText.length > 0 ? (
              <ShowUsersSuggestions
                onUserClick={handlePickUser}
                selectedUsers={selectedUsers}
                users={data!}
              />
            ) : (
              <ShowAllUserConversations
                onUserClick={handlePickUser}
                selectedUsers={selectedUsers}
              />
            )}
          </div>
        </div>
      )}
    </PopUpContainer>
  );
}
function ShowUsersSuggestions({
  onUserClick,
  users,
  selectedUsers,
}: {
  selectedUsers: MessageUser[];
  users: MessageUser[];
  onUserClick: (user: MessageUser) => void;
}) {

  return (
    <ul data-testid="searchedUsers" className="flex-shrink min-h-[60vh]">
      {users &&
        users.slice(0, 12).map((user, index) => (
          <li
            key={index}
            className="py-3 px-4 flex flex-row justify-between hover:bg-[#16181c] w-full transition-all items-center cursor-pointer"
            onClick={() => onUserClick(user)}
          >
            <div className=" flex flex-row">
              <Avatar className="mr-4">
                <AvatarImage
                  className="w-10 h-10 rounded-full border-[#ffffee46] border-[1px] border-solid"
                  src={
                    user.profileImageUrl ||
                    "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
                  }
                />
              </Avatar>
              <div className="flex flex-col h-full gap-0 ">
                <h3 className="text-primary text-[15px]">{user.name}</h3>
                <span className="text-gray">@{user.userName}</span>
              </div>
            </div>
            {selectedUsers &&
              selectedUsers.filter((obj) => obj["userName"] === user.userName)
                .length > 0 && (
                <div>
                  <Check className="w-4 h-4 text-secondary" />
                </div>
              )}
          </li>
        ))}
    </ul>
  );
}
function ShowAllUserConversations({
  onUserClick,
  selectedUsers,
}: {
  selectedUsers: MessageUser[];
  onUserClick: (user: MessageUser) => void;
}) {
  const { userAllConversation } = useContext(MessagesContext);
  const navigate = useNavigate();
  const { VITE_DEFAULT_IMAGE } = import.meta.env;

  return (
    <ul data-testid="searchedUsers" className="flex-shrink min-h-[60vh]">
      {userAllConversation &&
        userAllConversation.map((user, index) => (
          <li
            key={index}
            className={cn(
              "py-3 px-4 flex flex-row justify-between hover:bg-[#16181c] w-full transition-all items-center cursor-pointer",
              user.isGroup &&
              selectedUsers.length > 0 &&
              "bg-[#16181c] opacity-70"
            )}
            onClick={
              !user.isGroup
                ? () => onUserClick(user.users[0])
                : selectedUsers.length == 0
                  ? () => navigate("/Messages/" + user.id)
                  : () => { }
            }
          >
            <div className=" flex flex-row">
              {user.isGroup  && !user.photo ? <ImageGrid
                className="w-12 h-10  rounded-full mr-2 min-w-[40px] max-lg:w-10 "
                images={user.users.map(conversation => conversation.profileImageUrl || VITE_DEFAULT_IMAGE)} /> : <Avatar className="mr-4 min-w-max ">
                <AvatarImage className="w-10 h-10 rounded-full border-[#ffffee] border-[1px] border-solid" src={user.isGroup ? user.photo : user.users[0].profileImageUrl} />
                <AvatarFallback className="w-10 h-10 rounded-full border-[#ffffee] border-[1px] border-solid" >{user?.users[0].userName.substring(0, 2)}</AvatarFallback>
              </Avatar>}
              <div className="flex flex-col h-full gap-0 ">
                <h3 className="text-primary text-[15px]">{user.name}</h3>
                <span className="text-gray">
                  {!user.isGroup
                    ? `@${user.users[0].userName}`
                    : `${user.users.length} People`}
                </span>
              </div>
            </div>
            {!user.isGroup &&
              selectedUsers &&
              selectedUsers.filter(
                (obj) => obj["userName"] == user.users[0].userName
              ).length > 0 && (
                <div>
                  <Check className="w-4 h-4 text-secondary" />
                </div>
              )}
          </li>
        ))}
    </ul>
  );
}
export default MessagesNewMessage;
