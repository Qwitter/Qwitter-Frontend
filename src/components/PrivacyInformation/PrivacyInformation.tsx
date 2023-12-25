import { Link } from "react-router-dom";
import { OptionsHeader } from "../OptionsHeader/OptionsHeader";
import { ChevronRight } from "lucide-react";
import { privacyOptions } from "./privacyOptions";

export function PrivacyInformation() {
  return (
    <>
      <OptionsHeader
        header="Privacy information"
        defaultBack
      />
      <div>
        <h3 className="text-gray text-sm px-4 py-3">
          Manage Your Qwitter activity.
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
