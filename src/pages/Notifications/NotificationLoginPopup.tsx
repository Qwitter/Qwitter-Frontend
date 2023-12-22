import { Button, PopUpContainer } from '@/components'
import Logo from "../../assets/logo.png";
import { User } from '@/models/User';
import { Link, useNavigate } from 'react-router-dom';


export default function NotificationLoginPopup() {
    const user = JSON.parse(localStorage.getItem("user")!) as User;
    const navigate = useNavigate();

    return (
        <PopUpContainer
            show={true}
            className='py-10'
        >
            <div className='flex flex-col items-center w-full h-full'>
                <div className='w-full flex justify-center my-2'>
                    <img src={Logo} alt="logo" className='w-14 h-14' />
                </div>
                <div className='flex flex-col items-start w-full h-full m-8  '>
                    <span className='text-[28px] font-bold'>New Login Alert</span>
                    <span className='text-[15px] text-gray'>
                        There was a login to your account @{user.userName} from a new device.

                    </span>
                    <span className='text-[15px] text-gray flex flex-col gap-2 '>
                        If this was you
                        <li className='pl-2 '>
                            You can ignore this message. There's no need to take any action.
                        </li>
                        If this wasn't you
                        <li className='pl-2'>
                            <Link to="/settings/password" className='cursor-pointer text-secondary hover:underline'>  Change your password</Link> now to protect your account. 
                        </li>
                        <span>You'll be logged out of all your active X sessions except the one you're using at this time.</span>
                    </span>
                </div>
                <Button variant={'default'} className='w-full py-3 text-[18px]' onClick={()=>navigate(-1)}>Got it</Button>
            </div>
        </PopUpContainer>

    )
}