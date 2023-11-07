import { Button } from '../ui/button'
import { TextInput } from '../TextInput/TextInput'
import { zodResolver } from '@hookform/resolvers/zod';
import { PasswordSchema } from '@/models/Password';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { restPasswordWithNewOne } from '../../lib/utils';
import { Skeleton } from '../ui/skeleton';
import { useToast } from '../ui/use-toast';
type PasswordRestPopUpProps = {
    email: string;
    onSuccess:()=>void;

};
export function PasswordRestPopUp({ email,onSuccess }: PasswordRestPopUpProps) {
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
            onSuccess();

        },
    })
    const onSubmit = ({ Password }: { Password: string }) => {
        mutate({ password: Password, email: email });
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
        <form className='h-full  flex flex-col  justify-between' onSubmit={form.handleSubmit(onSubmit)}>
            <div className='flex flex-col w-full'>
                <h2 className=' font-bold text-primary text-[32px] mb-1 mt-5'>Choose a new Password</h2>
                <p className='text-gray mb-5 text-sm' >Make sure your new password is 8 characters or more. Try including numbers, letters, and punctuation marks for a <a href='https://help.twitter.com/en/safety-and-security/account-security-tips#:~:text=Do%20create%20a%20password%20at,for%20each%20website%20you%20visit.' className='text-secondary'>strong password</a>.</p>
                <p className='text-gray mb-5 text-sm' >You'll be logged out of all active X sessions after your password is changed.</p>
                <div className=' w-full  flex flex-col gap-5'  >
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
                        />
                    </div>
                </div>
            </div>
            <Button variant={'default'} className='w-full py-3' role='submitButton' type='submit' disabled={!form.formState.isValid}>Change password</Button>

        </form>
    )
}