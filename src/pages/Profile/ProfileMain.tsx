import { Button } from "@/components";
import { Cake, CalendarDays, MapPin } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

/*
NEEDED:
    take data from request
    change button if it's not the user's profile
    click on images open the image
    following and followers go to another page
*/

type ProfileMainProps = {
  profile?: string;
  banner?: string;
};

export const ProfileMain = ({ profile, banner }: ProfileMainProps) => {
  const location = useLocation();

  return (
    <div>
      <img
        src={banner}
        alt="user banner image"
        className="w-full aspect-[3/1] max-h-[200px] cursor-pointer" //NEEDED: responsive height
        // NEEDED: onClick open image
      />
      <div className="pt-3 px-4 mb-4">
        <div className="h-[69px] flex flex-row justify-between">
          <div className="rounded-full cursor-pointer mt-[-15%] mb-3">
            <img
              src={profile}
              alt="user profile image"
              className="rounded-full w-[20vw] sm:w-[142px] bg-black p-0.5 sm:p-1"
              // NEEDED: onClick open image
            />
          </div>
          <Link
            to="settings/profile"
            state={{ previousLocation: location }}
            className="h-[35px]"
          >
            <Button variant="outline" className="h-full">
              Edit profile
            </Button>
          </Link>
        </div>
        <div>
          <div className="w-full flex flex-col mt-1 mb-3">
            <span className="text-xl leading-5 font-bold">Mohamed</span>
            <span className="text-gray text-[15px] mt-1">@MohaMed42310508</span>
          </div>
          <div className="mb-3">Computer Engineer </div>
          <div className="flex flex-wrap leading-4 mb-3">
            <span className="text-[15px] text-gray mr-3">
              <MapPin size="1.1rem" className="inline mr-1" />
              Cairo, Egypt
            </span>
            <span className="text-[15px] text-gray mr-3">
              <Cake size="1.1rem" className="inline mr-1" />
              Born August 30, 2002
            </span>
            <span className="text-[15px] text-gray mr-3">
              <CalendarDays size="1.1rem" className="inline mr-1" />
              Joined January 2019
            </span>
          </div>
          <div className="leading-3">
            <span className="mr-5 text-sm">
              <a href="" className="hover:underline">
                <span className="font-bold">83</span>
                <span className="text-gray"> Following</span>
              </a>
            </span>
            <span className="mr-5 text-sm">
              <a href="" className="hover:underline">
                <span className="font-bold">17</span>
                <span className="text-gray"> Followers</span>
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
