import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { MessagesMain } from "./MessagesMain"
import { MessagesHeader } from "./MessagesHeader"

export function MessagesAccordion() {
    return (
        <Accordion type="single" collapsible className="box-shadow max-sm:hidden rounded-t-2xl w-[400px] fixed bg-black bottom-0 right-5 overflow-y-auto ">
            <AccordionItem value="item-1" >
                <AccordionTrigger className="pr-4 py-0 relative font-bold text-xl hover:no-underline">
                    <MessagesHeader settingsIcon={false} />
                </AccordionTrigger>
                <AccordionContent className="max-h-[400px] overflow-y-auto">
                    <MessagesMain showMessagesHeader={false} />
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}