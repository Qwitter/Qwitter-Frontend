import { useState } from "react";
import { BirthDay, PopUpContainer } from "..";

const OAuth = () => {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const steps = [<BirthDay nextStep={nextStep} />];

  return (
    <PopUpContainer show showLogo className="px-10 h-full justify-start">
      {steps[step]}
    </PopUpContainer>
  );
};
export default OAuth;
