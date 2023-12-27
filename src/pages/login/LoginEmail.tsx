import { Button } from "@/components/ui/button";
import { SignInProp } from "./LoginPropsType";
import { TextInput } from "@/components/TextInput/TextInput";
import { Link } from "react-router-dom";
import GoogleSignUpButton from "@/components/GoogleSignUpButton/GoogleSignUpButton";

export function LoginEmail({ incrementStep, form }: SignInProp) {
  return (
    <div className="w-full  flex flex-col items-center">
      <p className="my-5 text-3xl font-bold break-words text-start h-[40px] w-[300px]">
        Sign in to Quitter
      </p>
      <GoogleSignUpButton />
      <p className="mt-5 text-center or-item h-[40px] w-[300px] relative">or</p>
      <TextInput
        data-testid="email"
        role="emailInput"
        {...form.register("email")}
        className="w-[300px]"
        placeHolder="Email"
        errorMessage={form.formState.errors.email?.message?.toString()}
      />
      <Button
        data-testid="nextButton"
        disabled={
          (form.formState.errors.email || !form.formState.isDirty) as
            | boolean
            | undefined
        }
        variant="default"
        className="items-center my-5 h-[40px] w-[300px]"
        onClick={incrementStep}
      >
        <div className="mx-1">Next</div>
      </Button>
      <Link to="/i/flow/password_reset">
        <Button
          variant="outline"
          className="text-white my-5 h-[40px] w-[300px]"
          data-testid="forgotPassword"
        >
          Forgot Password?
        </Button>
      </Link>
      <p className="text-start text-slate-400 w-[300px]">
        Don't have an account?
        <Link to="/i/flow/signup/input_flow_data" data-testid="signupLink">
          <span className="mx-1 hover:underline hover:cursor-pointer text-secondary">
            Sign up
          </span>
        </Link>
      </p>
    </div>
  );
}
