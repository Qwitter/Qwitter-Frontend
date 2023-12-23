import { cn } from '@/lib'
import { convertNumberToShortForm } from '@/lib/utils'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@radix-ui/react-hover-card'
import { FollowButton } from '../FollowButton/FollowButton'
import { Link } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
type Props = {
    userName: string;
    name: string;
    profileImageUrl: string;
    description: string;
    followingCount: number;
    followersCount: number;
    isFollowing: boolean;
};

export const UserNameHoverCard = ({ userName, name, profileImageUrl, description, isFollowing, followingCount, followersCount }: Props) => {
    const { VITE_DEFAULT_IMAGE } = import.meta.env;
    const queryClient = useQueryClient();
    const token = localStorage.getItem("token");
    const invalidateUserData = () => {
        queryClient.invalidateQueries({
            queryKey: ["profile", token, userName],
        });

        queryClient.invalidateQueries({
            queryKey: ["tweets"],
        });
    };
    return (
        <HoverCard>
            <HoverCardTrigger className="hover:underline">
                <Link to={`/profile/${userName}`} onClick={(e)=>{e.stopPropagation();}}>
                    {name}
                </Link>
            </HoverCardTrigger>
            <HoverCardContent className="w-72 bg-black text-start box-shadow p-4 rounded-lg">
                <Link to="#" className="w-full cursor-default flex flex-col">
                    <div className="flex w-full justify-between">
                        <Avatar className="mb-5">
                            <AvatarImage className="w-16 aspect-square  rounded-full overflow-hidden" src={profileImageUrl || VITE_DEFAULT_IMAGE} />

                        </Avatar>

                        <FollowButton
                            isFollowing={isFollowing}
                            username={userName}
                            className={cn("h-[35px] min-w-20")}
                            onClick={invalidateUserData}
                        />
                    </div>
                    <Link
                        to={`/profile/${userName}`}
                        className="hover:underline self-start"
                    >
                        <h3 className="font-semibold">{name}</h3>
                    </Link>
                    <span className="text-gray text-sm">
                        @{userName}
                    </span>
                    <p className="my-4">{description}</p>
                    <div className="flex items-center">
                        <Link to={`/profile/${userName}/following`} className="text-primary hover:underline">
                            {convertNumberToShortForm(followingCount)}{" "}
                            <span className="text-gray">Following</span>
                        </Link>
                        <Link to={`/profile/${userName}/followers`} className="text-primary mx-2 hover:underline">
                            {convertNumberToShortForm(followersCount)}{" "}
                            <span className="text-gray">Followers</span>
                        </Link>
                    </div>
                </Link>
            </HoverCardContent>
        </HoverCard>
    )
}