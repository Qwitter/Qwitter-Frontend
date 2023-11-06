/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { BirthDaySchema } from "../../models/BirthDay";
import BirthDayInput from "../BirthDayInput/BirthDayInput";

type BirthDayProps = {
  nextStep: () => void;
  setBirthDay: React.Dispatch<
    React.SetStateAction<z.infer<typeof BirthDaySchema> | null>
  >;
  birthDay: z.infer<typeof BirthDaySchema> | null;
};

const BirthDay = ({ nextStep, setBirthDay, birthDay }: BirthDayProps) => {
  const form = useForm<z.infer<typeof BirthDaySchema>>({
    resolver: zodResolver(BirthDaySchema),
    defaultValues: {
      //@ts-ignore
      day: birthDay?.day.toString(),
      month: birthDay?.month,
      //@ts-ignore
      year: birthDay?.year.toString(),
    },
  });

  const onSubmit = (data: z.infer<typeof BirthDaySchema>) => {
    setBirthDay(data);
    nextStep();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col h-full"
      >
        <h2 className="text-3xl font-bold self-start mt-4 mb-0.5">
          What's your birth date?
        </h2>
        <p className="self-start text-gray text-sm">This won't be public.</p>
        <BirthDayInput className="mt-8" form={form} birthDay={birthDay} />
        <Button size="full" className="mt-auto mb-2" type="submit">
          Next
        </Button>
      </form>
    </Form>
  );
};
export default BirthDay;
