import { cn } from '../../lib'
import { useEffect, useState } from 'react'

type PropsShowSuggestion = { 
    email: string;
    onSuggestionClick:(value: string) => void;
    showSuggestion?:boolean;
    numberOfSuggestions?:number;
    className?: string;
}
function generateUserName(email:string): string[] 
{
    const uniqueUserNames = ["d","asd","Sadfasdf","Afdasdfjklaj","dfsasjkl","kzlcxvmklzxcj"];
    return uniqueUserNames;
}



export function ShowSuggestionsNames( {className,onSuggestionClick,email,showSuggestion=false,numberOfSuggestions=3}:PropsShowSuggestion) {
    const [showAllSuggestion, setShowAllSuggestion] = useState(false)
    const [size, setsize] = useState(3)
    const [suggestions, setSuggestion] = useState<string[]>([])

    function handleShowMore() {
        setShowAllSuggestion(!showAllSuggestion)
        setsize(5)
    }
    useEffect(() => {
        const uniqueNames =  generateUserName(email);
        setShowAllSuggestion(showSuggestion)
        setsize(numberOfSuggestions)
        onSuggestionClick(uniqueNames[0])
        setSuggestion(uniqueNames.slice(1));
    }, [])
    
    function handlePickingUsername(name:string):void{
        onSuggestionClick(name)
    }

    return (
        <ul className={cn("flex flex-row flex-wrap gap-1 mt-4", className)}>
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
