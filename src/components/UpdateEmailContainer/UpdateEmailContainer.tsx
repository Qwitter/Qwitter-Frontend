import { useContext, useState } from "react";
import { HeaderButton } from "@/models/PopUpModel";
import { PopUpContainer } from "../PopUpContainer/PopUpContainer";

import { useNavigate } from "react-router-dom";

import { VerifyEmailPassword } from "../VerifyEmailPassword/VerifyEmailPassword";
import { ChangeEmailPopUp } from "../ChangeEmailPopUp/ChangeEmailPopUp";
import EmailVerification from "../EmailVerification/EmailVerification";
import { updateEmail } from "@/lib/utils";
import { UserContext } from "@/contexts/UserContextProvider";
import { toast } from "../ui/use-toast";

const UpdateEmailContainer = () => {
    const [step, setStep] = useState(0);
    const [showPopUp, setShowPopUp] = useState<boolean>(true); // controls if the sign up is started or not
    const [email, setEmail] = useState("");
    const {token} = useContext(UserContext)
    const navigate = useNavigate();
    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        if (step === 0) navigate(-1);
        else setStep(step - 1);
    };

    const closePopUp = () => {
        navigate(-1);
        setShowPopUp(false);
    };
    const changeEmail=async()=>{
        if(await updateEmail({email:email,token:token!}))
        {
            toast({
                title:"changing email",
                description:"Email changed with "+email
            })
            closePopUp();
        }   
        else{
            toast({
                title:"changing email",
                description:"Email didn't change try again",
                variant:"destructive"
            })
        }
        
    }

    const steps = [
        <VerifyEmailPassword nextStep={nextStep} />,
        <ChangeEmailPopUp nextStep={nextStep} setEmail={setEmail} cancel={closePopUp}/>,
        <EmailVerification
        email={email}
        onSuccess={changeEmail}
        onFail={prevStep}
        verificationType="signUp"
        />,

    ];

    return (
        <PopUpContainer
            show={showPopUp}
            showLogo
            className="px-10 h-full justify-start"
            headerButton={step > 1? HeaderButton.back : HeaderButton.none}
            headerFunction={step > 1 ? prevStep : ()=>{}}
        >
            {steps[step]}
        </PopUpContainer>
    );
};
export default UpdateEmailContainer;
