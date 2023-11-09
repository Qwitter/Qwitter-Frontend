import { cn } from '../../lib'
import { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query';
import { getSuggestedUsernames } from '@/lib/utils';
import { Spinner } from '../Spinner';

type PropsShowSuggestion = {
    onSuggestionClick: (value: string,clickFlag:boolean) => void;
    showSuggestion?: boolean;
    numberOfSuggestions?: number;
    className?: string;
    username?:string;
    isClickChange?:boolean;
}


export function ShowSuggestionsNames(
    {isClickChange, username="",className, onSuggestionClick, showSuggestion = false, numberOfSuggestions = 3 }:
    PropsShowSuggestion) {
    const [showAllSuggestion, setShowAllSuggestion] = useState(showSuggestion)
    const [size, setsize] = useState(numberOfSuggestions)
    const [suggestedUsernames, setSuggestedUsernames] = useState([])
    function handleShowMore() {
        setShowAllSuggestion(!showAllSuggestion)
        setsize(5)
    }

    const {
        isPending: isGettingUsernames,
        mutate 
    } = useMutation({
        mutationFn: getSuggestedUsernames,
        onSuccess:(data)=>{
            setSuggestedUsernames(data)
        }
    });
    useEffect(() => {
        !isClickChange&&mutate({ username:username,token:"123456" });
    }, [mutate, username,isClickChange]);


    function handlePickingUsername(name: string): void {
        onSuggestionClick(name,true)
    }

    if (isGettingUsernames) {
        return (
            <div className='w-full h-[170px]'>
                <Spinner />
            </div>
        );
    }

    return (
        <ul className={cn("flex flex-row flex-wrap gap-1 mt-4", className)}>
            {suggestedUsernames?.slice(0, size).map((name: string, index: number) => (
                <li role="Suggestions" key={index} className='text-base text-secondary cursor-pointer' onClick={() => handlePickingUsername(name)}>@{name}{(index < 4) ? "," : ""}</li>
            ))
            }
            {!showAllSuggestion && (
                <button className='text-base text-secondary cursor-pointer w-full text-left mt-2' onClick={handleShowMore}>Show more</button>
            )}
        </ul>
    )
}
