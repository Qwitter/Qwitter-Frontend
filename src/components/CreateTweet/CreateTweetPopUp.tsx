import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { getHashtags, getUsersSuggestions } from "@/lib/utils";
import { useContext, useEffect } from "react";
import { UserContext } from "@/contexts/UserContextProvider";
import { Spinner } from "../Spinner";
type CreateTweetPopUpProps = {
  popUp: {
    visible: boolean;
    content: string;
    index: number;
    position: {
      top: number;
      left: number;
    };
  };
  mode?: "createTweet" | "Messages"
  closePopup: () => void;
  handleUserClick: (username: string) => void;
}

type User = {
  userName: string;
  profileImageUrl: string;
  name: string;
  isVerified: boolean;
  data?: User;
}

type ShowUsersSuggestionsProps = {
  onUserClick: (username: string) => void;
  closePopup: () => void;
  username?: string;
  tag?: string;
};

function CreateTweetPopUp({ popUp, closePopup, handleUserClick, mode = "createTweet" }: CreateTweetPopUpProps) {

  return (
    <div id="popUp">

      {popUp.visible && (popUp.content[0] === '@' || popUp.content[0] === '#') && (
        <div style={{ ...{ [mode == "Messages" ? 'bottom' : 'top']: mode === "Messages" ? `${popUp.position.top + 5}px` : `${popUp.position.top + 40}px` }, left: `${popUp.position.left + 380 > window.innerWidth ? '25%' : `${popUp.position.left}px`}` }} className=
          "absolute min-w-[380px] max-sm:min-w-[200px] max-h-[287px] min-h-fit overflow-y-auto box-shadow z-40 bg-black rounded-sm text-primary text-xs"
        >
          {
            popUp.content[0] === '@' &&
            <ShowUsersSuggestions username={popUp.content} closePopup={closePopup} onUserClick={handleUserClick} />
          }
          {popUp.content[0] === '#' &&
            <ShowTagsSuggestions tag={popUp.content} closePopup={closePopup} onUserClick={handleUserClick} />
          }
        </div>
      )}
    </div>
  );
}
function ShowUsersSuggestions({ onUserClick, username, closePopup }: ShowUsersSuggestionsProps) {
  const { token } = useContext(UserContext)
  const { VITE_DEFAULT_IMAGE } = import.meta.env;
 
  const {
    isPending,
    data,
    refetch
  } = useQuery<User[]>({
    queryKey: ["UsersSuggestions"],
    queryFn: () => getUsersSuggestions(token!, username!.slice(1))
    ,
  });
  useEffect(() => {

    refetch();
  }, [username, refetch]);

  if (isPending) {
    return (
      <div className="w-full h-[180px] p-8">
        <Spinner />
      </div>
    );
  }
  if (data && data.length == 0) {
    closePopup();
  }

  return (
    <ul >

      {
        !data || data.length == 0 ? <div className='w-full h-[180px] p-8'>
          <Spinner />
        </div> : data!.map(user => (
          <li key={user.userName} className="py-3 px-4 flex flex-row hover:bg-[#16181c] w-full transition-all cursor-pointer" onClick={() => onUserClick("@" + user.userName)}>

            <Avatar className="mr-4">
              <AvatarImage className="w-10 h-10 rounded-full border-[#ffffee] border-[1px] border-solid" src={user.profileImageUrl ||VITE_DEFAULT_IMAGE} />
            </Avatar><div className="flex flex-col h-full gap-1 ">
              <h3 className="text-primary text-[15px]">{user.name}</h3>
              <span className="text-gray">@{user.userName}</span>
            </div>
          </li>
        ))

      }
    </ul>
  )
}
function ShowTagsSuggestions({ onUserClick, tag, closePopup }: ShowUsersSuggestionsProps) {
  const { token } = useContext(UserContext)
  const {
    isPending,
    data,
    refetch
  } = useQuery<{ count: number, text: string, entityId: string }[]>({
    queryKey: ["getHashtags"],
    queryFn: () => getHashtags(token!, tag!.slice(1))
    ,
  });
  useEffect(() => {
    refetch();
  }, [tag, refetch]);

  if (isPending) {
    return (
      <div className="w-full h-[180px] p-8">
        <Spinner />
      </div>
    );
  }
  if (data && data.length == 0) {
    closePopup();
  }

  return (
    <ul>
      {!data || data.length == 0 ? (
        <div className="w-full h-[180px] p-8">
          <Spinner />
        </div>
      ) : (
        data!.map((tag, index) => (
          <li
            key={index}
            className="py-3 px-4 flex flex-row hover:bg-[#16181c] w-full transition-all cursor-pointer"
            onClick={() => onUserClick(tag.text)}
          >
            <p className="text-base text-primary">{tag.text}</p>
          </li>
        ))
      )}
    </ul>
  );
}
export default CreateTweetPopUp;
