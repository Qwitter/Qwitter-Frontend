import { useState } from "react";
import SearchInput from "@/components/SearchInput/SearchInput";
import { TrendCard } from "@/components/TrendCard/TrendCard";
import { FollowCard } from "@/components/FollowCard/FollowCard";
import { Heart, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { BiRepost } from "react-icons/bi";

export function Notifications() {
  const [active, setActive] = useState("ALL");

  return (
    <>
      <div className="max-w-[600px] w-full h-full flex-grow border-r border-primary border-opacity-30 ">
        <div className="flex flex-col min-h-[50px] w-full sticky backdrop-blur-2xl top-[-1px] bg-black  z-50 border-b border-primary border-opacity-20">
          <div className="px-4 w-full h-[53px]">
            <div className="w-full h-full flex  items-center">
              <h2 className="font-bold text-xl">Notifications</h2>
            </div>
          </div>
          <div className="flex flex-row min-h-[50px] w-full sticky  top-[-1px]  z-50 border-b border-primary border-opacity-30">
            <div
              className="w-full  flex justify-center items-center  px-4 py-0 min-w-[56px] hover:bg-[#181818] transition-all cursor-pointer"
              onClick={() => setActive("ALL")}
            >
              <span
                className={`${active == "ALL"
                  ? "text-primary border-b-4 font-bold py-3 border-solid border-secondary "
                  : "text-gray"
                  } text-base  `}
              >
                ALL
              </span>
            </div>
            {/* <div
              className="w-full  flex justify-center items-center  px-4 py-0 min-w-[56px] hover:bg-[#181818] transition-all cursor-pointer"
              onClick={() => setActive("Verified")}
            >
              <span
                className={`${active == "Verified"
                  ? "text-primary border-b-4 font-bold py-3 border-solid border-secondary "
                  : "text-gray"
                  } text-base  `}
              >
                Verified
              </span>
            </div> */}

            <div
              className="w-full  flex justify-center items-center  px-4 py-0 min-w-[56px]  hover:bg-[#181818] transition-all cursor-pointer "
              onClick={() => setActive("Mentions")}
            >
              <span
                className={`${active == "Mentions"
                  ? "text-primary border-b-4 font-bold py-3 border-solid border-secondary "
                  : "text-gray"
                  } text-base  `}
              >
                Mentions
              </span>
            </div>
          </div>
        </div>
        <div className="relative min-h-[60vh]">
          <Notification type="repost" url="https://pbs.twimg.com/profile_images/1544863990110736384/PDf-ZViV_normal.jpg" />
          <Notification type="follow" url="https://pbs.twimg.com/profile_images/1544863990110736384/PDf-ZViV_normal.jpg" />
          <Notification type="love" url="https://pbs.twimg.com/profile_images/1544863990110736384/PDf-ZViV_normal.jpg" />
        </div>
      </div>
      <div className="max-w-[600px]  pb-16 relative flex flex-col z-0 w-[36.5%] max-largeX:hidden  h-full">
        <div className="w-full sticky top-0 z-50 bg-black   ">
          <SearchInput />
        </div>
        <div className="mt-5 rounded-lg bg-dark-gray">
          <TrendCard />
        </div>
        <div className="mt-5 rounded-lg bg-dark-gray">
          <FollowCard />
        </div>
      </div>
    </>
  );
}

function Notification({ type ,url}: { type: string;url:string }) {
  const navigate = useNavigate()
  if (type == 'follow' || type == 'repost'||type=='love') {


    return (
      <div className="px-4 py-3 cursor-pointer flex flex-row border-b border-primary border-opacity-30" onClick={()=>navigate(url)}>
        <div className=" mr-3 w-10 h-full flex justify-end basis-10">
          {
            type == 'follow' && <User className="text-transparent w-8 h-8" fill="#1d9bf0" />}
          {
            type == 'repost' && <BiRepost className="text-transparent w-9 h-[38px]" fill="#00ba7c" />
          }
          {
            type == 'love' && <Heart className="text-transparent w-8 h-8" fill="#f91880" />
          }
        </div>
        <div className="flex flex-col w-full">
          <div className="mb-3 pr-5">
            <div className="flex flex-row">
              <img className="w-9 h-9 p-1 rounded-full " src="https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" alt="" />
            </div>
          </div>
          <div>
            <Link to={`/${'marwansamy99'}`} className="text-primary font-bold hover:underline transition-all">Ahmed Osama Helmy</Link>

            <Link to={url}> {type=='follow'?"Followed you":type=='repost'?"reposted your post":"liked your post"}</Link>
          </div>
        </div>
      </div>
    )
  }

}