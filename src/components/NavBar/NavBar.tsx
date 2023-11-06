import { useState } from 'react'
import { navLinks } from '../../constants'
// import { Logo } from '../../assets';
// import { Link } from 'react-router-dom'
import { Button } from '..';
import { LogOut } from 'lucide-react';
import Logo from "../../assets/logo.png";


type Props = {
    profilePic: string,
    userName: string,
    name: string,
}

export function NavBar({ profilePic, userName, name }: Props) {
    const [active, setActive] = useState("")
    return (
        <div className='w-[26.2%] max-xl:w-[10%] max-lg:w-[21%] items-end flex flex-col'>
            <div className='flex flex-col items-start xl:w-[275px] px-2 h-full justify-between '>
                <div className='flex items-start w-full flex-col'>
                    <a href="">
                        <img src={Logo} alt="logo" //use logo here
                            className='w-16 h-16 p-[6px] mt-1 transition-all hover:bg-[#191919] hover:rounded-full font-extrabold'
                            onClick={() => { setActive("") }}
                        />
                    </a>
                    <NavElements active={active} setActive={setActive} />
                    <Button variant="secondary" className='w-11/12 py-4 font-bold h-12 mt-3  max-xl:hidden'>Post</Button>
                </div>
                <div className='my-3 p-3 w-full flex flex-row items-center hover:bg-[#191919] transition-all hover:rounded-full'>
                    <img src={profilePic} alt="profilePic" className='w-10 h-10 rounded-full border-[#ffffee] border-[1px] border-solid' />
                    <div className=' flex-col mx-3 hidden xl:flex'>
                        <h3 className='font-semibold tracking-[2px] text-[15px]'>{name}</h3>
                        <span className='text-gray text-[15px]'>@{userName}</span>
                    </div>
                    <a href='logout' className='w-2/4  row justify-end hidden xl:flex '>
                        <LogOut className='cursor-pointer' />
                    </a>
                </div>
            </div>
        </div >
    )
}
function NavElements({ active, setActive }:{active:string,setActive:React.Dispatch<React.SetStateAction<string>>}) {
    return (
        <ul className='flex flex-col w-full '>
            {navLinks.map((link) => (
                <a href={`#${link.title}`} key={link.id} className='group' onClick={() => setActive(link.title)}>
                    <div className='flex flex-row p-3 items-center group-hover:bg-[#191919]  group-hover:rounded-full transition-all '>
                        <link.icon {...active == link.title ? link.clicked : {}} />
                        <li className={active == link.title ? 'text-xl text-primary ml-5 mr-4 font-bold hidden xl:block' : `text-xl text-primary ml-5 mr-4 hidden xl:block`} >
                            {link.title}
                        </li>
                    </div>
                </a>
            ))}
        </ul>
    )
}