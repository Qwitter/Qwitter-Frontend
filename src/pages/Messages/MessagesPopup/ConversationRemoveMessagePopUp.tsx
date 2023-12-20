import { Button, PopUpContainer } from '@/components'
import { ConversationPopUpProps, MessagesMessage, conversation } from '../types/MessagesTypes'
import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteMessage } from '@/lib/utils'
import { useContext } from 'react'
import { UserContext } from '@/contexts/UserContextProvider'
import { Spinner } from '@/components/Spinner'
import { useParams } from 'react-router-dom'

export function ConversationRemoveMessagePopUp({ setChatMessages, show, setShow, messageId }: ConversationPopUpProps) {
    const { token } = useContext(UserContext)
    const queryClient = useQueryClient()
    const { conversationId } = useParams()
    const { mutate, isPending } = useMutation({
        mutationFn: deleteMessage,
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: ["userConversation", conversationId] })

            const previousConversationMessages = queryClient.getQueryData(["userConversation", conversationId])
            // Optimistically update to the new value
            queryClient.setQueryData(["userConversation", conversationId], (old: InfiniteData<conversation, unknown>) => {
                old.pages[0].messages = old.pages[0].messages.filter(message => message.id != messageId)
                setChatMessages!([...handlePagingMessages(old)])
                return old
            })

            // Return a context object with the snapshotted value
            return { previousConversationMessages }
        },
        onSuccess: () => {
                setShow!(false)
        },
        onError: (data) => {
            console.log(data);

        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["userConversation", conversationId] })
        }
    })
    const handlePagingMessages = (data: InfiniteData<conversation, unknown>) => {
        return ([] as MessagesMessage[]).concat(
            ...data.pages.map((page) => page.messages)
        );
    };
    const onSubmit = () => {
        console.log(conversationId, token, messageId);
        mutate({ conversationId: conversationId!, token: token!, messageId: messageId! });
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
                    Delete message?
                </h3>
                <p className="text-gray">
                    This message will be deleted for you. Other people in the conversation will still be able to see it.
                </p>
            </div>
                <div data-testid="confirmDelete" className="w-full">
                    <Button
                        onClick={onSubmit}
                        variant="destructive" size="full" className="mb-3">
                        Delete
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