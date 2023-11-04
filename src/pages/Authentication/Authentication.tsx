import { useState, useEffect } from 'react';
import { Button } from "../../components/ui/button";
import { AiFillApple } from "react-icons/ai";
import { FcGoogle } from 'react-icons/fc';
import XLogo from '../../components/XLogo';
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
    window.addEventListener('resize', handleResize);
    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  // Define your styles based on the window size
  const innerDynamicStyle: any = {
    position: "absolute",
    left: windowSize.width < 1025 ? '0' : 'auto',
    top: windowSize.width < 1025 ? '0' : 'auto',
    width: windowSize.width > 1025 ? '50vh' : '7vh',
    height: windowSize.width > 1025 ? '50vh' : '7vh',
  };
  const outerDynamicStyle: any = {
    position: "absolute",
    left: windowSize.width < 1025 ? '20%' : 'auto',
    top: windowSize.width < 1025 ? '5%' : 'auto',
  }
  const headerStyle: any =
  {
    width: windowSize.width > 1025 ? '550px' : '350px',
  }
  return (
    <>
      <div className="grid lg:grid-cols-2 lg:min-w-full min-h-screen" style={outerDynamicStyle}>
        <div data-testid="logo" className="flex justify-center items-center">
          <XLogo viewBox="0 0 24 24" style={innerDynamicStyle} />
        </div>
        <div className="flex flex-col lg:justify-center items-center">
          <div className='flex flex-col justify-center items-start'>
            <p className='my-3 text-6xl font-black break-words text-start' style={headerStyle}>Happening now</p>
            <p className='my-3 text-2xl font-extrabold'>Join today.</p>
            <Button variant="default" className="items-center my-1 h-[40px] w-[300px]">
              <FcGoogle size="1.5rem" />
              <div className="mx-1">Sign up with Google</div>
            </Button>
            <Button variant="default" className="items-center my-1 h-[40px] w-[300px]">
              <AiFillApple size="1.5rem" />
              <div className="mx-1">Sign up with Apple</div>
            </Button>
            <p className="text-center or-item h-[40px] w-[300px] relative" >or</p>
            <Button variant="secondary" className="mb-2 h-[40px] w-[300px]">Create account</Button>
            <span className='font-extralight text-sm mb-20 text-start h-[30px] w-[300px]'>By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.</span>
            <h3 className='mb-5 text-md font-bold'>Already have an account?</h3>
            <Button variant="outline" className='text-secondary h-[40px] w-[300px]'>Sign in</Button>
          </div>
        </div>
      </div >
    </>
  )
}
