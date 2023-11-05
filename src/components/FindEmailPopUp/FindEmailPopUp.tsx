import { Button, PopUpContainer, TextInput } from '../'
import { HeaderButton } from "../../models/PopUpModel";


export function FindEmailPopUp()
{


    return (
        <PopUpContainer headerButton={HeaderButton.close} show={true} showLogo={true}  className='h-[90%]  flex flex-col  justify-between' >
            <div className='flex flex-col w-full'>
                <h2 className=' font-bold text-primary text-[32px] mb-1 mt-5'>Find your Qwitter account</h2>
                <p className='text-gray mb-5' >Enter the email, phone number, or username associated with your account to change your password.</p>
                <TextInput placeHolder='Email,phone number,or username' name='username' className='w-full' />
            </div>
            <Button variant={'default'} className='w-full py-6'>Next</Button>
        </PopUpContainer>
    )
}