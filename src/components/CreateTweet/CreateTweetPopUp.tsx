import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { userArray } from "../../constants"
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
    handleUserClick:(usermae:string)=>void
}
type ShowUsersSuggestionsProps = {
    onUserClick: (username: string) => void;
    isTag:boolean;
};
function CreateTweetPopUp({ popUp,handleUserClick }: CreateTweetPopUpProps) {

    return (
        <div id="popUp">

            {popUp.visible && (
                <div style={{ top: `${popUp.position.top}px`, left: `${popUp.position.left}px` }} className=
                    "absolute min-w-[380px] h-[287px] min-h-[100px] overflow-y-auto box-shadow z-40 bg-black rounded-sm text-primary text-xs"
                >
                    <ShowUsersSuggestions onUserClick={handleUserClick} isTag={popUp.content[0]=='#'} />

                </div>
            )}
        </div>
    );
}
function ShowUsersSuggestions({ onUserClick,isTag }: ShowUsersSuggestionsProps) {
    return (
        <ul >
            {
                userArray.map(user => (
                    <li key={user.username} className="py-3 px-4 flex flex-row hover:bg-[#16181c] w-full transition-all cursor-pointer" onClick={()=>onUserClick(!isTag?user.username:user.tag)}>

                        {!isTag?(<><Avatar className="mr-4">
                            <AvatarImage className="w-10 h-10 rounded-full border-[#ffffee] border-[1px] border-solid" src={user.imageUrl} />
                        </Avatar><div className="flex flex-col h-full gap-1 ">
                                <h3 className="text-primary text-[15px]">{user.name}</h3>
                                <span className="text-gray">@{user.username}</span>
                            </div></>):<p className="text-base text-primary">#{user.tag}</p>}

                    </li>
                ))

            }
        </ul>
    )
}
export default CreateTweetPopUp 