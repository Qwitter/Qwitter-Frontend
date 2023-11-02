import { useState } from 'react'
import { Button, PopUpContainer, TextInput } from '../'
import { useForm } from 'react-hook-form'
type Props = { email: string }
function genrateUserName(): string 
{
    return ""
}

function checkForAvailabilty(genratedUsername: string): boolean 
{
    return false
}

function ShowSuggestion() {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset, getValues } = useForm()
    let list = ["@samy992_marwan", " @Marwan3493651", "@MarwanSamy992"]
    const [showAllSuggestion, setshowAllSuggestion] = useState(false)
    const [suggestions, setSuggestion] = useState(["@Samy992Marwan", "@marwan_samy992"])

    function handleShowMore() {
        setshowAllSuggestion(!showAllSuggestion)
        setSuggestion([...suggestions, ...list])
    }

    function handlePickingUsername(){
    }

    return (
        <ul className='flex flex-row flex-wrap gap-1 mt-4'>
            {suggestions.map((name, index) => (
                <li key={index} className='text-base text-secondary cursor-pointer' onClick={handlePickingUsername}>{name}{(index < 4) ? "," : ""}</li>
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
    return (
        <PopUpContainer show={true} showLogo={true} className='h-[90%]  flex flex-col  justify-between ' >
            <div className='flex flex-col'>
                <h2 className=' font-bold text-primary text-[32px] mb-1 mt-5'>What should we call you?</h2>
                <p className='text-gray mb-5' >Your @username is unique. You can always change it later.</p>
                <TextInput placeHolder='Username' name='username' />
                <ShowSuggestion />
            </div>
            <Button variant={'default'} className='w-full py-6'>Next</Button>
        </PopUpContainer>
    )
}