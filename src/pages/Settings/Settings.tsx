import { AccountInformation, ChangeUsername, YourAccount } from "@/components";
import { SettingsOptions } from "../../components/SettingsOptions/SettingsOptions";
import { UpdateEmail } from "@/components/UpdateEmail/UpdateEmail";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChangePassword } from "@/components/ChangePassword/ChangePassword";
import { PrivacyInformation } from "@/components/PrivacyInformation/PrivacyInformation";
import { BlockMuteList } from "@/components/BlockMuteList/BlockMuteList";

export function Settings() {
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
      case "/settings/Muted":
        setActive("Privacy and safety");
        break;
      case "/settings/Blocked":
        setActive("Privacy and safety");
        break;
      default:
        setActive("Your account");
    }
  }, [pathname]);

  return (
    <>
      <div className="max-w-[600px] w-1/2 h-full border-r border-primary border-opacity-30 max-largeX:hidden ">
        <SettingsOptions setActive={setActive} active={active} />
      </div>
      <div className="max-w-[600px] w-full mx-auto h-full border-r border-primary border-opacity-30">
        <Routes>
          <Route  path="/" element={<Navigate to="/settings/account" />} />
          <Route  path="/account" element={<YourAccount />} />
          <Route
            path="/your_twitter_data/account"
            element={<AccountInformation />}
          />
          <Route path="/password" element={<ChangePassword />} />
          <Route path="/screen_name" element={<ChangeUsername />} />
          <Route path="/email" element={<UpdateEmail />} />
          <Route
            path="/Blocked"
            element={
              <BlockMuteList
                headername="Blocked Accounts"
                service="BlockList"
              />
            }
          />
          <Route
            path="/Muted"
            element={
              <BlockMuteList headername="Muted Accounts" service="MuteList" />
            }
          />
          <Route path="/privacy_and_safety" element={<PrivacyInformation />} />
        </Routes>
      </div>
    </>
  );
}
