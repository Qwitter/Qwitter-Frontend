import { useContext } from 'react'
import { OptionsHeader, TextInput } from '..'
import { UserContext } from '@/contexts/UserContextProvider'
import {  useLocation, useNavigate } from 'react-router-dom';


export function UpdateEmail() {
    const { user } = useContext(UserContext);
    const location = useLocation();
    const navigate =useNavigate()
    location.pathname = "/settings/email"
    return (
        <div className=" w-full h-full border-r border-primary border-opacity-30 mb-20">
            <OptionsHeader header='Change email' />

            <div className='w-full p-3 pb-0 border-b border-primary border-opacity-20'>
                <TextInput
                    placeHolder='current'
                    name='email'
                    className='w-full mb-2'
                    value={user?.email}
                    disabled

                />
            </div>

            <div className='block text-center cursor-pointer transition-all text-secondary hover:bg-[#031019] p-4'
                onClick={() => { navigate("/i/flow/add_email", { state: { previousLocation: location } }); }}
            >
                Update email address</div>

        </div>
    )
}
