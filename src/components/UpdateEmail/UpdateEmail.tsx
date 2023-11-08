import {  OptionsHeader, TextInput } from '..'
type Props = {
    email: string
}

export function UpdateEmail({ email }: Props) {

    return (
        <div className=" w-full h-full border-r border-primary border-opacity-30 mb-20">
            <OptionsHeader header='Change username' />

                <div className='w-full p-3 pb-0 border-b border-primary border-opacity-20'>
                    <TextInput
                        placeHolder='current'
                        name='email'
                        className='w-full mb-2'
                        value={email} 
                        disabled
                        
                        />
                </div>
                <a className='block text-center cursor-pointer transition-all text-secondary hover:bg-[#031019] p-4'>Update email address</a>


        </div>
    )
}
