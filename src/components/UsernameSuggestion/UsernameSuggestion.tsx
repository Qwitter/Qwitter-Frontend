import { useState } from 'react'
import { Button, ShowSuggestionsNames, TextInput } from '../'
import { useForm } from 'react-hook-form';
import {  z } from 'zod';
import { UsernameSchema } from '@/models/Username';
import { zodResolver } from '@hookform/resolvers/zod';
import { Skeleton } from '../ui/skeleton';
import { useMutation } from '@tanstack/react-query';
import { isAvailableUsername } from '@/lib/utils';
// import { useQuery } from '@tanstack/react-query';
type Props = {
    email: string;
    nextStep: (v:string) => void;
}

export function UsernameSuggestion({ email, nextStep }: Props) {
    const form = useForm<z.infer<typeof UsernameSchema>>({
        resolver: zodResolver(UsernameSchema),
        mode: 'onChange'
    });

    // const {
    //     isPending: isGettingUsernames,
    //     isError: hasFailedToSend,
    //   } = useQuery({
    //     queryKey: ["usernameSuggestions"],
    //     queryFn: async () => sendVerificationEmail(email),
    //     staleTime: 0,
    //     retry: 0,
    //     retryDelay: 2000,
    //     refetchOnMount: false,
    //     refetchOnReconnect: false,
    //     refetchOnWindowFocus: false,
    //   });
    const { mutate, isPending } = useMutation({
        mutationFn: isAvailableUsername,
        onSuccess: (data,username) => {
            console.log(data)
            if (data) {
                nextStep(username);
            }

        },
    })

    const [inputValue, setInputValue] = useState(""); 
    const setInputFieldValue = (value: string) => {
        setInputValue(value);
        // Set the value in the form using React Hook Form
        form.setValue('username', value);
    };
    const onSubmit = ({ username }: { username: string }) => {
        mutate(username)
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
        <form className='h-full  flex flex-col  justify-between' onSubmit={form.handleSubmit(onSubmit)} >
            <div className='flex flex-col w-full'>
                <h2 className=' font-bold text-primary text-[32px] mb-1 mt-5'>What should we call you?</h2>
                <p className='text-gray mb-5' >Your @username is unique. You can always change it later.</p>
                <TextInput
                    required
                    placeHolder='Username'
                    className='w-full'

                    {...form.register("username", {
                        required: "Enter your username",
                        onChange:(e) => setInputFieldValue(e.target.value),

                    })}
                    value={inputValue}
                    errorMessage={form.formState.errors.username?.message?.toString() || ""}

                />
                <ShowSuggestionsNames onSuggestionClick={setInputFieldValue} email={email} />
            </div>
            <Button variant={'default'} className='w-full py-3 cursor-pointer' type='submit' role='submitButton' disabled={!form.formState.isValid}>Next</Button>
        </form>
    )
}