import { AccountInformation, ChangeUsername, YourAccount } from "@/components";
import { SettingsOptions } from "../../components/SettingsOptions/SettingsOptions";
import { UpdateEmail } from "@/components/UpdateEmail/UpdateEmail";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChangePassword } from "@/components/ChangePassword/ChangePassword";

export function SettingsMain() {
  const [active, setActive] = useState("Your account");
  const { pathname } = useLocation();
  useEffect(() => {
    switch (pathname) {
      case "/settings/account":
        setActive("Your account");
        break;
      case "/settings/privacy_and_safety":
        setActive("Privacy and safety");
        break;
      default:
        setActive("Your account");
    }
  }, [pathname]);

  return (
    <div className=" border-l-[0.5px] border-primary border-opacity-30 max-mobile:w-full">
      <div className="w-auto mobile:w-[920px] h-full flex flex-row large2X:w-[990px] max-largeX:max-w-[600px] flex-shrink-1 flex-grow-2">
        <div className="max-w-[600px] w-1/2 h-full border-r border-primary border-opacity-30 max-largeX:hidden">
          <SettingsOptions setActive={setActive} active={active} />
        </div>
        <div className="max-w-[600px] w-full mx-auto h-full">
          <Routes>
            <Route path="/" element={<Navigate to="/settings/account" />} />
            <Route path="/account" element={<YourAccount />} />
            <Route
              path="/your_twitter_data/account"
              element={
                <AccountInformation
                  email="marawanSamy@gmail.com"
                  userName="XLV"
                />
              }
            />
            <Route path="/password" element={<ChangePassword />} />
            <Route
              path="/screen_name"
              element={<ChangeUsername userName="Marwansmay99" />}
            />
            <Route
              path="/email"
              element={<UpdateEmail email="marwanSamy@gmail.com" />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}
