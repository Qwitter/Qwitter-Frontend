import { useState } from 'react';
import { Button, OptionsHeader, ShowSuggestionsNames, TextInput } from '..'
type Props = {
    userName: string
}

export function ChangeUsername({ userName }: Props) {
    const [inputValue, setInputValue] = useState(""); // State to hold the input value

    return (
        <div className=" w-full h-full border-r border-primary border-opacity-30 mb-20">
            <OptionsHeader header='Change username' />
            <form action="" >
                <div className='w-full p-3'>
                <TextInput placeHolder='Username' name='username' className='w-full mb-2' value={inputValue} />
                </div>
                <div className='border-y w-full p-4 border-primary border-opacity-20' >
                    <div className="h-14  mb-2">
                        <h2 className="text-primary text-xl font-extrabold text-start ">Suggestions</h2>
                    </div>
                    <ShowSuggestionsNames className='flex flex-col flex-wrap gap-4' email={userName + '@'} onSuggestionClick={setInputValue} showSuggestion={true} numberOfSuggestions={6} />
                </div>
                <div className='w-full p-4'>
                <Button variant="secondary" className='block ml-auto '>Save</Button>
                </div>
            </form>
        </div>
    )
}
