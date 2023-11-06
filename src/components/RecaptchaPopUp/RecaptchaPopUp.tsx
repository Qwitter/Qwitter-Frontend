import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";
import { PopUpContainer } from "../PopUpContainer/PopUpContainer";
import { HeaderButton } from "@/models/PopUpModel";

const RECAPTCHA_KEY = import.meta.env?.VITE_RECAPTCHA_KEY;

type RecaptchaProps = {
  afterAuth: Function;
};

export const RecaptchaPopUp = ({ afterAuth }: RecaptchaProps) => {
  const [showPopUp, setShowPopUp] = useState(true);

  const closePopUp = () => {
    setShowPopUp(false);
  };

  const handleReCaptcha = (reCaptchaResponse: string | null) => {
    // wait for the check to be animated
    setTimeout(() => {
      afterAuth();
    }, 500);
  };

  const handleExpire = () => {
    console.log("Expired");
  };

  return (
    <PopUpContainer
      show={showPopUp}
      showLogo={true}
      headerButton={HeaderButton.close}
      headerFunction={closePopUp}
      className="h-[400px]"
    >
      <ReCAPTCHA
        sitekey={RECAPTCHA_KEY}
        onChange={handleReCaptcha}
        onExpired={handleExpire}
      />
    </PopUpContainer>
  );
};
