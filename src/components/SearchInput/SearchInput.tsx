import { useRef, useState } from 'react';
import { TextInput } from '../TextInput/TextInput'
import { Search, X } from 'lucide-react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover"
import ClickAwayListener from 'react-click-away-listener';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { userArray } from '../../constants'
import { Link } from 'react-router-dom';
// import { Spinner } from '../Spinner';
type User = {
    username: string;
    imageUrl: string;
    name: string;
    isVerified: boolean;
    data?: User;
}


function SearchInput() {
    const [disabled, setDisabled] = useState(true);
    const [searchText, setSearchText] = useState("");
    const TextInputRef = useRef<HTMLInputElement>(null);
    const [isPopupOpen, setPopupOpen] = useState(false);


    const handleFocusIn = () => {
        setDisabled(false);
        setPopupOpen(true)
        setTimeout(() => {

            TextInputRef.current!.focus()
        })
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchText(value)
    }
    const handleXClick = () => {
        setPopupOpen(true)
        setSearchText("")
    }
    const handleClickAway = () => {
        setDisabled(true)
        setPopupOpen(false)
    }
    const handleLeftIcon = () => {
        setTimeout(() => {

            TextInputRef.current!.focus()
        })
    }

    return (
        <ClickAwayListener onClickAway={handleClickAway} >
            <div className="w-full max-h-[60px] "
            >
                <Popover open={isPopupOpen}  >

                    <PopoverTrigger className='w-full' onClick={() => { console.log("work"); setPopupOpen(true) }}>
                        <div className={`absolute top-0 left-0 z-[${disabled ? 100 : -100}] cursor-text w-full h-full opacity-0 bg-white`} onClick={handleFocusIn}
                        ></div>
                        <TextInput LeftIcon={Search}
                            ref={TextInputRef}
                            iconSize="18px"
                            disabled={disabled}
                            value={searchText}
                            leftIconFunction={handleLeftIcon}
                            onChange={handleTextChange}
                            type="homeSearch"
                            rightIconFunction={handleXClick}
                            {...{ RightIcon: (!disabled && searchText.length > 0) ? X : undefined }}
                            hasAnimation={false}
                            className="items-center w-full pt-[6px]"
                            inputClassName={`px-8 pr-[15%] sm:pr-[15%] pl-[13.5%] sm:pl-[14%] rounded-full ${!disabled ? 'border-blue-500' : ''}`} />
                    </PopoverTrigger>
                    <PopoverContent className='min-h-[100px] -translate-y-4 p-0
                       
                        w-[360px]  box-shadow bg-black  text-primary text-xs rounded-xl'>
                        <div className=' max-h-[calc(80vh-53px)] overflow-y-auto'>
                            <Results searchText={searchText} tags={["hello world", "#GazaNow", "killMe", "hello world", "#GazaNow", "killMe", "hello world", "#GazaNow", "killMe"]} />
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </ClickAwayListener>
    )
}
function Results({ searchText, tags }: { searchText: string, tags: string[] }) {
    return (
        <>
            {
                searchText.length == 0 ? <div className='p-3 pt-5 flex items-center justify-center '>
                    <span className='text-gray text-base'>Try searching for people, lists, or keywords</span>
                </div>

                    : <div className='w-full'>
                        < TagsResults tags={tags} text={searchText} />
                        <UsersResults users={userArray} text={searchText} />
                    </div>

            }
        </>)
}
function TagsResults({ tags, text }: { tags: string[], text: string }) {

    return (
        <ul className='w-full border-b-2  border-primary border-opacity-30 pb-1 mb-2'>
            {tags.length == 0 ?
                <li className="py-3 flex-grow px-4 items-center flex flex-row hover:bg-[#16181c] w-full transition-all cursor-pointer" >
                    <div className='w-10 h-10 flex justify-center items-center mr-3'>
                        <Search className=' w-5 h-5' strokeWidth='3px' />
                    </div>
                    <p className="text-base text-primary font-semibold">Search for"{text}"</p>

                </li>

                : tags.slice(0, 4).map((tag, index) => (
                    <li key={index} className="py-3 flex-grow px-4 items-center flex flex-row hover:bg-[#16181c] w-full transition-all cursor-pointer" >
                        <div className='w-10 h-10 flex justify-center items-center mr-3'>
                            <Search className=' w-5 h-5' strokeWidth='3px' />
                        </div>
                        <p className="text-base text-primary font-semibold">{tag}</p>

                    </li>
                ))

            }
        </ul>
    )
}
function UsersResults({ users, text }: { users: User[], text: string }) {

    return (
        <ul >

            {
                users && users.map(user => (
                    <li key={user.username} className="py-3 px-4 flex flex-row hover:bg-[#16181c] w-full transition-all cursor-pointer" >

                        <Avatar className="mr-4">
                            <AvatarImage className="w-10 h-10 rounded-full border-[#ffffee] border-[1px] border-solid" src={user.imageUrl} />
                        </Avatar><div className="flex flex-col h-full gap-1 ">
                            <h3 className="text-primary text-[15px]">{user.name}</h3>
                            <span className="text-gray">@{user.username}</span>
                        </div>
                    </li>
                ))

            }
            <li className="p-4 flex flex-row rounded-md hover:bg-[#16181c] w-full transition-all cursor-pointer" >
                <Link to={`/${text}`} className="text-primary text-[15px]">Go to @{text}</Link>
            </li>
        </ul>
    )
}
export default SearchInput