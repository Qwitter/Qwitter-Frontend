import { HeaderButton } from '../../models/PopUpModel'
import { Button, PopUpContainer, TextInput } from '../'

export function PasswordRestPopUp() {


    return (
        <PopUpContainer show={true} headerButton={HeaderButton.close} showLogo={true} className='h-[90%]  flex flex-col  justify-between' >
            <div className='flex flex-col w-full'>
                <h2 className=' font-bold text-primary text-[32px] mb-1 mt-5'>Choose a new Password</h2>
                <p className='text-gray mb-5 text-sm' >Make sure your new password is 8 characters or more. Try including numbers, letters, and punctuation marks for a strong password.</p>
                <p className='text-gray mb-5 text-sm' >You'll be logged out of all active X sessions after your password is changed..</p>
                <div className=' w-full  flex flex-col gap-5' >
                    <div className='w-full'>
                        <TextInput placeHolder='New password' name='New password' className='w-full mb-2' type='password' />
                    </div>
                    <div className='w-full'>
                        <TextInput placeHolder='Confirm password' name='Confirm password' className='w-full mb-2' type='password' />
                    </div>
                </div>
            </div>
            <Button variant={'default'} className='w-full py-6'>Change password</Button>
        </PopUpContainer>
    )
}