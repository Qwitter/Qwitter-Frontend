import { Skeleton } from "@/components/ui/skeleton";
import SearchInput from "@/components/SearchInput/SearchInput";
import { useParams, Navigate ,useLocation,Link} from 'react-router-dom'
export function Profile() {
    const location = useLocation();
    const { username } = useParams();
    if (username!.length > 20) {
        // Redirect or handle the case when the username is too long
        return (<><Navigate to="/home" /></>);
    }
    return (
        <>{/* this is the first col */}
            <div className="max-w-[600px] w-full h-full flex-grow border-r border-primary border-opacity-30 ">
                <div className="flex flex-row min-h-[50px] w-full sticky  top-[-1px] bg-black bg-opacity-60 backdrop-blur-xl z-50 border-b border-primary border-opacity-30">
                    HEADER
                </div>
                {/*work here */}
                <div>
                    <Link  to='settings/profile"' state={{previousLocation:location}} >
                        {/*edit button */}
                    </Link>
                </div>
                {/* this will be the routs and the bottom nav do it tomorrow
                <div>

    </div>*/}


            </div>
            <div className="max-w-[600px]  pb-16 relative flex flex-col z-0 w-[36.5%] max-largeX:hidden  h-full">
                <div className="w-full sticky top-0 z-50 bg-black   ">
                    <SearchInput />
                </div>
                <div className="px-4 py-3 rounded-lg mt-5 bg-dark-gray">
                    <Skeleton className="w-full  h-[120px] " />
                </div>
                <div className="px-4 py-3 rounded-lg mt-5 bg-dark-gray">
                    <Skeleton className="w-full  h-[500px] " />
                </div>
                <div className="px-4 py-3 rounded-lg mt-5 bg-dark-gray">
                    <Skeleton className="w-full  h-[300px] " />
                </div>
            </div>
        </>
    );
}
