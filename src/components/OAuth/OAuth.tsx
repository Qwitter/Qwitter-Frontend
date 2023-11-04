import { useState } from "react";
import { BirthDay as BirthDayComponent, PopUpContainer } from "..";
import { type BirthDay } from "@/models/BirthDay";
import { HeaderButton } from "@/models/PopUpModel";

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
    <BirthDayComponent nextStep={nextStep} setBirthDay={setBirthDay} birthDay={birthDay}/>,
  ];

  return (
    <PopUpContainer
      show
      showLogo
      className="px-10 h-full justify-start"
      headerButton={step > 0 ? HeaderButton.back : HeaderButton.none}
      headerFunction={prevStep}
    >
      {steps[step]}
    </PopUpContainer>
  );
};
export default OAuth;
