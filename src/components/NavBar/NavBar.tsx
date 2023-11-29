import { useContext, useEffect, useState } from 'react'
import { navLinks } from '../../constants'
import { Button } from '..';
import { Feather, LogOut } from 'lucide-react';
import Logo from "../../assets/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '@/contexts/UserContextProvider';
import { useLocation } from 'react-router-dom';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export function NavBar() {
    const { user } = useContext(UserContext)
    const [active, setActive] = useState("")
    const [isShown, setIsShown] = useState(false)
    const navigation = useNavigate()
    const location = useLocation()

    useEffect(() => {
        // Add a listener for changes to the screen size
        const mediaQuery = window.matchMedia("(max-width: 1280px)");
        // Set the initial value of the `isMobile` state variable
        setIsShown(mediaQuery.matches);

        // Define a callback function to handle changes to the media query
        const handleMediaQueryChange = (event: { matches: boolean | ((prevState: boolean) => boolean); }) => {
            setIsShown(event.matches);
        };

        // Add the callback function as a listener for changes to the media query
        mediaQuery.addEventListener("change", handleMediaQueryChange);

        // Remove the listener when the component is unmounted
        return () => {
            mediaQuery.removeEventListener("change", handleMediaQueryChange);
        };
    }, []);
    return (
        <div className='items-end flex flex-col min-w-[80px] max-h-[100vh] sticky top-0'>
            <div className='flex flex-col items-start xl:w-[275px] px-2 h-full min-h-[100vh] justify-between '>
                <div className='flex items-start w-full flex-col'>
                    <Link to="/">
                        <img src={Logo} alt="logo"
                            data-testid="logo"
                            className='w-16 h-16 p-[6px] mt-1 transition-all hover:bg-[#191919] hover:rounded-full font-extrabold'
                            onClick={() => { setActive("") }}
                        />

                    </Link>
                    <NavElements active={active} setActive={setActive} />
                    <Link to={'/compose/tweet'} state={{ previousLocation: location }} className='w-full'>
                        <Button variant="secondary" className='w-11/12 py-4 font-bold mt-3'> {isShown ? <Feather /> : 'Post'}</Button>
                    </Link>
                </div>

                <div className='my-3 p-3 w-full flex flex-row items-center hover:bg-[#191919] transition-all hover:rounded-full'>
                    <Popover>
                        <PopoverTrigger>
                            <img src={`http://${user?.profileImageUrl}`} alt="profilePic" className='w-10 h-10 rounded-full border-[#ffffee] border-[1px] border-solid' />
                        </PopoverTrigger>
                        <PopoverContent className='w-[240px] cursor-pointer hover:bg-[#16181c] p-3 text-primary' onClick={() => { navigation("/i/flow/logout") }}>
                            Log out {user?.userName}
                        </PopoverContent>
                    </Popover>
                    <div className=' flex-col mx-3 hidden xl:flex'>
                        <h3 className='font-semibold tracking-[2px] text-[15px]'>{user?.name}</h3>
                        <span className='text-gray text-[15px]'>@{user?.userName}</span>
                    </div>
                    <div className='w-2/4  row justify-end hidden xl:flex ' onClick={() => { navigation("/i/flow/logout") }}>
                        <LogOut className='cursor-pointer' />
                    </div>
                </div>
            </div>
        </div >
    )
}
function NavElements({ active, setActive }: { active: string, setActive: React.Dispatch<React.SetStateAction<string>> }) {
    return (
        <ul className='flex flex-col w-full '>
            {navLinks.map((link) => (
                <Link to={`/${link.title}`} key={link.id} className='group' onClick={() => setActive(link.title)}>
                    <div className='flex flex-row p-3 items-center max-xl:justify-center group-hover:bg-[#191919]  group-hover:rounded-full transition-all '>
                        <div className='relative'>
                            <link.icon {...active == link.title ? link.clicked : {}} />
                            {link.notificationCount > 0 && (
                                <div className='absolute top-[-6px] right-[-6px] bg-secondary rounded-full w-[17px] h-[17px] flex items-center justify-center text-white text-[11px]'>
                                    {link.notificationCount > 9 ? "+9" : link.notificationCount}
                                </div>
                            )}
                        </div>
                        <li className={active == link.title ? 'text-xl text-primary ml-5 mr-4 font-bold hidden xl:block' : `text-xl text-primary ml-5 mr-4 hidden xl:block`} >
                            {link.title}
                        </li>
                    </div>
                </Link>
            ))}
        </ul>
    )
}