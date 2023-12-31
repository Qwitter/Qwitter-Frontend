import { useForm } from 'react-hook-form';
import { Button } from '../ui/button'
import { TextInput } from '../TextInput/TextInput'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailSchema } from '@/models/Email';
import { useMutation } from '@tanstack/react-query';
import { Skeleton } from '../ui/skeleton';
import { sendResetPasswordVerificationEmail } from '@/lib/utils';
import { useState } from 'react';

type prob = {
    nextStep: () => void;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
}
export function FindEmailPopUp({ nextStep, setEmail }: prob) {
    const form = useForm<z.infer<typeof EmailSchema>>({
        resolver: zodResolver(EmailSchema),
        mode: 'onChange'
    });
    const [error, setError] = useState("")
    const { mutate, isPending } = useMutation({
        mutationFn: sendResetPasswordVerificationEmail,
        onSuccess: (_, email) => {
            setEmail(email)
            nextStep();
        },
        onError: (data) => {
        
            setError(data.message)
            setEmail("")
        },
    })
    const onSubmit = ({ email }: { email: string }) => {
        mutate(email)
    };
    if (isPending) {
        return (
            <>
                <Skeleton data-testid="skeleton" className="mt-5 w-full h-[170px]" />
                <Skeleton data-testid="skeleton" className="w-full h-[50px] mt-auto mb-16" />
            </>
        )
    }
    return (
        <form className='h-full flex flex-col  justify-between' onSubmit={form.handleSubmit(onSubmit)}
        >
            <div className='flex flex-col w-full'>
                <h2 className=' font-bold text-primary text-[32px] mb-1 mt-5'>Find your Qwitter account</h2>
                <p className='text-gray mb-5' >Enter the email or username associated with your account to change your password.</p>
                <TextInput
                    placeHolder='Email'
                    className='w-full'
                    role='text'
                    {...form.register("email", {
                        required: "Enter your Email",
                    })}
                    errorMessage={form.formState.errors.email?.message?.toString() ?? error}
                />
            </div>
            <Button variant={'default'} className='w-full py-3 cursor-pointer' type='submit' role='submitButton' disabled={!form.formState.isValid}>Next</Button>
        </form>
    )
}