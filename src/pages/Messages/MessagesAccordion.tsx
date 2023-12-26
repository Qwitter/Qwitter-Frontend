import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { MessagesHeader } from "./MessagesHeader"
import { MessagesConversation } from "./Conversation/MessagesConversation"
import { useContext, useState } from "react"
import { MessagesAllConversationSide } from "./Conversation/MessagesAllConversationSide"
import { MessagesContext } from "@/contexts/MessagesContextProvider"
import { MessagesAccordionHeader } from "./MessagesAccordionHeader"

export function MessagesAccordion() {
    const [openConversation, setOpenConversation] = useState<string | undefined>(undefined);
    const { currentConversation } = useContext(MessagesContext)
  
    return (
        <Accordion type="single" collapsible className="box-shadow max-md:hidden rounded-t-2xl w-[400px] fixed bg-black bottom-0 right-[5vw] overflow-y-auto ">
            <AccordionItem value="item-1" >
                <AccordionTrigger
                    className="pr-4 py-0 relative font-bold text-xl hover:no-underline">
                    {openConversation && currentConversation ? <MessagesAccordionHeader  setOpenConversation={setOpenConversation} name={currentConversation.name} userName={currentConversation.isGroup ? "" : currentConversation.users[0].userName} /> : <MessagesHeader settingsIcon={false} />}
                </AccordionTrigger>
                <AccordionContent className="max-h-[400px] overflow-y-auto pb-0">
                    {openConversation ? <MessagesConversation conversationAccordionId={openConversation} /> :
                        <MessagesAllConversationSide setOpenConversation={setOpenConversation} />
                    }
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}