import { PopUpContainer } from "../../components/index";
import { HeaderButton } from "../../models/PopUpModel";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignIn, SignInSchema } from "@/models/SignIn";
import LoginEmail from "./LoginEmail";
import LoginPassword from "./LoginPassword";
import { useState } from "react";


export default function Login() {
    const [step, setStep] = useState(1);
    const [showDialog, setshowDialog] = useState(true);
    const form = useForm<SignIn>({
        mode: 'onChange',
        resolver: zodResolver(SignInSchema)
    }
    );
    function closeDialog(): void {
        setshowDialog(false);
    }
    function incrementStep(): void {
        setStep(step + 1);
    }
    const onSubmit = async (data: SignIn) => {
        console.log(data);
        form.reset();
    }
    return (
        <>
            <form onSubmit={form.handleSubmit(onSubmit)} >
                <PopUpContainer className="flex flex-col" show={showDialog} showLogo={true} headerButton={HeaderButton.close} headerFunction={closeDialog} >
                    {step === 1 && (<LoginEmail incrementStep={incrementStep} form={form} />)}
                    {step === 2 && (<LoginPassword
                        incrementStep={form.handleSubmit((data) => {
                            onSubmit(data);
                        })}
                        form={form} />)}
                </PopUpContainer>
            </form>
        </>
    )
}