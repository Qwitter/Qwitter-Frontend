import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendList } from "../TrendList/TrendList";
export function TrendCard() {
  return (
    <>
      <Card className="bg-[#16181c] w-full  border-none">
        <CardHeader className=" h-[50px] mb-1 flex justify-center items-start">
          <CardTitle className="text-xl font-bold ">What’s happening</CardTitle>
        </CardHeader>
        <TrendList isCard={true} />
        <CardFooter className="hover:cursor-pointer mt-3 pt-3 hover:bg-light-gray rounded-br-lg rounded-bl-lg">
          <span className="text-secondary">show more</span>
        </CardFooter>
      </Card>
    </>
  );
}
