import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AiFillApple } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import XLogo from "../components/XLogo";

export default function Authentication() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
  });
  useEffect(() => {
    // Function to update the window size state
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
      });
    }
    // Attach the event listener
    window.addEventListener("resize", handleResize);
    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // Define your styles based on the window size
  const innerDynamicStyle: any = {
    position: "absolute",
    left: windowSize.width < 1025 ? "0" : "auto",
    top: windowSize.width < 1025 ? "0" : "auto",
    width: windowSize.width > 1025 ? "50vh" : "7vh",
    height: windowSize.width > 1025 ? "50vh" : "7vh",
  };
  const outerDynamicStyle: any = {
    position: "absolute",
    left: windowSize.width < 1025 ? "20%" : "auto",
    top: windowSize.width < 1025 ? "5%" : "auto",
  };
  const headerStyle: any = {
    width: windowSize.width > 1025 ? "400px" : "350px",
  };

  return (
    <>
      <div
        className="grid lg:grid-cols-2 lg:min-w-full min-h-screen"
        style={outerDynamicStyle}
      >
        <div className="flex justify-center items-center">
          {/* <svg viewBox="0 0 24 24" style={innerDynamicStyle}> */}
          <XLogo className={innerDynamicStyle} />
          {/* </svg> */}
        </div>
        <div className="flex flex-col lg:justify-center items-center">
          <div className="flex flex-col justify-center items-start">
            <h1
              className="my-3 text-5xl font-black break-words"
              style={headerStyle}
            >
              Happening now
            </h1>
            <h6 className="my-3 text-2xl font-extrabold">Join today.</h6>
            <Button
              className="flex items-center my-1 font-medium rounded-full button-border-color text-center bg-white border hover:bg-slate-200 text-black"
              style={{ width: "300px", height: "40px" }}
            >
              <FcGoogle size="1.5rem" />
              <div className="mx-1">Sign up with Google</div>
            </Button>
            <Button
              className="flex items-center my-1 font-medium rounded-full button-border-color text-center bg-white border hover:bg-slate-200 text-black"
              style={{ width: "300px", height: "40px" }}
            >
              <AiFillApple size="1.5rem" />
              <div className="mx-1">Sign up with Apple</div>
            </Button>
            <p
              style={{ width: "300px", height: "40px", position: "relative" }}
              className="text-center or-item"
            >
              or
            </p>
            <Button
              className="mb-2 text-base block font-bold rounded-full button-border-color text-center quitter-sky-background-color text-slate-50"
              style={{ width: "300px", height: "40px" }}
            >
              Create account
            </Button>
            <span
              className="font-extralight text-sm mb-10"
              style={{ maxWidth: "300px" }}
            >
              By signing up, you agree to the Terms of Service and Privacy
              Policy, including Cookie Use.
            </span>
            <h3 className="mb-5 text-md font-bold">Already have an account?</h3>
            <Button
              className=" quitter-sky-text-color text-base block font-bold rounded-full button-border-color border text-center bg-white"
              style={{ width: "300px", height: "40px" }}
            >
              Sign in
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
