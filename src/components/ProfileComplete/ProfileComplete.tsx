import { useState } from "react";
import { PopUpContainer } from "../PopUpContainer/PopUpContainer";

import { useNavigate } from "react-router-dom";
import { SignUpProfile } from "../SignUpProfile/SignUpProfile";
import { UsernameSuggestion } from "../UsernameSuggestion/UsernameSuggestion";
import { NotificationAllow } from "../NotificationAllow/NotificationAllow";

const ProfileComplete = () => {
    const [step, setStep] = useState(0);
    const [showPopUp, setShowPopUp] = useState<boolean>(true); // controls if the sign up is started or not
    const navigate = useNavigate();
    const nextStep = () => {
        setStep(step + 1);
    };


    const closePopUp = () => {
        navigate('/home');
        setShowPopUp(false);
    };
    const doneSignUp=()=>{
        closePopUp();
    }

    const steps = [
        <SignUpProfile nextStep={nextStep}  />,
        <UsernameSuggestion
        nextStep={nextStep}
        />,
        <NotificationAllow  nextStep={doneSignUp} />,
    ];

    return (
        <PopUpContainer
            show={showPopUp}
            showLogo
            className="px-10 h-full justify-start"
        >
            {steps[step]}
        </PopUpContainer>
    );
};
export default ProfileComplete;
