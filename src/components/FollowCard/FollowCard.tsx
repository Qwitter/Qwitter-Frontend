import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { MdOutlineVerified } from "react-icons/md";
export function FollowCard() {
  return (
    <Card className="w-[350px] bg-[#16181c]  absolute left-96 top-64 border-none">
      <CardHeader className=" h-[50px] mb-1 flex justify-center items-start">
        <CardTitle className="text-xl w-[50%] font-bold ">
          Who to follow
        </CardTitle>
      </CardHeader>
      <CardContent className="hover:cursor-pointer py-3 flex justify-between hover:bg-light-gray my-auto ">
        <div className="h-[40px] flex justify-center items-center ">
          <img
            src="https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
            alt="profilePic"
            className="w-[40px] h-[40px] rounded-full mr-3"
          ></img>
          <div className="flex-col">
            <div className="flex items-center">
              <span className="mr-1">yousef</span>
              <MdOutlineVerified className="text-blue-600" />
            </div>
            <div className="text-[#595d62]">@yousef2025</div>
          </div>
        </div>
        <Button className="text-sm font-bold">
          <span className="text-black">Follow</span>
        </Button>
      </CardContent>
      <CardContent className="hover:cursor-pointer py-3 flex justify-between hover:bg-light-gray my-auto ">
        <div className="h-[40px] flex justify-center items-center ">
          <img
            src="https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
            alt="profilePic"
            className="w-[40px] h-[40px] rounded-full mr-3"
          ></img>
          <div className="flex-col">
            <div className="flex items-center">
              <span className="mr-1">yousef</span>
              <MdOutlineVerified className="text-blue-600" />
            </div>
            <div className="text-[#595d62]">@yousef2025</div>
          </div>
        </div>
        <Button className="text-sm font-bold">
          <span className="text-black">Follow</span>
        </Button>
      </CardContent>
      <CardFooter className="hover:cursor-pointer mt-3">
        <span className="text-secondary">show more</span>
      </CardFooter>
    </Card>
  );
}
