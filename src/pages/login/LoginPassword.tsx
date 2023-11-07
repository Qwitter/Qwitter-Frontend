import { Button } from "@/components/ui/button";
import { SignInProp } from "./LoginPropsType";
import { TextInput } from "@/components/TextInput/TextInput";
function LoginPassword({ incrementStep, form }: SignInProp) {
    return (
        <div className="w-full h-full flex flex-col items-center justify-between">
            <div>
                <p className='my-5 text-3xl font-bold break-words text-start h-[40px] w-[440px]'>Enter your password</p>
                <TextInput disabled={true}
                    defaultValue={form.getValues("email")}
                    className="w-[440px]"
                    placeHolder="Email" />
                <TextInput
                    {...form.register("password")}
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
    )
}

export default LoginPassword