// props for all login steps
import { SignIn } from "@/models/SignIn";
import { MouseEventHandler } from "react";
import { UseFormReturn } from "react-hook-form";
export type SignInProp = {
    incrementStep: MouseEventHandler;
    form: UseFormReturn<SignIn>;
};