import { Button, TextInput } from '../'

type prob = {
    nextStep:() => void;
}
export function FindEmailPopUp({ nextStep }:prob) {
    return (
        <div  className='h-full flex flex-col  justify-between' >
            <div className='flex flex-col w-full'>
                <h2 className=' font-bold text-primary text-[32px] mb-1 mt-5'>Find your Qwitter account</h2>
                <p className='text-gray mb-5' >Enter the email, phone number, or username associated with your account to change your password.</p>
                <TextInput placeHolder='Email,phone number,or username' name='username' className='w-full' />
            </div>
            <Button variant={'default'} className='w-full py-3' onClick={()=>nextStep()}>Next</Button>
        </div>
    )
}