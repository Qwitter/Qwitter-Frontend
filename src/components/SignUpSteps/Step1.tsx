import { SignUpStepsProps, Step1DataSchema } from "@/models/SignUp";
import { TextInput } from "../TextInput/TextInput";
import { Button } from "../ui/button";
import { FieldError, FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import BirthDayInput from "../BirthDayInput/BirthDayInput";
import { useEffect, useState } from "react";
import { findEmail } from "@/lib/utils";

interface Step1Props extends SignUpStepsProps {
  addStep1Data: Function;
}

// step 1 of the sign up with name, email and date picker
export const Step1 = ({ nextStep, userData, addStep1Data }: Step1Props) => {
  const form = useForm<any>({ resolver: zodResolver(Step1DataSchema) }); // to use react hook form
  const [isVerifying, setIsVerifying] = useState(false);

  const checkEmail = () => {
    return setTimeout(async () => {
      const email = form.getValues().email;
      if (form.getValues().email) {
        const data = await findEmail(email);
        if (data === null) return;

        if (data.data)
          form.setError("email", {
            type: "manual",
            message: "Email has already been taken",
          });
        else {
          setIsVerifying(false);
          form.clearErrors("email");
        }
      }
    }, 100);
  };

  useEffect(() => {
    setIsVerifying(true);
    const timeoutId = checkEmail();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [form.watch("email")]);

  // handle the form submission
  const onSubmit = (data: FieldValues) => {
    addStep1Data(data.name, data.email, {
      day: data.day.toString(),
      month: data.month,
      year: data.year.toString(),
    });

    nextStep();
  };

  return (
    <>
      <div className="w-full flex flex-col items-start justify-start">
        <h2 className="text-3xl font-bold my-5">Create your account</h2>
        <div className="w-full">
          <form id="step1Form" onSubmit={form.handleSubmit(onSubmit)}>
            <TextInput
              placeHolder="Name"
              {...form.register("name", {
                value: userData?.name,
              })}
              errorMessage={form.formState.errors.name?.message?.toString()}
            />

            <TextInput
              placeHolder="Email"
              {...form.register("email", {
                value: userData?.email,
              })}
              errorMessage={form.formState.errors.email?.message?.toString()}
            />
            <div className="h-[153px] w-full mt-5">
              <h4 className="text-4 font-bold mb-2">Date of birth</h4>
              <p className="text-[14px] mb-1 text-gray leading-4">
                This will not be shown publicly. Confirm your own age, even if
                this account is for a business, a pet, or something else.
              </p>
              <div className="w-full my-4">
                {/* NEEDED: help required from Seif (only need to work with types) */}
                <BirthDayInput form={form} />
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="w-full mb-6 flex flex-col justify-center">
        <Button
          size="full"
          className="h-[50px] font-bold"
          form="step1Form" // to attach the button to the form
          disabled={
            !form.formState.isDirty || !form.formState.isValid || isVerifying
          }
        >
          Next
        </Button>
      </div>
    </>
  );
};
