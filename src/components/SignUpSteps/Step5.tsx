import { SignUpStepsProps, Step5DataSchema } from "@/models/SignUp";
import { TextInput } from "../TextInput/TextInput";
import { Button } from "../ui/button";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

interface Step5Props extends SignUpStepsProps {
  registerUser: Function;
}

// step 3 of the sign up to confirm sign up
export const Step5 = ({ nextStep, registerUser }: Step5Props) => {
  const form = useForm({ resolver: zodResolver(Step5DataSchema) });

  const onSubmit = (data: FieldValues) => {
    registerUser(data.password);

    nextStep();
  };

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (form.getValues().password) {
        await form.trigger("password");
      }
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [form.watch("password")]);

  return (
    <>
      <div className="w-full flex flex-col items-start justify-start">
        <h2 className="text-3xl font-bold mt-5">You'll need a password</h2>
        <p className="text-[15px] mt-3 mb-5 text-gray leading-4">
          Make sure it's 8 characters or more.
        </p>
        <div className="w-full">
          <form id="step5Form" onSubmit={form.handleSubmit(onSubmit)}></form>
          <TextInput
            isPassword={true}
            type="password"
            placeHolder="Password"
            {...form.register("password")}
            role="password"
            errorMessage={form.formState.errors.password?.message?.toString()}
          />
        </div>
      </div>
      <div className="w-full my-6 flex flex-col justify-center">
        <Button
          size="full"
          className="h-[50px] font-bold"
          form="step5Form"
          disabled={!form.formState.isDirty || !form.formState.isValid}
        >
          Next
        </Button>
      </div>
    </>
  );
};
