import { useContext, useEffect, useState } from 'react'
import { Button, ShowSuggestionsNames, TextInput } from '../'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { UsernameSchema } from '@/models/Username';
import { zodResolver } from '@hookform/resolvers/zod';
import { Skeleton } from '../ui/skeleton';
import { useMutation } from '@tanstack/react-query';
import { updateUsername } from '@/lib/utils';
import { UserContext } from '@/contexts/UserContextProvider';
type Props = {
    nextStep: () => void;

}

export function UsernameSuggestion({ nextStep }: Props) {
    const form = useForm<z.infer<typeof UsernameSchema>>({
        resolver: zodResolver(UsernameSchema),
        mode: 'onChange'
    });
    const { user, token } = useContext(UserContext)
    const { mutate, isPending } = useMutation({
        mutationFn: updateUsername,
        onSuccess: (data) => {
            if (data) {
                nextStep();
            }
        },
        onError: (data) => {
            console.log(data);
        }
    })
    useEffect(() => {
        form.setValue("defaultUsername", user!.userName!)
        setInputFieldValue(user!.userName!)
        form.trigger("defaultUsername")
    }, [])

    const [inputValue, setInputValue] = useState("");
    const setInputFieldValue = (value: string) => {
        setInputValue(value);
        form.setValue('username', value);
        form.trigger("username")
    };
    const onSubmit = ({ username }: { username: string }) => {
        if (user!.userName! === username) nextStep();

        mutate({ token: token! , username })
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
        <form className='h-[96%] w-full  flex flex-col  justify-between' onSubmit={form.handleSubmit(onSubmit)} >
            <div className='flex flex-col w-full'>
                <h2 className=' font-bold text-primary text-[32px] mb-1 mt-5'>What should we call you?</h2>
                <p className='text-gray mb-5' >Your @username is unique. You can always change it later.</p>
                <TextInput
                    required
                    placeHolder='Username'
                    className='w-full'
                    data-testid='username'
                    {...form.register("username", {
                        required: "Enter your username",
                        onChange: (e) => setInputFieldValue(e.target.value),

                    })}
                    value={inputValue}
                    errorMessage={form.formState.errors.username?.message?.toString() || ""}

                />
                <ShowSuggestionsNames onSuggestionClick={setInputFieldValue} />
            </div>
            <Button variant={'default'} className='w-full py-3 cursor-pointer' type='submit' role='submitButton' disabled={!form.formState.isValid}>Next</Button>
        </form>
    )
}