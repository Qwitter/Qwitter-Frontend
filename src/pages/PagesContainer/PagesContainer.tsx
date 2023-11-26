import { NavBar } from '../../components'
import { Route, Routes, useLocation } from "react-router-dom";
import TweetsList from '@/components/TweetsList/TweetsList';
import { Settings } from '../Settings/Settings';

export function PagesContainer() {
    const location = useLocation();
    const previousLocation = location.state?.previousLocation;
    return (
        <> {location.pathname!=='/'&&
            <div className='w-full flex flex-row min-h-[750px] z-0 justify-center'>
            <NavBar />

            <div className=" border-l-[0.5px] border-primary border-opacity-30 max-mobile:w-full">
                <div className="w-auto mobile:w-[920px] h-full flex flex-row large2X:w-[990px] max-largeX:max-w-[600px] flex-shrink-1 flex-grow-2">

                    <Routes location={previousLocation || location}>
                        {/* this is the main routs*/}
                        <Route path="/Settings/*" element={<Settings />} />
                        <Route index path="/home" element={<TweetsList />} />
                    </Routes>
                </div>
            </div>
        </div>
        }
        </>

    )
}