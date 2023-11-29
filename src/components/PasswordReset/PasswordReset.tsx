import { useState } from "react";
import { HeaderButton } from "@/models/PopUpModel";
import { PopUpContainer } from "../PopUpContainer/PopUpContainer";
import { FindEmailPopUp } from "../FindEmailPopUp/FindEmailPopUp";
import { PasswordRestPopUp } from "../PasswordRestPopUp/PasswordResetPopUp";
import EmailVerification from "../EmailVerification/EmailVerification";
import { useNavigate } from "react-router-dom";

const PasswordRest = () => {
  const [step, setStep] = useState(0);
  const [token , setToken] = useState<string|null>("123456ss");
  const [showPopUp, setShowPopUp] = useState<boolean>(true); // controls if the sign up is started or not
  const [email, setEmail] = useState("");
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
  const verificationOnSuccess = () => {
    nextStep();
  };
  const steps = [
    <FindEmailPopUp nextStep={nextStep} setEmail={setEmail} />,
    <EmailVerification
      email={email}
      onSuccess={verificationOnSuccess}
      onFail={prevStep}
      verificationType="passwordReset"
      setToken={setToken}
    />,
    <PasswordRestPopUp  onSuccess={closePopUp} token={token} />,
  ];

  return (
    <PopUpContainer
      show={showPopUp}
      showLogo
      className="px-10 h-full justify-start"
      headerButton={step > 0 ? HeaderButton.back : HeaderButton.close}
      headerFunction={step >= 0 ? closePopUp : () => {}}
    >
      {steps[step]}
    </PopUpContainer>
  );
};
export default PasswordRest;
