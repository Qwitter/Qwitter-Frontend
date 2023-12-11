import { Button } from "@/components/ui/button";
import { SignInProp } from "./LoginPropsType";
import { TextInput } from "@/components/TextInput/TextInput";
import { Link } from "react-router-dom";
export function LoginPassword({ incrementStep, form }: SignInProp) {
    return (
        <div className="w-full h-full flex flex-col items-center justify-between">
            <div>
                <p className='my-5 text-3xl font-bold break-words text-start h-[40px] w-[440px]' data-testid="enterPassword">Enter your password</p>
                <TextInput disabled={true}
                    defaultValue={form.getValues("email")}
                    className="w-[440px]"
                    placeHolder="Email" 
                    data-testid='emailPassword'
                    />
                <TextInput
                    {...form.register("password")}
                    data-testid="pass"
                    role="passwordInput"
                    isPassword={true}
                    type="password"
                    className="w-[440px]"
                    placeHolder="Password"
                    errorMessage={ form.formState.errors.password?.message?.toString()}
                />
                <Link to="/i/flow/password_reset">

                    <span className="w-[440px] hover:underline hover:cursor-pointer font-light text-secondary" data-testid="forgotPasswordPassword">Forgot password?	</span>
                </Link>
            </div>
            <div>
                <Button data-testid="login" disabled={!form.watch("password")} variant="default" className="my-5 h-[51px] w-[440px]" onClick={incrementStep}>Log in</Button>
                 <p className="text-start text-slate-400 w-[440px]">Don't have an account?
                <Link to="/i/flow/signup/input_flow_data">
                    <span className="mx-1 hover:underline hover:cursor-pointer text-secondary">Sign up</span>
                </Link>
            </p>
            </div>
        </div>
    )
}
