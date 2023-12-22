import { useContext, useEffect, useRef, useState } from "react";
import { TextInput } from "../TextInput/TextInput";
import { Search,  X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ClickAwayListener from "react-click-away-listener";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn, getHashtags, getUsersSuggestions } from "@/lib/utils";
import { UserContext } from "@/contexts/UserContextProvider";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "../Spinner";
import { User } from "@/models/User";
import { AvatarFallback } from "../ui/avatar";

type Tags = {
  count: number;
  entityId: string;
  text: string;
};

function SearchInput({
  isSearchPage = false,
  value,
}: {
  isSearchPage?: boolean;
  value?: string;
}) {
  const [disabled, setDisabled] = useState(true);
  const [searchText, setSearchText] = useState("");
  const TextInputRef = useRef<HTMLInputElement>(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const handleFocusIn = () => {
    setDisabled(false);
    setPopupOpen(true);
    setTimeout(() => {
      TextInputRef.current!.focus();
    });
  };
  useEffect(() => {
    if (value) {
      setSearchText(value);
    }
  }, [value]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
  };
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      if (searchText.length > 0) {
        setDisabled(true);
          setPopupOpen(false);          
        if (pathname.toLowerCase().includes("people"))
          navigate(`/Explore/search/People/?q=${searchText}`);
        else navigate(`/Explore/search/Top/?q=${searchText}`);
      }
    }
  };
  const handleXClick = () => {
    setPopupOpen(true);
    setSearchText("");
  };
  const handleClickAway = () => {
    setDisabled(true);
    setPopupOpen(false);
  };
  const handleLeftIcon = () => {
    setTimeout(() => {
      TextInputRef.current!.focus();
    });
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className="w-full max-h-[60px] ">
        <Popover open={isPopupOpen}>
          <PopoverTrigger
            className="w-full"
            onClick={() => {
              setPopupOpen(true);
            }}
            data-testid="searchBar"
          >
            <div
              className={`absolute top-0 left-0 z-[${
                disabled ? 100 : -100
              }] cursor-text w-full h-full opacity-0 bg-white`}
              onClick={handleFocusIn}
            ></div>
            <TextInput
              LeftIcon={Search}
              ref={TextInputRef}
              iconSize="18px"
              disabled={disabled}
              onKeyDown={handleEnter}
              value={searchText}
              leftIconFunction={handleLeftIcon}
              onChange={handleTextChange}
              type="homeSearch"
              rightIconFunction={handleXClick}
              {...{
                RightIcon: !disabled && searchText.length > 0 ? X : undefined,
              }}
              hasAnimation={false}
              className="items-center w-full pt-[6px]"
              inputClassName={`px-8 pr-[15%] sm:pr-[15%] pl-[13.5%] sm:pl-[14%] rounded-full ${
                !disabled ? "border-blue-500" : ""
              }`}
            />
          </PopoverTrigger>
          <PopoverContent
            className={cn(
              `min-h-[100px] -translate-y-4 p-0
                        box-shadow bg-black  text-primary text-xs rounded-xl`,
              isSearchPage
                ? " w-[550px] max-lg:w-[70vw]  max-w-[534px] "
                : " w-[360px] "
            )}
          >
            <div className=" max-h-[calc(80vh-53px)] overflow-y-auto">
              <Results searchText={searchText} closePopUp={() => setPopupOpen(false)} />
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </ClickAwayListener>
  );
}
function Results({ searchText ,closePopUp}: { searchText: string;closePopUp:()=>void }) {
  return (
    <>
      {searchText.length == 0 ? (
        <div className="p-3 pt-5 flex items-center justify-center ">
          <span className="text-gray text-base" data-testid="searchMessage">
            Try searching for people, lists, or keywords
          </span>
        </div>
      ) : (
        <div className="w-full">
          <TagsResults text={searchText} closePopUp={closePopUp} />
          <div className="w-full h-[2px] bg-primary bg-opacity-20 my-1"></div>
          <UsersResults text={searchText} />
        </div>
      )}
    </>
  );
}
function TagsResults({ text,closePopUp }: { text: string;closePopUp:()=>void }) {
  const { token } = useContext(UserContext);
  const navigate = useNavigate();
  const { isPending, data: tags, refetch } = useQuery<Tags[]>({
    queryKey: ["getHashtagsSearch", text],
    queryFn: () => getHashtags(token!, text),
  });

  useEffect(() => {
    refetch();
  }, [text, refetch, token]);

  if (isPending) {
    return (
      <div className="w-full h-[180px] p-8">
        <Spinner />
      </div>
    );
  }

  return (
    <ul className="w-full " data-testid="trends">
      {tags && tags.length == 0 ? (
        <li className="py-3 flex-grow px-4 items-center flex flex-row hover:bg-[#16181c] w-full transition-all cursor-pointer">
          <div className="w-10 h-10 flex justify-center items-center mr-3">
            <Search className=" w-5 h-5" strokeWidth="3px" />
          </div>
          <p className="text-base text-primary font-semibold">
            Search for"{text}"
          </p>
        </li>
      ) : (
        tags &&
        tags.length > 0 &&
        tags.slice(0, 4).map((tag) => (
          <li
            data-testid="trend-item"
            key={tag.entityId}
            className="py-3 flex-grow px-4 items-center flex flex-row hover:bg-[#16181c] w-full transition-all cursor-pointer"
            onClick={() => {
              navigate(`/Explore/search/top/?q=${tag.text.startsWith("#") ? tag.text.slice(1): tag.text}`);
              closePopUp()
            }}
          >
            <div className="w-10 h-10 flex justify-center items-center mr-3">
              <Search className=" w-5 h-5" strokeWidth="3px" />
            </div>
            <p className="text-base text-primary font-semibold">{tag.text}</p>
          </li>
        ))
      )}
    </ul>
  );
}
function UsersResults({ text }: { text: string }) {
  const { token } = useContext(UserContext);
  const navigate = useNavigate();
  const { isPending, data, refetch } = useQuery<User[]>({
    queryKey: ["UsersSuggestionsSearch", text],
    queryFn: () => getUsersSuggestions(token!, text!),
  });

  useEffect(() => {
    refetch();
  }, [text, refetch, token]);

  if (isPending) {
    return (
      <div className="w-full h-[180px] p-8">
        <Spinner />
      </div>
    );
  }

  return (
    <ul data-testid="users">
      {data &&
        data.map((user) => (
          <li
            data-testid="user-item"
            key={user.userName}
            className="py-3 px-4 flex flex-row hover:bg-[#16181c] w-full transition-all cursor-pointer"
            onClick={() => navigate(`/Profile/${user.userName}`)}
          >
            <Avatar className="mr-4">
              <AvatarImage
                className="w-10 h-10 rounded-full border-[#ffffee] border-[1px] border-solid"
                src={user.profileImageUrl}
              />
              <AvatarFallback className="text-white w-10 h-10" >
                {user.name.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col h-full gap-1 ">
              <h3 className="text-primary text-[15px]">{user.name}</h3>
              <span className="text-gray">@{user.userName}</span>
            </div>
          </li>
        ))}
      <li
        className="p-4 flex flex-row rounded-md hover:bg-[#16181c] w-full transition-all cursor-pointer"
        data-testid="targetUser"
      >
        <Link to={`/profile/${text}`} className="text-primary text-[15px]">
          Go to @{text}
        </Link>
      </li>
    </ul>
  );
}
export default SearchInput;
