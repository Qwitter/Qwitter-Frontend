import { MouseEventHandler, useState } from "react";
import { Button, PopUpContainer, TextInput } from "../";
import { HeaderButton } from "../../models/PopUpModel";
import { Checkbox } from "../ui/checkbox";

export const SignUpSteps = () => {
  const [stepNumber, setStepNumber] = useState<number>(0); // controls which step is shown
  const [showPopUp, setShowPopUp] = useState<boolean>(true); // controls if the sign up is started or not
  const [userData, setUserData] = useState<object>(); // will hold user data during sign up

  // go to step 1 again
  const resetStep = () => {
    setStepNumber(0);
  };

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
    <Step2 handleNextStep={nextStep} />,
    <Step3 handleNextStep={nextStep} resetStep={resetStep} />,
    <Step5 handleNextStep={() => {}} />,
  ];

  // holds which button (x, arrow or none) is shown
  const StepsButtons = [
    HeaderButton.close,
    HeaderButton.back,
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
          title={`Step ${stepNumber + 1} of 5`}
          className="items-start pb-0 justify-between"
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
  // userData:
  resetStep?: MouseEventHandler<HTMLDivElement>;
};

// step 1 of the sign up with name, email and date picker
const Step1 = (props: NextSignUpStepProp) => {
  console.log("rendered1");

  return (
    <>
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
          <div className="h-[153px] w-full mt-5">
            <h4 className="text-4 font-bold mb-2">Date of birth</h4>
            <p className="text-[14px] mb-1 text-gray leading-4">
              This will not be shown publicly. Confirm your own age, even if
              this account is for a business, a pet, or something else.
            </p>
            <div className="w-full my-4">{/* date picker */}</div>
          </div>
        </form>
      </div>
      <div className="w-full mb-6 flex flex-col justify-center">
        <Button
          size="full"
          className="h-[50px] font-bold"
          onClick={props.handleNextStep}
        >
          Next
        </Button>
      </div>
    </>
  );
};

// step 2 of the sign up with terms and conditions
const Step2 = (props: NextSignUpStepProp) => {
  console.log("rendered2");

  return (
    <>
      <div className="w-full flex flex-col items-start justify-start">
        <h2 className="text-3xl font-bold my-5">Customize your experience</h2>
        {/* NEEDED: use react hook form*/}
        <div className="w-full">
          <h3 className="w-[400px] mt-5 text-xl font-bold leading-6">
            Track where you see X content across the web
          </h3>
          <div className="w-full mt-3 flex flex-row">
            <label
              htmlFor="check"
              className="w-[394px] mr-[26px] mb-0 text-[15px] text-primary mb-1 text-gray leading-5"
            >
              X uses this data to personalize your experience. This web browsing
              history will never be stored with your name, email, or phone
              number.
            </label>
            <Checkbox id="check" className="w-5 h-5 border-gray border-2" />
          </div>
        </div>
        <p className="mt-10 text-[15px] text-gray leading-4">
          By signing up, you agree to our Terms, Privacy Policy, and Cookie Use.
          X may use your contact information, including your email address and
          phone number for purposes outlined in our Privacy Policy. Learn more
        </p>
      </div>
      <div className="w-full my-6 flex flex-col justify-center">
        <Button
          size="full"
          className="h-[50px]  font-bold"
          onClick={props.handleNextStep}
        >
          Next
        </Button>
      </div>
    </>
  );
};

// step 3 of the sign up to confirm sign up
const Step3 = (props: NextSignUpStepProp) => {
  console.log("rendered3");

  return (
    <>
      <div className="w-full flex flex-col items-start justify-start">
        <h2 className="text-3xl font-bold my-5">Create your account</h2>
        {/* NEEDED: use react hook form*/}
        <div className="w-full">
          <TextInput
            placeHolder="Name"
            name="name"
            className="py-3 h"
            onClick={props.resetStep && props.resetStep}
          />
          <TextInput placeHolder="Email" name="email" className="py-3" />
          <TextInput placeHolder="Date of birth" name="DoB" className="py-3" />
        </div>
      </div>
      <div className="w-full mb-6 flex flex-col justify-center">
        <p className="text-[13px] mb-6 text-gray leading-4">
          By signing up, you agree to the Terms of Service and Privacy Policy,
          including Cookie Use. Twitter may use your contact information,
          including your email address and phone number for purposes outlined in
          our Privacy Policy, like keeping your account secure and personalizing
          our services, including ads. Learn more. Others will be able to find
          you by email or phone number, when provided, unless you choose
          otherwise here.
        </p>
        <Button
          size="full"
          className="h-[50px] font-bold"
          onClick={props.handleNextStep}
        >
          Next
        </Button>
      </div>
    </>
  );
};

// NEEDED: step 4 here

// step 3 of the sign up to confirm sign up
const Step5 = (props: NextSignUpStepProp) => {
  console.log("rendered3");

  return (
    <>
      <div className="w-full flex flex-col items-start justify-start">
        <h2 className="text-3xl font-bold mt-5">You'll need a password</h2>
        <p className="text-[15px] mt-3 mb-5 text-gray leading-4">
          Make sure it's 8 characters or more.
        </p>
        {/* NEEDED: use react hook form*/}
        <div className="w-full">
          <TextInput
            placeHolder="Password"
            name="pass"
            className="py-3 h"
            onClick={props.resetStep && props.resetStep}
          />
        </div>
      </div>
      <div className="w-full my-6 flex flex-col justify-center">
        <Button
          size="full"
          className="h-[50px] font-bold"
          onClick={props.handleNextStep}
        >
          Next
        </Button>
      </div>
    </>
  );
};
