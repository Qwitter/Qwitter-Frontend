import { SignUpStepsProps } from "@/models/SignUp";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

// step 2 of the sign up with terms and conditions
export const Step2 = ({ nextStep }: SignUpStepsProps) => {
  return (
    <>
      <div className="w-full flex flex-col items-start justify-start">
        <h2 className="text-3xl font-bold my-5">Customize your experience</h2>
        <div className="w-full">
          <h3 className="w-full mt-5 text-xl font-bold leading-6">
            Track where you see X content across the web
          </h3>
          <div className="w-full mt-3 flex flex-row">
            <label
              htmlFor="check"
              className="w-full mr-[26px] mb-0 text-[15px] text-primary mb-1 text-gray leading-5"
            >
              Qwitter uses this data to personalize your experience. This web
              browsing history will never be stored with your name, email, or
              phone number.
            </label>
            <Checkbox
              id="check"
              className="w-5 h-5 border-gray border-2"
              checked
            />
          </div>
        </div>
        <p className="mt-10 text-[15px] text-gray leading-4">
          By signing up, you agree to our Terms, Privacy Policy, and Cookie Use.
          Qwitter may use your contact information, including your email address
          and phone number for purposes outlined in our Privacy Policy.
        </p>
      </div>
      <div className="w-full my-6 flex flex-col justify-center mt-auto">
        <Button size="full" className="h-[50px]  font-bold" onClick={nextStep}>
          Next
        </Button>
      </div>
    </>
  );
};
