import { PopUpContainer } from "../../components/index";
import { HeaderButton } from "../../models/PopUpModel";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignIn, SignInSchema } from "@/models/SignIn";
import LoginEmail from "./LoginEmail";
import LoginPassword from "./LoginPassword";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { findEmail, loginSerive } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Toast } from "@/components/ui/toast";
import { toast, useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";


export default function Login() {
    const [step, setStep] = useState(1);
    const [showDialog, setshowDialog] = useState(true);
    const { toast } = useToast();
    const { mutateAsync: checkEmailExistence, isPending: checkEmailExistencePending } = useMutation({
        mutationFn: findEmail,
        // onError: () => {
        //     toast({
        //         description: "Sorry,we couldn't find your account",
        //         variant: "secondary",
        //     })
        // }
    });
    const { mutateAsync: loginService, isPending: loginServicePending } = useMutation({
        mutationFn: loginSerive,
    });
    const form = useForm<SignIn>({
        mode: 'onChange',
        resolver: zodResolver(SignInSchema)
    }
    );
    function closeDialog(): void {
        setshowDialog(false);
    }
    async function incrementStep(): Promise<void> {
        if (step == 1) {
            var res: any = await checkEmailExistence(form.getValues("email"));
            console.log();
            if (!res.available) {
                toast({
                    description: "Sorry,we couldn't find your account",
                    variant: "secondary",
                    duration: 2000,
                })
                return;
            }
        }
        setStep(step + 1);
    }
    const onSubmit = async (data: SignIn) => {
        var { avalible, message }: any = await loginService(data);
        if (avalible) {
            form.reset();
        }
        else {
            toast({
                description: message,
                variant: "secondary",
                duration: 2000,
            })
            return;
        }
    }
    return (
        <>
            <form onSubmit={form.handleSubmit(onSubmit)} >
                <PopUpContainer className="flex flex-col" show={showDialog} showLogo={true} headerButton={HeaderButton.close} headerFunction={closeDialog} >
                    {(checkEmailExistencePending || loginServicePending) && (
                        <>
                            <Skeleton className="mt-5 w-full h-[170px]" />
                            <Skeleton className="w-full h-[50px] mt-auto mb-16" />
                        </>
                    )}
                    {(step === 1 && !checkEmailExistencePending) && (<LoginEmail incrementStep={incrementStep} form={form} />)}
                    {(step === 2 && !loginServicePending) && (<LoginPassword
                        incrementStep={form.handleSubmit((data) => {
                            onSubmit(data);
                        })}
                        form={form} />)}
                </PopUpContainer>
                {/* <Toaster /> */}
            </form>
        </>
    )
}