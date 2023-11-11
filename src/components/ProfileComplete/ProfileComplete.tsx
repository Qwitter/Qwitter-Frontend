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
        if (step === 0) return;
        else setStep(step - 1);
    };

    const closePopUp = () => {
        navigate(-1);
        setShowPopUp(false);
    };

    const steps = [
        <SignUpProfile nextStep={nextStep}  />,
        <UsernameSuggestion
        nextStep={nextStep}
        />,
        <NotificationAllow  nextStep={nextStep} />,
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
