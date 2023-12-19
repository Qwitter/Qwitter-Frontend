import { profileSections } from "@/constants";
import { cn } from "@/lib";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

type ProfileSectionsProps = {
  initialIndex?: number;
};

export const ProfileSections = ({ initialIndex = 0 }: ProfileSectionsProps) => {
  const [active, setActive] = useState<string>(
    profileSections[initialIndex].title
  );
  const { username } = useParams();

  return (
    <div className="flex flex-row min-h-[50px] w-full sticky  top-[-1px] bg-black bg-opacity-60 backdrop-blur-xl z-00 border-b border-primary border-opacity-30">
      {profileSections.map((section) => {
        return (
          <Link
            key={section.title}
            to={`/Profile/${username}${section.dataLink}`}
            className="w-full  flex justify-center items-center  px-4 py-0 min-w-[56px] hover:bg-[#181818] transition-all cursor-pointer"
            onClick={() => setActive(section.title)}
            data-testid={section.title}
          >
            <span
              className={cn(
                "text-gray",
                active == section.title &&
                  "text-primary border-b-4 font-bold py-3 border-solid border-secondary "
              )}
            >
              {section.title}
            </span>
          </Link>
        );
      })}
    </div>
  );
};
