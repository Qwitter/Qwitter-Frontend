import { PopUpContainer } from "../../components/index";
import { HeaderButton } from "../../models/PopUpModel";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignIn, SignInSchema } from "@/models/SignIn";
import { LoginEmail } from "./LoginEmail";
import { LoginPassword } from "./LoginPassword";
import { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { findEmail, loginService } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import {  useNavigate } from "react-router-dom";
import { UserContext } from "@/contexts/UserContextProvider";

type loginprops={
    fn?:()=>void;
}
export function Login(pros?:loginprops) {
    const [step, setStep] = useState(1);
    const [showDialog, setshowDialog] = useState(true);
    const { toast } = useToast();
    const { saveUser } = useContext(UserContext);
    const navigate = useNavigate();
    const { mutateAsync: checkEmailExistence, isPending: checkEmailExistencePending } = useMutation({
        mutationFn: findEmail,
    });
    const { mutateAsync: loginServiceFn, isPending: loginServicePending } = useMutation({
        mutationFn: loginService,
    });
    const form = useForm<SignIn>({
        mode: 'onChange',
        resolver: zodResolver(SignInSchema)
    }
    );
    function closeDialog(): void {
        navigate(-1)
        setshowDialog(false);
    }
    async function incrementStep(): Promise<void> {
        if (step == 1) {
            const res = await checkEmailExistence(form.getValues("email"));
            if (!res?.available) {
                toast({
                    description: "Sorry,we couldn't find your account",
                    variant: "secondary",
                    duration: 2000,
                })
                if(pros?.fn)  pros?.fn() 
                return;
            }
        }
        setStep(step + 1);
    }
    const onSubmit = async (data: SignIn) => {
        const res = await loginServiceFn(data);
        if (res) {
            form.reset();
            saveUser(res.user,res.token);
            navigate("/home");
        }
        else {
            toast({
                description: "wrong password or email",
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
                    {(step === 1 && !checkEmailExistencePending) && (<LoginEmail  incrementStep={incrementStep} form={form} />)}
                    {(step === 2 && !loginServicePending) && (<LoginPassword
                        incrementStep={form.handleSubmit((data) => {
                            onSubmit(data);
                        })}
                        form={form} />)}
                </PopUpContainer>
            </form>
        </>
    )
}