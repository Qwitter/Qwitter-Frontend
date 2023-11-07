import { accountOptions } from '../../constants'
import { ChevronRight, MoveLeft } from 'lucide-react'

export function YourAccount() {

    return (
        <div className=" w-full h-full border-r border-primary border-opacity-30">
            <div className="p-4 flex flex-row gap-8 items-center">
                <MoveLeft  className='max-largeX:inline-block hidden max-w-[56px] '/>
                <h1 className="text-primary text-xl font-bold text-start ">Your Account</h1>
            </div>
            <div>
                <h3 className='text-gray text-sm px-4 py-3'>See information about your account, download an archive of your data, or learn about your account deactivation options</h3>
            </div>
            <Options />
        </div>
    )
}
function Options() {
    return (
        <ul className='flex flex-col w-full'>
            {accountOptions.map((link) => (
                <a href={`#${link.title}`} key={link.id} className='group ' >
                    <div className='flex flex-row p-3 w-full justify-between items-center group-hover:bg-[#191919] transition-all '>
                        <div className='flex flex-row items-center'>
                            <div className='mr-2 w-12 h-12 flex justify-center items-center '>
                            <link.icon className='w-5 h-5 text-gray' />
                            </div>
                            <div >
                                <li className={`text-[15px] text-primary`} >
                                    {link.title}
                                </li>
                                <p className={`text-[13px] text-gray`}>{link.description}</p>
                            </div>
                        </div>
                        <ChevronRight color='grey' />
                    </div>
                </a>
            ))}
        </ul>
    )
}