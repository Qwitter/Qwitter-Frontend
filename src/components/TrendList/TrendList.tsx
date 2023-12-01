import { CardContent } from "../ui/card";

export function TrendList() {
  return (
    <>
      <CardContent className="hover:cursor-pointer py-3 hover:bg-light-gray">
        <div className="text-[#595d62] my-1">Trending in Egypt</div>
        <div className="text-white font-bold text-base">Trend</div>
        <div className="text-[#595d62] ">1,059 posts</div>
      </CardContent>
    </>
  );
}
