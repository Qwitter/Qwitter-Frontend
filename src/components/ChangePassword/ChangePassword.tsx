import { Link } from 'react-router-dom'
import { Button, OptionsHeader, TextInput } from '..'
import { useForm } from 'react-hook-form';
import { PasswordSchema } from '@/models/Password';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '../ui/use-toast';
import { useMutation } from '@tanstack/react-query';
import { restPasswordWithNewOne } from '@/lib/utils';
import { Spinner } from '../Spinner';

export function ChangePassword() {
    const form = useForm<z.infer<typeof PasswordSchema>>({
        resolver: zodResolver(PasswordSchema),
        mode: 'onChange'
    });
    const { toast } = useToast()
    const { mutate, isPending } = useMutation({
        mutationFn: restPasswordWithNewOne,
        onSuccess: data => {
            toast({
                title: "Rest Password",
                description: data?.data?.message
            })


        },
    })
    const onSubmit = ({ Password }: { Password: string }) => {
        mutate({ password: Password, email: "dsafk" });
    };
    if (isPending) {
        return (

            <div className=" w-full h-full border-r border-primary border-opacity-30 mb-20">
                <OptionsHeader header='Change your password' />
                <div >
                    <div className='w-full flex justify-center items-center p-3 text-center h-[134px]'>
                        <Spinner />

                    </div>
                    <div className='border-y w-full p-4 h-[229px] flex justify-center items-center border-primary border-opacity-20  flex-col gap-5' >
                        <div className='w-full'>
                            <Spinner />
                        </div>
                    </div>

                </div>
            </div>
        )
    }
    return (
        <div className=" w-full h-full border-r border-primary border-opacity-30 mb-20">
            <OptionsHeader header='Change your password' />
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className='w-full p-3'>
                    <TextInput placeHolder='Current password'
                        className='w-full mb-2'
                        type='password'
                        isPassword
                        {...form.register("CurrentPassword", {
                            required: "Enter your password",
                        })}

                    />
                    <Link to="/i/flow/password_reset" className='text-secondary text-[13px] pl-4 block'>Forget password?</Link>

                </div>
                <div className='border-y w-full p-4 border-primary border-opacity-20 flex flex-col gap-5' >
                    <div className='w-full'>
                        <TextInput
                            placeHolder='New password'
                            className='w-full mb-2'
                            type='password'
                            role='text'
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
                            role="confirmPassword"
                            type='password'
                            {...form.register("ConfirmPassword", {
                                required: "Enter the same password",
                            })}
                            errorMessage={form.formState.errors.ConfirmPassword?.message?.toString()}
                        />                    </div>
                </div>
                <div className='w-full p-4'>
                    <Button variant="secondary" className='block ml-auto' type='submit' disabled={!form.formState.isValid}>Save</Button>
                </div>
            </form>
        </div>
    )
}
