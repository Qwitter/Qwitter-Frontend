import { Button, PopUpContainer } from '@/components'
import { ConversationPopUpProps } from '../types/MessagesTypes'
import { useMutation } from '@tanstack/react-query'
import { BlockService } from '@/lib/utils'
import { useContext } from 'react'
import { UserContext } from '@/contexts/UserContextProvider'
import { Spinner } from '@/components/Spinner'
import { useNavigate } from 'react-router-dom'

export function ConversationBlockUserPopup({ show, setShow, userName }: ConversationPopUpProps) {
    const { token } = useContext(UserContext)
    const navigate =useNavigate()
    const { mutate, isPending } = useMutation({
        mutationFn: ()=>BlockService(userName!,token!),
        onSuccess: (data) => {
            if (data) {
                setShow!(false)
                navigate('/Messages/')
            }

        },
        onError: (data) => {
            console.log(data);

        },
    })
    const onSubmit = () => {
        mutate();
    }

    return (
        <PopUpContainer show={show}
            className="p-0 items-start sm:w-[280px] h-[260px] sm:h-[230px] justify-between"
            dialogClassName="p-8 w-[280px] min-h-fit max-w-[80vw] sm:h-[290px] h-[320px]"
            isCompact={true}>
            {isPending ? <div className='w-full h-[180px] p-8'>
                <Spinner />
            </div> : <><div>
                <p className="text-gray text-[15px] leading-1">
                Block @{userName}, @{userName} will no longer be able to follow or message you, and you will not see notifications from @{userName}</p>
            </div>
                <div className="w-full">
                    <Button
                        onClick={onSubmit}
                        variant="default" size="full" className="mb-3">
                        Yes
                    </Button>
                    <Button
                        onClick={() => { setShow!(false) }}
                        variant="outline" size="full" className="mb-3">
                        Cancel
                    </Button>
                </div></>}
        </PopUpContainer>
    )
}