import { useState } from 'react';
import { Button, OptionsHeader, ShowSuggestionsNames, TextInput } from '..'
import { useForm } from 'react-hook-form';
import {  z } from 'zod';
import { UsernameSchema } from '@/models/Username';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { isAvailableUsername } from '@/lib/utils';
import { Spinner } from '../Spinner';
import { toast } from '../ui/use-toast';
type Props = {
    userName: string
}

export function ChangeUsername({ userName }: Props) {
    const form = useForm<z.infer<typeof UsernameSchema>>({
        resolver: zodResolver(UsernameSchema),
        mode: 'onChange'
    });    const { mutate, isPending } = useMutation({
        mutationFn: isAvailableUsername,
        onSuccess: (data, username) => {
            console.log(data)
            if (data) {
                toast({
                    title: "Change Username",
                    description: "Username changed Successfully"
                })
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

            <div className=" w-full h-full border-r border-primary border-opacity-30 mb-20">
                <OptionsHeader header='Change your password' />
                <div >
                    <div className='w-full flex justify-center items-center p-3 text-center h-[104px]'>
                        <Spinner />

                    </div>
                    <div className='border-y w-full p-4 h-[292px] flex justify-center items-center border-primary border-opacity-20  flex-col gap-5' >
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
            <OptionsHeader header='Change username' />
            <form onSubmit={form.handleSubmit(onSubmit)} >
                <div className='w-full p-3'>
                    <TextInput
                        required
                        placeHolder='Username'
                        className='w-full'
                        {...form.register("username", {
                            required: "Enter your username",
                            onChange: (e) => setInputFieldValue(e.target.value),

                        })}
                        value={inputValue}
                        errorMessage={form.formState.errors.username?.message?.toString() || ""}

                    />                </div>
                <div className='border-y w-full p-4 border-primary border-opacity-20' >
                    <div className="h-14  mb-2">
                        <h2 className="text-primary text-xl font-extrabold text-start ">Suggestions</h2>
                    </div>
                    <ShowSuggestionsNames className='flex flex-col flex-wrap gap-4' email={userName + '@'} onSuggestionClick={setInputValue} showSuggestion={true} numberOfSuggestions={6} />
                </div>
                <div className='w-full p-4'>
                    <Button variant="secondary" className='block ml-auto'disabled={!form.formState.isValid}>Save</Button>
                </div>
            </form>
        </div>
    )
}
