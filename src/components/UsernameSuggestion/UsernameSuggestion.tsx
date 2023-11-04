import { useEffect, useState } from 'react'
import { Button, PopUpContainer, TextInput } from '../'
import { generateUsernames } from '../../lib'
type Props = { 
    email: string;
    setUsername?: React.Dispatch<React.SetStateAction<string>>;
}
type PropsShowSuggestion = { 
    email: string;
    onSuggestionClick: React.Dispatch<React.SetStateAction<string>>;
}
function generateUserName(email:string): string[] 
{
    const uniqueUserNames = [];
    while (uniqueUserNames.length<7){
        const name = generateUsernames(email,1)[0];
        if(checkForAvailability(name))
        uniqueUserNames.push(name);
    }
    return uniqueUserNames;
}

function checkForAvailability(generatedUsername: string) 
{
    generatedUsername
    return Math.floor(Math.random()*2);
}


function ShowSuggestion( {onSuggestionClick,email}:PropsShowSuggestion) {
    const [showAllSuggestion, setShowAllSuggestion] = useState(false)
    const [size, setsize] = useState(3)
    const [suggestions, setSuggestion] = useState<string[]>([])

    function handleShowMore() {
        setShowAllSuggestion(!showAllSuggestion)
        setsize(5)
    }
    useEffect(() => {
        const uniqueNames =  generateUserName(email);
        onSuggestionClick(uniqueNames[0])
        setSuggestion(uniqueNames.slice(1));
    }, [])
    
    function handlePickingUsername(name:string):void{
        onSuggestionClick(name)
    }

    return (
        <ul className='flex flex-row flex-wrap gap-1 mt-4'>
            {suggestions.slice(0,size).map((name, index) => (
                <li key={index} className='text-base text-secondary cursor-pointer' onClick={()=>handlePickingUsername(name)}>@{name}{(index < 4) ? "," : ""}</li>
            ))
            }
            {!showAllSuggestion && (
                <button className='text-base text-secondary cursor-pointer w-full text-left mt-2' onClick={handleShowMore}>Show more</button>
            )}
        </ul>
    )
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
                <ShowSuggestion onSuggestionClick={setInputValue} email = {props.email} />
            </div>
            <Button variant={'default'} className='w-full py-6'>Next</Button>
        </PopUpContainer>
    )
}