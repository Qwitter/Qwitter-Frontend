import React from "react";
import { useState } from "react";
import { PopUpContainer } from "./PopUpContainer";
import { Button } from "./ui/button";
import { HeaderButton } from "@/models/PopUpModel";

type Props = {};

export const SignUpSteps = (props: Props) => {
  const [stepNumber, setStepNumber] = useState(0);

  return (
    <>
      <PopUpContainer show={stepNumber == 0} headerButton={HeaderButton.none}>
        <h4>Hello There</h4>

        <Button
          onClick={() => {
            setStepNumber(stepNumber + 1);
          }}
        >
          Next
        </Button>
      </PopUpContainer>

      <PopUpContainer
        show={stepNumber == 1}
        headerButton={HeaderButton.back}
        backFunction={() => {
          setStepNumber(stepNumber - 1);
        }}
      >
        <h4>Hello There</h4>

        <Button
          onClick={() => {
            setStepNumber(stepNumber + 1);
          }}
        >
          Next
        </Button>
      </PopUpContainer>
    </>
  );
};
