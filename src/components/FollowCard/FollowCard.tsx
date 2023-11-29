// import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function FollowCard() {
  return (
    <Card className="w-[350px] bg-orange-600  absolute left-96 top-64">
      <CardHeader className=" h-[50px]  flex justify-center items-start">
        <CardTitle className="text-xl w-[50%] font-bold ">
          Who to follow
        </CardTitle>
      </CardHeader>
      <CardContent className="bg-red-700 hover:cursor-pointer">
        <h1>yhis oisoi yousef</h1>
      </CardContent>
      <CardFooter className="hover:cursor-pointer">
        <span className="text-secondary">show more</span>
      </CardFooter>
    </Card>
  );
}
