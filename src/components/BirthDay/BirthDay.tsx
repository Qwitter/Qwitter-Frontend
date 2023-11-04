import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BirthDayInput, Button, Form } from "..";
import { BirthDaySchema } from "@/models/BirthDay";

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
        <Button size="full" className="mt-auto mb-16" type="submit">
          Next
        </Button>
      </form>
    </Form>
  );
};
export default BirthDay;
