import { FollowCard } from '@/components/FollowCard/FollowCard'
import SearchInput from '@/components/SearchInput/SearchInput'
import { TrendCard } from '@/components/TrendCard/TrendCard'
import { useParams } from "react-router-dom";

export default function SideBar({ page }: { page: string }) {
    const { username } = useParams();
    if (page == "connection") {
        return(
        <div className="max-w-[600px]  pb-16 relative flex flex-col z-0 w-[36.5%] max-largeX:hidden max-large2X:w-[32.5%]  h-full">
            <div className="mt-5 rounded-lg bg-dark-gray">
                <TrendCard />
            </div>
        </div>
        )
    }
    else
    return (
        (username && username.length >= 16) ? <></> :
            <div className="max-w-[600px]  pb-16 relative flex flex-col z-0 w-[36.5%] max-largeX:hidden max-large2X:w-[32.5%]  h-full">
                {page != "explore" && <>

                    <div className="w-full sticky top-0 z-50 bg-black   ">
                        <SearchInput />
                    </div>
                    <div className="mt-5 rounded-lg bg-dark-gray">
                        <TrendCard />
                    </div>

                </>
                }
                {page != "tweet" &&
                    <div className="mt-5 rounded-lg bg-dark-gray">
                        <FollowCard />
                    </div>
                }
            </div>
    )
}