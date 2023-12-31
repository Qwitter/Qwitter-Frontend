import { useContext, useState } from "react";
import { PopUpContainer } from "../PopUpContainer/PopUpContainer";
import { HeaderButton } from "../../models/PopUpModel";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step5 } from "./Step5";
import { Step3 } from "./Step3";
import { SignUpDataSchema } from "@/models/SignUp";
import { z } from "zod";
import { useLocation, useNavigate } from "react-router-dom";
import { registerNewUser } from "@/lib/utils";
import { BirthDaySchema } from "@/models/BirthDay";
import EmailVerification from "../EmailVerification/EmailVerification";
import { RecaptchaPopUp } from "../RecaptchaPopUp/RecaptchaPopUp";
import { UserContext } from "@/contexts/UserContextProvider";

export const SignUpSteps = () => {
  const [stepNumber, setStepNumber] = useState<number>(0); // controls which step is shown
  const [showPopUp, setShowPopUp] = useState<boolean>(true); // controls if the sign up is started or not
  const [userData, setUserData] = useState<z.infer<typeof SignUpDataSchema>>(); // to pass user inputs between steps
  const location = useLocation();
  const navigate = useNavigate();
  location.pathname = "/settings/account";
  const { saveUser } = useContext(UserContext);

  // go to step 1 again
  const resetStep = () => {
    setUserData({ ...userData, password: null });
    setStepNumber(0);
  };

  // increment the step
  const nextStep = () => {
    setStepNumber(stepNumber + 1);
  };

  // decrement the step or remove the pop up when stepNumber 0 is reached
  const previousStep = () => {
    if (stepNumber === 0) {
      navigate("/");
      setShowPopUp(false);
    } else setStepNumber(stepNumber - 1);
  };

  // to show Step # of 5
  const getTitle = () => {
    if (stepNumber < 3) return `Step ${stepNumber + 1} of 5`;

    if (stepNumber === 3) return null;

    return `Step ${stepNumber} of 5`;
  };

  // to concatenate the password to the user data and make an account
  const registerUser = async (pass: string) => {
    setUserData({ ...userData, password: pass });

    if (userData) {
      const res = await registerNewUser({ ...userData, password: pass });
      if (res) {
        saveUser(res.data.data, res.data.token);
        navigate("/i/flow/profile", { state: { previousLocation: location } });
      }
    }
  };

  // to concatenate the name, email and birthday to the user data
  const addStep1Data = (
    name: string,
    email: string,
    birthDay: z.infer<typeof BirthDaySchema>
  ) => {
    setUserData({
      ...userData,
      name: name,
      email: email,
      day: birthDay.day,
      month: birthDay.month,
      year: birthDay.year,
    });
  };

  // holds steps of sign up
  const Steps = [
    <Step1
      nextStep={nextStep}
      userData={userData}
      addStep1Data={addStep1Data}
    />,
    <Step2 nextStep={nextStep} />,
    <Step3 nextStep={nextStep} resetStep={resetStep} userData={userData} />,
    <RecaptchaPopUp prevPage={previousStep} afterAuth={nextStep} />,
    <EmailVerification
      email={userData?.email || ""}
      onSuccess={nextStep}
      onFail={resetStep}
      verificationType="signUp"
    />,
    <Step5 nextStep={() => {}} registerUser={registerUser} />,
  ];

  // holds which button (x, arrow or none) is shown
  const StepsButtons = [
    HeaderButton.close,
    HeaderButton.back,
    HeaderButton.back,
    HeaderButton.none,
    HeaderButton.back,
    HeaderButton.none,
  ];

  return (
    <>
      {showPopUp && (
        <PopUpContainer
          show={true}
          headerButton={StepsButtons[stepNumber]}
          headerFunction={previousStep}
          title={getTitle()}
          className="items-start pb-0"
        >
          <div className="w-full h-full flex flex-col justify-between">
            {Steps[stepNumber]}
          </div>
        </PopUpContainer>
      )}
    </>
  );
};
