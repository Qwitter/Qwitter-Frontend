import { useForm } from 'react-hook-form';
import { Button } from '../ui/button'
import { TextInput } from '../TextInput/TextInput'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from '@tanstack/react-query';
import { Skeleton } from '../ui/skeleton';
import { verifyPassword } from '@/lib/utils';
import { useContext } from 'react';
import { VerifyPasswordSchema } from '@/models/VerifyPassword';
import { toast } from '../ui/use-toast';
import { UserContext } from '@/contexts/UserContextProvider';

type prob = {
    nextStep: () => void;
}
export function VerifyEmailPassword({ nextStep }: prob) {
    const { token, } = useContext(UserContext)
    const form = useForm<z.infer<typeof VerifyPasswordSchema>>({
        resolver: zodResolver(VerifyPasswordSchema),
    });
    const { mutate, isPending } = useMutation({
        mutationFn: verifyPassword,
        onSuccess: (data) => {
            if (data)
                nextStep();
            else
                toast({
                    description: "Wrong password!",
                    variant: "secondary",
                    duration: 2000,
                    className: "py-4"

                })
        },
        onError: () => {
            toast({
                description: "Wrong password!",
                variant: "secondary",
                duration: 2000,
                className: "py-4"

            })
        },
    })
    const onSubmit = ({ Password }: { Password: string }) => {
        mutate({ token: token!, password: Password })
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
        <form className='h-full w-[90%] flex flex-col   justify-between' onSubmit={form.handleSubmit(onSubmit)}
        >
            <div className='flex flex-col w-full'>
                <h2 className=' font-bold text-primary text-[32px] mb-1 mt-5'>Verify your password</h2>
                <p className='text-gray mb-5' >Re-enter your X password to continue.</p>
                <TextInput
                    placeHolder='password'
                    className='w-full'
                    isPassword
                    type='password'
                    role='text'
                    {...form.register("Password", {
                        required: "password is required",
                    })}
                />
            </div>
            <Button variant={'default'} className='w-full py-3 cursor-pointer' type='submit' role='submitButton' disabled={!form.formState.isValid}>Next</Button>
        </form>
    )
}