import { Button, OptionsHeader, TextInput } from '..'
type Props = {
    email: string
}

export function UpdateEmail({ email }: Props) {

    return (
        <div className=" w-full h-full border-r border-primary border-opacity-30 mb-20">
            <OptionsHeader header='Change username' />

                <div className='w-full p-3 pb-0'>
                    <TextInput
                        placeHolder='current'
                        name='email'
                        className='w-full mb-2'
                        value={email} 
                        readOnly
                        
                        />
                </div>
                <div className='border-t w-full p-4 border-primary border-opacity-20' >
                <a className='block text-center text-secondary '>Update email address</a>

                </div>

        </div>
    )
}
