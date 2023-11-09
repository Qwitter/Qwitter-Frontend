import { useState } from "react";
import { default as BirthDayComponent } from "../BirthDay/BirthDay";
import { type BirthDay } from "@/models/BirthDay";
import { HeaderButton } from "@/models/PopUpModel";
import { PopUpContainer } from "../PopUpContainer/PopUpContainer";
import EmailVerification from "../EmailVerification/EmailVerification";

const OAuth = () => {
  const [step, setStep] = useState(0);
  const [birthDay, setBirthDay] = useState<BirthDay | null>(null);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    if (step === 0) return;
    setStep(step - 1);
  };

  const steps = [
    <BirthDayComponent
      nextStep={nextStep}
      setBirthDay={setBirthDay}
      birthDay={birthDay}
    />,
    <EmailVerification
      email="sofa5060@gmail.com"
      verificationType="passwordReset"
      onSuccess={nextStep}
      onFail={prevStep}
    />,
  ];

  return (
    <PopUpContainer
      show
      showLogo={step === 0}
      title={step === 1 ? `Step ${step + 1} of ${5}` : ""}
      className="px-10 h-full justify-start"
      headerButton={step > 0 ? HeaderButton.back : HeaderButton.none}
      headerFunction={prevStep}
    >
      {steps[step]}
    </PopUpContainer>
  );
};
export default OAuth;
