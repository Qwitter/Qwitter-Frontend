import { Link } from "react-router-dom";
import { OptionsHeader } from "../OptionsHeader/OptionsHeader";
import { ChevronRight } from "lucide-react";
import { VolumeX, Ban } from "lucide-react";
const privacyOptions = [
  {
    id: "/Muted",
    title: "Muted accounts",
    description: "Manage the accounts that you've muted.",
    icon: VolumeX,
  },
  {
    id: "/Blocked",
    title: "Blocked accounts",
    description: "Manage the accounts that you've blocked.",
    icon: Ban,
  },
];
export function PrivacyInformation() {
  return (
    <>
      {/* <div className="w-full h-full border-r border-primary border-opacity-30 mb-20">
        <OptionsHeader header="Privacy information" />
        <ul className="flex flex-col w-full">
          <Link to={`/Blocked`} className="group">
            <div className="flex flex-row p-3 w-full justify-between items-center group-hover:bg-[#191919] transition-all ">
              <div>Blocked Accounts</div>
              <ChevronRight color="grey" />
            </div>
          </Link>
          <Link to={`/Muted`} className="group">
            <div className="flex flex-row p-3 w-full justify-between items-center group-hover:bg-[#191919] transition-all ">
              <div>Muted Accounts</div>
              <ChevronRight color="grey" />
            </div>
          </Link>
        </ul>
      </div> */}
      <OptionsHeader
        header="Privacy information"
        className="lg:hidden"
        defaultBack
      />
      <div>
        <h3 className="text-gray text-sm px-4 py-3">
          Manage Your Quitter activity.
        </h3>
        <ul className="flex flex-col w-full">
          {privacyOptions.map((link) => (
            <Link to={`/settings${link.id}`} key={link.id} className="group ">
              <div className="flex flex-row p-3 w-full justify-between items-center group-hover:bg-[#191919] transition-all ">
                <div className="flex flex-row items-center">
                  <div className="mr-2 w-12 h-12 flex justify-center items-center ">
                    <link.icon className="w-5 h-5 text-gray" />
                  </div>
                  <div>
                    <li className={`text-[15px] text-primary`}>{link.title}</li>
                    <p className={`text-[13px] text-gray`}>
                      {link.description}
                    </p>
                  </div>
                </div>
                <ChevronRight color="grey" />
              </div>
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
}
