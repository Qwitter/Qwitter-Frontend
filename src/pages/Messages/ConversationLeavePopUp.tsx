import { Button, PopUpContainer } from '@/components'
import { ConversationPopUpProps } from './types/MessagesTypes'

export function ConversationLeavePopUp({ show, setShow, leaveFunction }: ConversationPopUpProps) {
    return (
        <PopUpContainer show={show}
            className="p-0 items-start sm:w-[280px] h-[260px] sm:h-[230px] justify-between"
            dialogClassName="p-8 w-[280px] min-h-fit max-w-[80vw] sm:h-[290px] h-[320px]"
            isCompact={true}>
            <div>
                <h3 className="text-primary text-xl font-bold">
                    Leave conversation?
                </h3>
                <p className="text-gray">
                    This conversation will be deleted from your inbox. Other people in the conversation will still be able to see it.
                </p>
            </div>
            <div className="w-full">
                <Button 
                onClick={leaveFunction}
                variant="destructive" size="full" className="mb-3">
                    Leave
                </Button>
                <Button 
                onClick={() => {setShow!(false)}}
                variant="outline" size="full" className="mb-3">
                    Cancel
                </Button>
            </div>
        </PopUpContainer>
    )
}