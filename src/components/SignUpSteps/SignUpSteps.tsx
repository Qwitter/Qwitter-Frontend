import { MouseEventHandler, useState } from "react";
import { Button, PopUpContainer, TextInput } from "../";
import { HeaderButton } from "../../models/PopUpModel";

export const SignUpSteps = () => {
  const [stepNumber, setStepNumber] = useState<number>(0); // controls which step is shown
  const [showPopUp, setShowPopUp] = useState<boolean>(true); // controls if the sign up is started or not
  const [userData, setUserData] = useState<object>(); // will hold user data during sign up

  // increment the step
  const nextStep = () => {
    setStepNumber(stepNumber + 1);
  };

  // decrement the step or remove the pop up when stepNumber 0 is reached
  const previousStep = () => {
    if (stepNumber === 0) {
      setShowPopUp(false);
      return;
    }

    setStepNumber(stepNumber - 1);
  };

  // holds steps of sign up
  const Steps = [
    <Step1 handleNextStep={nextStep} />,
    <Step1 handleNextStep={nextStep} />,
  ];

  // holds which button (x, arrow or none) is shown
  const StepsButtons = [HeaderButton.close, HeaderButton.back];

  return (
    <>
      {showPopUp && (
        <PopUpContainer
          show={true}
          headerButton={StepsButtons[stepNumber]}
          headerFunction={previousStep}
          title={`Step ${stepNumber + 1} of 5`}
          className="items-start pb-0"
          // showLogo={true}
        >
          {Steps[stepNumber]}
        </PopUpContainer>
      )}
    </>
  );
};

// props for all sign up steps
type NextSignUpStepProp = {
  handleNextStep: MouseEventHandler<HTMLButtonElement>; // will run when next is pressed
};

// step 1 of the sign up with name, email and date picker
const Step1 = (props: NextSignUpStepProp) => {
  console.log("rendered");

  return (
    <div className="w-full flex flex-col items-start justify-start">
      <h2 className="text-3xl font-bold my-5">Create your account</h2>
      {/* NEEDED: use react hook form*/}
      <form
        className="w-full"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <TextInput placeHolder="Name" name="name" className="py-3 h" />
        <TextInput placeHolder="Email" name="email" className="py-3" />
        <div className="mt-5 h-[153px] w-full"></div>
      </form>
      <div className="w-full h-[100px] mt-[85px]">
        <Button
          size="full"
          className="h-[50px] my-6 font-medium"
          onClick={props.handleNextStep}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
