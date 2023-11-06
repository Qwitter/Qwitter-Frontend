import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";
import { PopUpContainer } from "../PopUpContainer/PopUpContainer";
import { HeaderButton } from "@/models/PopUpModel";

const RECAPTCHA_KEY = import.meta.env?.VITE_RECAPTCHA_KEY;

type Props = {};

export const RecaptchaPopUp = (props: Props) => {
  const [showPopUp, setShowPopUp] = useState(true);

  const closePopUp = () => {
    setShowPopUp(false);
  };

  const handleReCaptcha = (reCaptchaResponse: string) => {
    console.log(reCaptchaResponse);
  };

  return (
    <PopUpContainer
      show={showPopUp}
      showLogo={true}
      headerButton={HeaderButton.close}
      headerFunction={closePopUp}
    >
      {/* <ReCAPTCHA sitekey={RECAPTCHA_KEY} onChange={handleReCaptcha} /> */}
    </PopUpContainer>
  );
};
