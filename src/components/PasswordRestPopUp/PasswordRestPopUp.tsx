import { Button, TextInput } from '../'
import { zodResolver } from '@hookform/resolvers/zod';
import { PasswordSchema } from '@/models/Password';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { RestPasswordWithNewOne } from '../../lib/utils';
import { useState } from 'react';
import { Skeleton } from '../ui/skeleton';

export function PasswordRestPopUp() {
    const form = useForm<z.infer<typeof PasswordSchema>>({
        resolver: zodResolver(PasswordSchema),
        mode: 'onChange'
    });
    // const [Response, setResponse] = useState({})
    const [error, setError] = useState("")
    const { mutate, isPending } = useMutation({
        mutationFn: RestPasswordWithNewOne,
        onSuccess: data => {
                setError(data?.data?.message)
            


        },
    })
    const onSubmit = ({ Password }: { Password: string }) => {
        mutate(Password)
    };
    if (isPending) {
        return (
            <>
                <Skeleton className="mt-5 w-full h-[170px]" />
                <Skeleton className="w-full h-[50px] mt-auto mb-16" />
            </>
        )
    }
    return (
        <form className='h-full  flex flex-col  justify-between'  onSubmit={form.handleSubmit(onSubmit)}>
            <div className='flex flex-col w-full'>
                <h2 className=' font-bold text-primary text-[32px] mb-1 mt-5'>Choose a new Password</h2>
                <p className='text-gray mb-5 text-sm' >Make sure your new password is 8 characters or more. Try including numbers, letters, and punctuation marks for a strong password.</p>
                <p className='text-gray mb-5 text-sm' >You'll be logged out of all active X sessions after your password is changed..</p>
                <div className=' w-full  flex flex-col gap-5'  >
                    <div className='w-full'>
                        <TextInput
                            placeHolder='New password'
                            className='w-full mb-2'
                            type='password'
                            isPassword
                            {...form.register("Password", {
                                required: "Enter new password",
                            })}
                            errorMessage={form.formState.errors.Password?.message?.toString()}
                        />
                    </div>
                    <div className='w-full'>
                        <TextInput
                            isPassword
                            placeHolder='Confirm password'
                            className='w-full mb-2'
                            type='password' 
                            {...form.register("ConfirmPassword", {
                                required: "Enter the same password",
                            })}
                            errorMessage={form.formState.errors.ConfirmPassword?.message?.toString()}
                            />
                    </div>
                </div>
            </div>
            <Button variant={'default'} className='w-full py-3' type='submit'  disabled={!form.formState.isValid}>Change password</Button>
            <h1 className='text-danger'>{error?error:""}</h1>{/*be replaced  */}
        </form>
    )
}