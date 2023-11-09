import { ChevronRight } from 'lucide-react'
import { OptionsHeader } from '..'
import { Link } from 'react-router-dom'
type Props = {
    email: string,
    userName: string
}

export function AccountInformation({ email, userName }: Props) {

    return (
        <div className=" w-full h-full border-r border-primary border-opacity-30 mb-20">
            <OptionsHeader header='Account information' />
            <ul className='flex flex-col w-full'>

                <Link to={`/settings/screen_name`}  className='group '>
                    <div className='flex flex-row p-3 w-full justify-between items-center group-hover:bg-[#191919] transition-all '>
                        <div className='flex flex-col items-start'>

                                <li className={`text-[15px] text-primary`} >
                                    Username
                                </li>
                                <p className={`text-[13px] text-gray`}>@{userName}</p>
                        </div>
                        <ChevronRight color='grey' />
                    </div>
                </Link>
                <Link to={`/settings/email`}  className='group '>
                    <div className='flex flex-row p-3 w-full justify-between items-center group-hover:bg-[#191919] transition-all '>
                        <div className='flex flex-col items-start'>

                                <li className={`text-[15px] text-primary`} >
                                    Email
                                </li>
                                <p className={`text-[13px] text-gray`}>{email}</p>
                        </div>
                        <ChevronRight color='grey' />
                    </div>
                </Link>

            </ul>


        </div>
    )
}
