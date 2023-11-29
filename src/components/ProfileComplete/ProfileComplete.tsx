import { useState } from "react";
import { HeaderButton } from "@/models/PopUpModel";
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

    const prevStep = () => {
        if (step === 0)   navigate(-1);
        else setStep(step - 1);
    };

    const closePopUp = () => {
        navigate('/settings');
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
            headerButton={step > 0 ? HeaderButton.back : HeaderButton.close}
            headerFunction={step > 0 ?prevStep:closePopUp}
        >
            {steps[step]}
        </PopUpContainer>
    );
};
export default ProfileComplete;
