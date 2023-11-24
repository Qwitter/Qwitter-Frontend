import { useContext, useState } from "react";
import { HeaderButton } from "@/models/PopUpModel";
import { PopUpContainer } from "../PopUpContainer/PopUpContainer";

import { useNavigate } from "react-router-dom";
import { UserContext } from "@/contexts/UserContextProvider";
import CreateTweetFooter from "./CreateTweetFooter";
import CreateTweetMain from "./CreateTweetMain";

const CreateTweetContainer = () => {
    const [showPopUp, setShowPopUp] = useState<boolean>(true); 
    const {token} = useContext(UserContext)
    const navigate = useNavigate();
    const [tweet,setTweet] = useState("");
    const closePopUp = () => {
        token
        navigate(-1);
        setShowPopUp(false);
    };


    return (
        <PopUpContainer
            show={showPopUp}
            className="px-5 min-h-[220px] h-fit max-h-[1000px] py-1 justify-start "
            headerButton={HeaderButton.close}
            headerFunction={closePopUp}
        >
            <CreateTweetMain tweet ={tweet} setTweet={setTweet} />
            <CreateTweetFooter text={tweet} />
        </PopUpContainer>
    );
};
export default CreateTweetContainer;
