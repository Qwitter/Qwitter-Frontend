import { Link } from "react-router-dom";
import { Button, OptionsHeader, TextInput } from "..";
import { useForm } from "react-hook-form";
import { PasswordAPISchema } from "@/models/Password";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "../ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { resetPasswordWithNewOne } from "@/lib/utils";
import { Spinner } from "../Spinner";
import { useContext, useEffect } from "react";
import { UserContext } from "@/contexts/UserContextProvider";

export function ChangePassword() {
  const form = useForm<z.infer<typeof PasswordAPISchema>>({
    defaultValues: { Password: "",ConfirmPassword:"",CurrentPassword:"" },
    resolver: zodResolver(PasswordAPISchema),
    mode:"onSubmit"
  });
  const {token} = useContext(UserContext)
  const { toast } = useToast();
  const { mutate, isPending } = useMutation({
    mutationFn: resetPasswordWithNewOne,
    onSuccess: () => {
      toast({
        description: "Your password has been successfully updated",
        variant:"secondary"
      });
      form.reset()

    },
  });
  useEffect(()=>{form.setValue("Token",token||"")
  form.trigger("Token")

},[])

  const onSubmit = ({ Password }: { Password: string }) => {
    mutate({ password: Password, token:token ||"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJiZGZhYmRhLWZjNDYtNGJkNi1iOTYzLWQxNWMwNGQ3NTY3ZiIsImlhdCI6MTY5OTgyNzU3NiwiZXhwIjoxNzAwNjkxNTc2fQ.mtJ_LPNlMdgYUJn2290ZKZs8_nT0f4VltGCNfnxx9LM" });
  };
  if (isPending) {
    return (
      <div className=" w-full h-full border-r border-primary border-opacity-30 mb-20">
        <OptionsHeader header="Change your password" />
        <div>
          <div className="w-full flex justify-center items-center p-3 text-center h-[134px]">
            <Spinner />
          </div>
          <div className="border-y w-full p-4 h-[229px] flex justify-center items-center border-primary border-opacity-20  flex-col gap-5">
            <div className="w-full">
              <Spinner />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className=" w-full h-full border-r border-primary border-opacity-30 mb-20">
      <OptionsHeader header="Change your password" />
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="w-full p-3">
          <TextInput
            placeHolder="Current password"
            className="w-full mb-2"
            isPassword
            {...form.register("CurrentPassword", {
              required: "Enter your password",
            })}
            errorMessage={form.formState.errors.CurrentPassword?.message?.toString()}

          />
          <Link
            to="/i/flow/password_reset"
            className="text-secondary text-[13px] pl-4 block"
          >
            Forget password?
          </Link>
        </div>
        <div className="border-y w-full p-4 border-primary border-opacity-20 flex flex-col gap-5">
          <div className="w-full">
            <TextInput
              placeHolder="New password"
              className="w-full mb-2"
              type="password"
              role="text"
              isPassword
              {...form.register("Password", {
                required: "Enter new password",
              })}
              errorMessage={form.formState.errors.Password?.message?.toString()}
            />
          </div>
          <div className="w-full">
            <TextInput
              isPassword
              placeHolder="Confirm password"
              className="w-full mb-2"
              role="confirmPassword"
              type="password"
              {...form.register("ConfirmPassword", {
                required: "Enter the same password",
              })}
              errorMessage={form.formState.errors.ConfirmPassword?.message?.toString()}
            />
          </div>
        </div>
        <div className="w-full p-4">
          <Button
            variant="secondary"
            className="block ml-auto"
            type="submit"
            disabled={!(form.formState.dirtyFields.ConfirmPassword&&form.formState.dirtyFields.CurrentPassword&&form.formState.dirtyFields.Password)}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
