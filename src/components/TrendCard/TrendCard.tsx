import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export function TrendCard() {
  return (
    <>
      <Card className="w-[350px] bg-[#16181c]  absolute left-96 top-64 border-none">
        <CardHeader className=" h-[50px] mb-1 flex justify-center items-start">
          <CardTitle className="text-xl font-bold ">What’s happening</CardTitle>
        </CardHeader>
        <CardContent className="hover:cursor-pointer py-3 hover:bg-light-gray">
          <div className="text-[#595d62] my-1">Trending in Egypt</div>
          <div className="text-white font-bold text-base">Trend</div>
          <div className="text-[#595d62] ">1,059 posts</div>
        </CardContent>
        <CardFooter className="hover:cursor-pointer mt-3">
          <span className="text-secondary">show more</span>
        </CardFooter>
      </Card>
    </>
  );
}
