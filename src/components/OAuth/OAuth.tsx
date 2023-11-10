import { useState } from "react";
import { default as BirthDayComponent } from "../BirthDay/BirthDay";
import { type BirthDay } from "@/models/BirthDay";
import { HeaderButton } from "@/models/PopUpModel";
import { PopUpContainer } from "../PopUpContainer/PopUpContainer";
import { useLocation } from "react-router-dom";
import { User } from "@/models/User";
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContextProvider";
import { Step2 } from "../SignUpSteps/Step2";

const OAuth = () => {
  const [step, setStep] = useState(0);
  const [birthDay, setBirthDay] = useState<BirthDay | null>(null);
  const location = useLocation();
  const { saveUser } = useContext(UserContext);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    if (step === 0) return;
    setStep(step - 1);
  };

  const signUp = () => {
    if (!location.state) return;
    const { user, token } = location.state as { user: User; token: string };
    saveUser(user, token);
  };

  const steps = [
    <BirthDayComponent
      nextStep={nextStep}
      setBirthDay={setBirthDay}
      birthDay={birthDay}
    />,
    <Step2 nextStep={signUp} />,
  ];

  return (
    <PopUpContainer
      show
      showLogo={step === 0}
      title={step === 1 ? `Step ${step + 1} of 5` : ""}
      className="px-10 h-full justify-start"
      headerButton={step > 0 ? HeaderButton.back : HeaderButton.none}
      headerFunction={prevStep}
    >
      {steps[step]}
    </PopUpContainer>
  );
};
export default OAuth;
