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
import { useMutation } from "@tanstack/react-query";

const UpdateEmailContainer = () => {
    const [step, setStep] = useState(0);
    const [showPopUp, setShowPopUp] = useState<boolean>(true); // controls if the sign up is started or not
    const [email, setEmail] = useState("");
    const { token, saveUser, user } = useContext(UserContext)
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
    const { mutate } = useMutation({
        mutationFn: updateEmail,
        onSuccess: (data, { email }) => {
            if (data!.status == 200) {
                toast({
                    title: "Change Email",
                    description: "Email changed Successfully with " + email,
                });
                //update the context
                saveUser({ ...user!, email: email },token!)

            }
            else if (data!.status == 401) {
                toast({
                    title: "Change Email",
                    description: "Failed : You can't use the same username",
                    variant: "destructive"
                });
            }
            else {
                toast({
                    title: "Change Email",
                    description: "Failed : try again later",
                    variant: "destructive"
                });
            }
            closePopUp();
        },
        onError: () => {
            toast({
                title: "Change Username",
                description: "Failed : try again later",
                variant: "destructive"
            });
            closePopUp();
        }
    });
    const changeEmail = () => {
        mutate({ token: token!, email: email })
    }

    const steps = [
        <VerifyEmailPassword nextStep={nextStep} />,
        <ChangeEmailPopUp nextStep={nextStep} setEmail={setEmail} cancel={closePopUp} />,
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
            headerButton={step > 1 ? HeaderButton.back : HeaderButton.none}
            headerFunction={step > 1 ? prevStep : () => { }}
        >
            {steps[step]}
        </PopUpContainer>
    );
};
export default UpdateEmailContainer;
