import { MouseEventHandler, useState } from "react";
import { BirthDayInput, Button, PopUpContainer, TextInput } from "../";
import { HeaderButton } from "../../models/PopUpModel";
import { Checkbox } from "../ui/checkbox";
import { z } from "zod";
import { SignUpSchema } from "../../models/SignUp";
// import { BirthDaySchema } from "@/models/BirthDay";
import { FieldValues, useForm, UseFormReturn } from "react-hook-form";

// type SignUpData = z.infer<typeof SignUpSchema>;

export const SignUpSteps = () => {
  const [stepNumber, setStepNumber] = useState<number>(0); // controls which step is shown
  const [showPopUp, setShowPopUp] = useState<boolean>(true); // controls if the sign up is started or not
  const form = useForm();

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
    if (stepNumber === 0) setShowPopUp(false);
    else setStepNumber(stepNumber - 1);
  };

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  // holds steps of sign up
  const Steps = [
    <Step1 nextStep={nextStep} form={form} />,
    <Step2 nextStep={nextStep} form={form} />,
    <Step3 nextStep={nextStep} form={form} resetStep={resetStep} />,
    <Step5
      nextStep={form.handleSubmit((data) => {
        onSubmit(data);
      })}
      form={form}
    />,
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
          className="items-start pb-0"
        >
          <form
            onSubmit={form.handleSubmit((data) => {
              onSubmit(data);
            })}
            className="w-full h-full flex flex-col justify-between"
          >
            {Steps[stepNumber]}
          </form>
        </PopUpContainer>
      )}
    </>
  );
};

// props for all sign up steps
type NextSignUpStepProp = {
  nextStep: MouseEventHandler<HTMLButtonElement>; // will run when next is pressed
  resetStep?: MouseEventHandler<HTMLDivElement>;
  form: UseFormReturn; // for react hook form
};

// step 1 of the sign up with name, email and date picker
const Step1 = ({ nextStep, form }: NextSignUpStepProp) => {
  return (
    <>
      <div className="w-full flex flex-col items-start justify-start">
        <h2 className="text-3xl font-bold my-5">Create your account</h2>
        {/* NEEDED: use react hook form*/}
        <div
          className="w-full"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <TextInput
            placeHolder="Name"
            {...form.register("name", {
              required: "Enter your name",
            })}
            className="py-3 h"
          />
          {form.formState.errors.name && (
            <h5 className="text-danger font-light text-[15px]">
              What's your name?
            </h5>
          )}

          <TextInput
            placeHolder="Email"
            {...form.register("email", {
              required: "Enter email",
            })}
            className="py-3"
          />
          {form.formState.errors.name && (
            <h5 className="text-danger font-light text-[15px]">
              Please enter a valid email.
            </h5>
          )}
          <div className="h-[153px] w-full mt-5">
            <h4 className="text-4 font-bold mb-2">Date of birth</h4>
            <p className="text-[14px] mb-1 text-gray leading-4">
              This will not be shown publicly. Confirm your own age, even if
              this account is for a business, a pet, or something else.
            </p>
            <div className="w-full my-4">
              {/* NEEDED: help required from Seif (only need to work with types) */}
              {/* <BirthDayInput form={form} birthDay={null} /> */}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mb-6 flex flex-col justify-center">
        <Button
          size="full"
          className="h-[50px] font-bold"
          onClick={nextStep}
          // disabled={z
          //   .boolean()
          //   .parse(
          //     signUpData?.name && signUpData?.email && signUpData?.birthDay
          //   )}
        >
          Next
        </Button>
      </div>
    </>
  );
};

// step 2 of the sign up with terms and conditions
const Step2 = ({ nextStep }: NextSignUpStepProp) => {
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
        <Button size="full" className="h-[50px]  font-bold" onClick={nextStep}>
          Next
        </Button>
      </div>
    </>
  );
};

// step 3 of the sign up to confirm sign up
const Step3 = ({ form, nextStep, resetStep }: NextSignUpStepProp) => {
  return (
    <>
      <div className="w-full flex flex-col items-start justify-start">
        <h2 className="text-3xl font-bold my-5">Create your account</h2>
        {/* NEEDED: use react hook form*/}
        <div className="w-full">
          <TextInput
            {...form.register("name")}
            placeHolder="Name"
            className="py-3 h"
            onClick={resetStep}
          />
          <TextInput
            {...form.register("email")}
            placeHolder="Email"
            className="py-3"
            onClick={resetStep}
          />
          <TextInput
            {...form.register("password")}
            placeHolder="Date of birth"
            className="py-3"
            onClick={resetStep}
          />
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
          variant="secondary"
          size="full"
          className="h-[50px] font-bold"
          onClick={nextStep}
        >
          Sign Up
        </Button>
      </div>
    </>
  );
};

// NEEDED: step 4 here

// step 3 of the sign up to confirm sign up
const Step5 = ({ nextStep, form }: NextSignUpStepProp) => {
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
            {...form.register("password", {
              required: "Enter password",
              minLength: {
                value: 8,
                message: "Password is too small",
              },
            })}
            placeHolder="Password"
            className="py-3 h"
          />
        </div>
      </div>
      <div className="w-full my-6 flex flex-col justify-center">
        <Button size="full" className="h-[50px] font-bold" onClick={nextStep}>
          Next
        </Button>
      </div>
    </>
  );
};
