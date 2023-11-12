import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";
import { PopUpContainer } from "../PopUpContainer/PopUpContainer";
import { HeaderButton } from "@/models/PopUpModel";
const RECAPTCHA_KEY = import.meta.env?.VITE_RECAPTCHA_KEY;

/*
NEEDED:
  rechaptcha work (change the styling a bit and make animation while loading)
*/

type RecaptchaProps = {
  afterAuth: () => void;
  prevPage?: () => void;
};

export const RecaptchaPopUp = ({ afterAuth, prevPage }: RecaptchaProps) => {
  const [showPopUp, setShowPopUp] = useState(true);

  const closePopUp = () => {
    if (prevPage) {
      prevPage();
      return;
    }

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
