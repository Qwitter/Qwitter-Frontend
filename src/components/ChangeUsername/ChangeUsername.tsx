import { useContext, useEffect, useState } from "react";
import { ShowSuggestionsNames } from "../ShowSuggestionsNames/ShowSuggestionsNames";
import { OptionsHeader } from "../OptionsHeader/OptionsHeader";
import { Button } from "../ui/button";
import { TextInput } from "../TextInput/TextInput";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UsernameSchema } from "@/models/Username";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {  updateUsername } from "@/lib/utils";
import { Spinner } from "../Spinner";
import { toast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "@/contexts/UserContextProvider";


export function ChangeUsername() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof UsernameSchema>>({
    resolver: zodResolver(UsernameSchema),
    mode: "onChange",
  });
  const { user, token,saveUser } = useContext(UserContext)

  const { mutate, isPending } = useMutation({
    mutationFn: updateUsername,
    onSuccess: (data, {username}) => {
      if (data==200) {
        toast({
          title: "Change Username",
          description: "Username changed Successfully with " + username,
        });
        //update the context
        saveUser({...user!,userName:username},token!)
        navigate(-1);
      }
      else if(data ==409){
        toast({
          title: "Change Username",
          description: "Failed : You can't use the same username",
          variant:"destructive"
        });
      }
      else{
        toast({
          title: "Change Username",
          description: "Failed : try again later",
          variant:"destructive"
        });
      }
    },
    onError: () => {
      toast({
        title: "Change Username",
        description: "Failed : try again later",
        variant:"destructive"
      });
      navigate(-1);
  }
  });
  const [inputValue, setInputValue] = useState("");
  const [isClickChange, setIsClickChange] = useState(false);

  useEffect(() => {
    setTimeout(()=>{
      form.setValue("defaultUsername", user?.userName||"")
      form.trigger("defaultUsername")
      setInputFieldValue(user?.userName||"");
     
    },0)
  }, [user]);

  const setInputFieldValue = (value: string, clickFlag = false) => {
    setIsClickChange(clickFlag);
    form.setValue("username", value);
    setInputValue(value);
    form.trigger("username");
  };
  const onSubmit = ({ username }: { username: string }) => {
    mutate({ token: token! , username })
  };

  if (isPending) {
    return (
      <div className=" w-full h-full border-r border-primary border-opacity-30 mb-20">
        <OptionsHeader header="Change username" />
        <div>
          <div className="w-full flex justify-center items-center p-3 text-center h-[104px]">
            <Spinner />
          </div>
          <div className="border-y w-full p-4 h-[292px] flex justify-center items-center border-primary border-opacity-20  flex-col gap-5">
            <div className="w-full">
              <Spinner />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" w-full h-full border-r border-primary border-opacity-30 mb-20">
      <OptionsHeader header="Change username" />
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="w-full p-3">
          <TextInput
            role="usernameInput"
            required
            placeHolder="Username"
            className="w-full"
            {...form.register("username", {
              required: "Enter your username",
              onChange: (e) => setInputFieldValue(e.target.value),
            })}
            value={inputValue}
            errorMessage={
              form.formState.errors.username?.message?.toString() || ""
            }
            data-testid="username"
          />
        </div>
        <div className="border-y w-full p-4 border-primary border-opacity-20">
          <div className="h-14  mb-2">
            <h2 className="text-primary text-xl font-extrabold text-start ">
              Suggestions
            </h2>
          </div>
          <ShowSuggestionsNames
            isClickChange={isClickChange}
            username={inputValue}
            className="flex flex-col flex-wrap gap-4"
            onSuggestionClick={setInputFieldValue}
            showSuggestion={true}
            numberOfSuggestions={5}
          />
        </div>
        <div className="w-full p-4">
          <Button
            variant="secondary"
            role="save"
            className="block ml-auto"
            disabled={user?.userName==inputValue||!form.formState.isValid}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
