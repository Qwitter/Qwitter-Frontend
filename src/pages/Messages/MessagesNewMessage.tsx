import { Button, PopUpContainer } from "@/components"
import { HeaderButton } from "@/models/PopUpModel"
import { useNavigate } from "react-router-dom";

function MessagesNewMessage() {
    const navigate = useNavigate();

    const handleXClick = () => { navigate(-1) }
    const handleNextClick = () => { }

    const nextButton = <Button
        onClick={handleNextClick}
        className="py-0 h-8"
    >Next</Button>

    return (
        <PopUpContainer show={true}
            optionalHeader={nextButton}
            headerButton={HeaderButton.close}
            headerFunction={handleXClick}
            headerClassName="justify-between"
            title="New message">

        </PopUpContainer>
    )
}
export default MessagesNewMessage