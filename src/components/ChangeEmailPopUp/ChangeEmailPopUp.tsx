import { useForm } from 'react-hook-form';
import { Button } from '../ui/button'
import { TextInput } from '../TextInput/TextInput'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Skeleton } from '../ui/skeleton';
import { useContext } from 'react';
import { UserContext } from '@/contexts/UserContextProvider';
import { EmailAPISchema } from '@/models/Email';

type prob = {
    nextStep: () => void;
    cancel: () => void;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
}
export function ChangeEmailPopUp({ nextStep, cancel, setEmail }: prob) {
    const { user } = useContext(UserContext)
    const form = useForm<z.infer<typeof EmailAPISchema>>({
        resolver: zodResolver(EmailAPISchema),
        mode: 'onChange'
    });

    const onSubmit = ({email}:{email:string}) => {
        setEmail(email)
        nextStep();
    };

    return (
        <form className='h-full w-[84.5%] flex flex-col   justify-between' onSubmit={form.handleSubmit(onSubmit)}
        >
            <div className='flex flex-col w-full'>
                <h2 className=' font-bold text-primary text-[32px] mb-1 mt-5'>Change email</h2>
                <p className='text-gray mb-5 text-[15px]' >Your current email is {user?.email}. What would you like to update it to? Your email is not displayed in your public profile on Qwitter.</p>
                <p className='text-gray mb-10' >If you change your email address, any existing Google SSO connections will be removed. Review Connected accounts.</p>
                <TextInput
                    placeHolder='Email'
                    className='w-full'
                    role='text'
                    {...form.register("email", {
                        required: "Enter your Email",
                    })}
                    errorMessage={form.formState.errors.email?.message?.toString()}
                />
            </div>
            <Button variant={!form.formState.isValid ? 'outline' : 'default'} className='w-full py-3 cursor-pointer' type={form.formState.isValid ? 'submit' : "button"} role='submitButton' onClick={() => { !form.formState.isValid && cancel() }}>{form.formState.isValid ? 'Next' : 'Cancel'}</Button>
        </form>
    )
}