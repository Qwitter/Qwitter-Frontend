import { Button, TextInput } from '.'

export function CheckPassword() {
    return (
        <div className=" w-full border-r border-primary border-opacity-30 ">
            <div className="p-4 flex flex-row gap-8 items-center">
                <h1 className="text-primary text-xl font-extrabold text-start  ">Confirm your password</h1>
            </div>
            <div className='border-b border-primary border-opacity-20'>
                <h3 className='text-gray text-sm px-4 pb-3 pt-2 '>Please enter your password in order to get this</h3>
            </div>
            <form action="" className='p-3'>
                <TextInput placeHolder='Password' name='Password' type='password' />
                <a href="" className='text-secondary text-[13px] pl-2 block'>Forget password?</a>
                <Button variant="secondary" className='block ml-auto '>Confirm</Button>
            </form>
        </div>
    )
}