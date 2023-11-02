import { useState } from "react";
import { PopUpContainer } from "./PopUpContainer";
// import { Button } from "./ui/button";
import { HeaderButton } from "../models/PopUpModel";

export const SignUpSteps = () => {
  const [stepNumber, setStepNumber] = useState(0);

  console.log(setStepNumber);

  const Steps = [
    <div className="flex flex-col items-start justify-start">
      <h2 className="text-2xl font-bold">Create your account</h2>
      <div>
        {/* will be replaced with a form*/}
        <input type="text" placeholder="Name" />
        <input type="text" placeholder="Email" />
      </div>
    </div>,
  ];

  return (
    <>
      <PopUpContainer
        show={stepNumber == 0}
        headerButton={HeaderButton.close}
        title={`Step ${stepNumber + 1} of 5`}
        className="items-start"
        // showLogo={true}
      >
        {Steps[stepNumber]}
      </PopUpContainer>
    </>
  );
};
