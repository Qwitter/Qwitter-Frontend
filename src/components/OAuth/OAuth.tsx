import { useState } from "react";
import { default as BirthDayComponent } from "../BirthDay/BirthDay";
import { type BirthDay } from "@/models/BirthDay";
import { HeaderButton } from "@/models/PopUpModel";
import { PopUpContainer } from "../PopUpContainer/PopUpContainer";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContextProvider";
import { Step2 } from "../SignUpSteps/Step2";
import { oAuthSignUp } from "@/lib/utils";

const OAuth = () => {
  const [step, setStep] = useState(0);
  const [birthDay, setBirthDay] = useState<BirthDay | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { saveUser } = useContext(UserContext);
  location.pathname = "/settings/account";

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    if (step === 0) return;
    setStep(step - 1);
  };

  const signUp = async () => {
    if (!location.state) return;
    const { token } = location.state as { token: string };
    if (!token || !birthDay) return;
    const res = await oAuthSignUp(token, birthDay);
    if (!res) return;
    saveUser(res.user, res.token);
    navigate("/i/flow/profile", { state: { previousLocation: location } });
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
