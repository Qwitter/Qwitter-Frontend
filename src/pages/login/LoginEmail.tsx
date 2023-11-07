import { Button } from "@/components/ui/button";
import { SignInProp } from "./LoginPropsType";
import { FcGoogle } from "react-icons/fc";
import { AiFillApple } from "react-icons/ai";
import { TextInput } from "@/components/TextInput/TextInput";

function LoginEmail({ incrementStep, form }: SignInProp) {
    return (
        <div className="w-full flex flex-col items-center">
            <p className='my-5 text-3xl font-bold break-words text-start h-[40px] w-[300px]'>Sign in to Quitter</p>
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
            <Button disabled={(form.formState.errors.email || !form.formState.isDirty) as boolean | undefined} variant="default" className="items-center my-5 h-[40px] w-[300px]" onClick={incrementStep}>
                <div className="mx-1">Next</div>
            </Button>
            <Button variant="outline" className='text-white my-5 h-[40px] w-[300px]'>Forgot Password?</Button>
            <p className="text-start text-slate-400 w-[300px]">Don't have an account?
                <span className="mx-1 hover:underline hover:cursor-pointer text-secondary">Sign up</span>
            </p>
        </div>
    )
}
export default LoginEmail