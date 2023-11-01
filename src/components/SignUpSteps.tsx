import React from "react";
import { useState } from "react";
import { PopUpContainer } from "./PopUpContainer";
import { Button } from "./ui/button";

type Props = {};

export const SignUpSteps = (props: Props) => {
  const [stepNumber, setStepNumber] = useState(0);

  return (
    <PopUpContainer show={stepNumber == 0} hasClose={true}>
      <h4>Hello There</h4>

      <Button
        onClick={() => {
          setStepNumber(stepNumber + 1);
        }}
      >
        Next
      </Button>
    </PopUpContainer>
  );
};
