import { Button, PopUpContainer } from '@/components'
import { ConversationPopUpProps, conversation } from '../types/MessagesTypes'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteConversation } from '@/lib/utils'
import { useContext } from 'react'
import { UserContext } from '@/contexts/UserContextProvider'
import { Spinner } from '@/components/Spinner'
import { useNavigate } from 'react-router-dom'

export function ConversationLeavePopUp({ show, setShow, conversationToDelete }: ConversationPopUpProps) {
    const { token } = useContext(UserContext)
    const queryClient = useQueryClient()
    const navigate =useNavigate()
    const { mutate, isPending } = useMutation({
        mutationFn: deleteConversation,
        onMutate: async (data) => {
            // Cancel any outgoing refetches
            // (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey: ['getUserConversations'] })

            // Snapshot the previous value
            const previousConversations = queryClient.getQueryData(['getUserConversations'])

            // Optimistically update to the new value
            queryClient.setQueryData(['getUserConversations'], (old: conversation[]) =>old.filter(conversation=> conversation.id!=data.conversationId))

            // Return a context object with the snapshotted value
            return { previousConversations }
        },
        onSuccess: (data) => {
            if (data) {
                console.log(data)
                setShow!(false)
                navigate('/Messages/')
            }

        },
        onError: (data) => {
            console.log(data);

        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['getUserConversations'] })
        }
    })
    const onSubmit = () => {
        mutate({ conversationId: conversationToDelete!, token: token! });
    }

    return (
        <PopUpContainer show={show}
            className="p-0 items-start sm:w-[280px] h-[260px] sm:h-[230px] justify-between"
            dialogClassName="p-8 w-[280px] min-h-fit max-w-[80vw] sm:h-[290px] h-[320px]"
            isCompact={true}>
            {isPending ? <div className='w-full h-[180px] p-8'>
                <Spinner />
            </div> : <><div>
                <h3 className="text-primary text-xl font-bold">
                    Leave conversation?
                </h3>
                <p className="text-gray">
                    This conversation will be deleted from your inbox. Other people in the conversation will still be able to see it.
                </p>
            </div>
                <div className="w-full">
                    <Button
                        onClick={onSubmit}
                        variant="destructive" size="full" className="mb-3">
                        Leave
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