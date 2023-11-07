import { PopUpContainer } from "../../components/index";
import { Button } from "../../components/ui/button";
import { TextInput } from "../../components/TextInput/TextInput";
import { HeaderButton } from "../../models/PopUpModel";
import { AiFillApple } from "react-icons/ai";
import { FcGoogle } from 'react-icons/fc';
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
// props for all login steps
type SignInProp = {
    incrementStep: any;
    show: boolean;
    func: any;
    form: any;
};
const Step1 = ({ incrementStep, show, func, form }: SignInProp) => {
    return (
        <>
            <PopUpContainer show={show} showLogo={true} headerButton={HeaderButton.close} headerFunction={func}>
                <div className="w-full flex flex-col items-center">
                    <p className='my-5 text-3xl font-bold break-words text-start h-[40px] w-[300px]'>Sign in to X</p>
                    <Button variant="default" className="items-center my-5 h-[40px] w-[300px]">
                        <FcGoogle size="1.5rem" />
                        <div className="mx-1">Sign in with Google</div>
                    </Button>
                    <Button variant="default" className="items-center my-5 h-[40px] w-[300px]">
                        <AiFillApple size="1.5rem" />
                        <div className="mx-1">Sign in with Apple</div>
                    </Button>
                    <p className="text-center or-item h-[40px] w-[300px] relative" >or</p>
                    <TextInput
                        {...form.register("email")}
                        className="w-[300px]"
                        placeHolder="Email"
                    />
                    <Button disabled={!form.watch("email")} variant="default" className="items-center my-5 h-[40px] w-[300px]" onClick={incrementStep}>
                        <div className="mx-1">Next</div>
                    </Button>
                    <Button variant="outline" className='text-white my-5 h-[40px] w-[300px]'>Forgot Password?</Button>
                    <p className="text-start text-slate-400 w-[300px]">Don't have an account?
                        <span className="mx-1 hover:underline hover:cursor-pointer text-secondary">Sign up</span>
                    </p>
                </div>
            </PopUpContainer>
        </>
    )
}

const Step2 = ({ incrementStep, show, func, form }: SignInProp) => {
    return (
        <>
            <PopUpContainer className="flex flex-col justify-center" show={show} showLogo={true} headerButton={HeaderButton.close} headerFunction={func} >
                <div className="w-full h-full flex flex-col items-center justify-between">
                    <div>
                        <p className='my-5 text-3xl font-bold break-words text-start h-[40px] w-[440px]'>Enter your password</p>
                        <TextInput disabled={true}
                            defaultValue={form.getValues("email")}
                            className="w-[440px]"
                            placeHolder="Email" />
                        <TextInput
                            {...form.register("password", {
                                required: true
                            })}
                            isPassword={true}
                            className="w-[440px]"
                            placeHolder="Password" />
                        <span className="w-[440px] hover:underline hover:cursor-pointer font-light text-secondary">Forgot password?	</span>
                    </div>
                    <div>
                        <Button disabled={!form.watch("password")} variant="default" className="my-5 h-[51px] w-[440px]" onClick={incrementStep}>Log in</Button>
                        <p className="text-start text-slate-400 w-[440px]">Don't have an account?
                            <span className="mx-1 hover:underline hover:cursor-pointer text-secondary">Sign up</span>
                        </p>
                    </div>
                </div>
            </PopUpContainer>
        </>
    )
}
export default function Login() {
    const [step, setStep] = useState<number>(1);
    const [showDialog, setshowDialog] = useState<boolean>(true);
    const form = useForm();
    const {
        handleSubmit,
        reset,
    } = form;
    function closeDialog(): void {
        setshowDialog(false);
    }
    function incrementStep(): void {
        setStep(step + 1);
    }
    const onSubmit = async (data: FieldValues) => {
        console.log(data);
        reset();
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} >
                {step === 1 && (<Step1 show={showDialog} func={closeDialog} incrementStep={incrementStep} form={form} />)}
                {step === 2 && (<Step2 show={showDialog} func={closeDialog}
                    incrementStep={handleSubmit((data) => {
                        onSubmit(data);
                    })}
                    form={form} />)}
            </form>
        </>
    )
}


