import { Link } from 'react-router-dom'
import { Button, OptionsHeader, TextInput } from '..'

export function ChangePassword() {

    return (
        <div className=" w-full h-full border-r border-primary border-opacity-30 mb-20">
            <OptionsHeader header='Change your password' />
            <form action="" >
                <div className='w-full p-3'>
                    <TextInput placeHolder='Current password' name='Current password' className='w-full mb-2' type='password' />
                    <Link to="/i/flow/password_reset" className='text-secondary text-[13px] pl-4 block'>Forget password?</Link>

                </div>
                <div className='border-y w-full p-4 border-primary border-opacity-20 flex flex-col gap-5' >
                    <div className='w-full'>
                        <TextInput placeHolder='New password' name='New password' className='w-full mb-2' type='password' />
                    </div>
                    <div className='w-full'>
                        <TextInput placeHolder='Confirm password' name='Confirm password' className='w-full mb-2' type='password' />
                    </div>
                </div>
                <div className='w-full p-4'>
                    <Button variant="secondary" className='block ml-auto '>Save</Button>
                </div>
            </form>
        </div>
    )
}
