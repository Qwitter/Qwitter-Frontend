import { SignUpStepsProps } from "@/models/SignUp";
import { TextInput } from "../TextInput/TextInput";
import { Button } from "../ui/button";

// step 3 of the sign up to confirm sign up
export const Step3 = ({ nextStep, resetStep, userData }: SignUpStepsProps) => {
  return (
    <>
      <div className="w-full flex flex-col items-start justify-start">
        <h2 className="text-3xl font-bold my-5">Create your account</h2>
        <div className="w-full">
          <TextInput
            value={userData?.name || ""}
            placeHolder="Name"
            onClick={resetStep}
            readOnly
            data-testid="nameAssert"
          />
          <TextInput
            value={userData?.email || ""}
            placeHolder="Email"
            onClick={resetStep}
            readOnly
            data-testid="emailAssert"
          />
          <TextInput
            value={`${userData?.month?.slice(0, 3)} ${userData?.day}, ${
              userData?.year
            }`}
            placeHolder="Date of birth"
            onClick={resetStep}
            readOnly
            data-testid="dateOfBirthAssert"
          />
        </div>
      </div>
      <div className="w-full mb-6 flex flex-col justify-center">
        <p className="text-[13px] mb-6 text-gray leading-4">
          By signing up, you agree to the Terms of Service and Privacy Policy,
          including Cookie Use. Qwitter may use your contact information,
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
