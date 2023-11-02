import { useState } from "react";
import { PopUpContainer } from "./PopUpContainer";
// import { Button } from "./ui/button";
import { HeaderButton } from "../models/PopUpModel";

export const SignUpSteps = () => {
  const [stepNumber, setStepNumber] = useState(0);

  console.log(setStepNumber);

  const Steps = [
    <div className="flex flex-col items-start justify-start">
      <h2 className="text-2xl font-bold">Create your account</h2>
      <div>
        {/* will be replaced with a form*/}
        <input type="text" placeholder="Name" />
        <input type="text" placeholder="Email" />
      </div>
    </div>,
  ];

  return (
    <>
      <PopUpContainer
        show={stepNumber == 0}
        headerButton={HeaderButton.close}
        title={`Step ${stepNumber + 1} of 5`}
        className="items-start"
        // showLogo={true}
      >
        <div className="relative">
          <input
            type="text"
            id="floating_filled"
            className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_filled"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
          >
            Floating filled
          </label>
        </div>
        {/* {Steps[stepNumber]} */}
      </PopUpContainer>
    </>
  );
};
