import {  useState } from 'react'
import { Button, PopUpContainer, ShowSuggestionsNames, TextInput } from '../'
type Props = { 
    email: string;
    setUsername?: React.Dispatch<React.SetStateAction<string>>;
}

export function UsernameSuggestion(props: Props)
{
    const [inputValue, setInputValue] = useState(""); // State to hold the input value


    return (
        <PopUpContainer show={true} showLogo={true} className='h-[90%]  flex flex-col  justify-between' >
            <div className='flex flex-col w-full'>
                <h2 className=' font-bold text-primary text-[32px] mb-1 mt-5'>What should we call you?</h2>
                <p className='text-gray mb-5' >Your @username is unique. You can always change it later.</p>
                <TextInput placeHolder='Username' name='username' className='w-full' value={inputValue} />
                <ShowSuggestionsNames onSuggestionClick={setInputValue} email = {props.email} />
            </div>
            <Button variant={'default'} className='w-full py-6'>Next</Button>
        </PopUpContainer>
    )
}