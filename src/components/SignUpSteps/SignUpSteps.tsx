import { useState } from "react";
import { Button, PopUpContainer, TextInput } from "../";
// import { Button } from "./ui/button";
import { HeaderButton } from "../../models/PopUpModel";

export const SignUpSteps = () => {
  const [stepNumber, setStepNumber] = useState(0);

  const Steps = [
    <div className="w-full flex flex-col items-start justify-start">
      <h2 className="text-2xl font-bold">Create your account</h2>
      {/* NEEDED: use react hook form*/}
      <form
        className="w-full"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <TextInput placeHolder="Name" name="name" />
        <TextInput placeHolder="Email" name="email" />
        <Button>Submit</Button>
      </form>
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
