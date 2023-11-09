import { Button } from "../../components/ui/button";
import { AiFillApple } from "react-icons/ai";
import { FcGoogle } from 'react-icons/fc';
import logo from "../../assets/logo.png"
import { Link, useLocation } from "react-router-dom";

export default function Authentication() {
  const location = useLocation();
  return (
    <>
      <div className="grid lg:grid-cols-2 lg:min-w-full min-h-screen absolute max-[1025px]:left-[20%] max-[1025px]:top-[5%]" >
        <div className="flex justify-center items-center relative">
          <img data-testid="logo" src={logo} alt="Logo" className='max-[1025px]:absolute max-[1025px]:left-[0%] max-[1025px]:top-[0%]  min-[1025px]:w-[50vh] max-[1025px]:w-[15vh] min-[1025px]:h-[50vh] max-[1025px]:h-[15vh] ' />
        </div>
        <div className="flex flex-col lg:justify-center items-center">
          <div className='flex flex-col justify-center items-start'>
            <p className='my-3 text-6xl font-black break-words text-start min-[1025px]:w-[550px] w-[350px]' >Happening now</p>
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
            <Link
              to="/i/flow/signup"
              state={{ previousLocation: location }}
            >
              <Button data-testid="SignUpButton-Test-Id" variant="secondary" className="mb-2 h-[40px] w-[300px]">Create account</Button>
            </Link>
            <span className='font-extralight text-sm mb-20 text-start h-[30px] w-[300px]'>By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.</span>
            <h3 className='mb-5 text-md font-bold'>Already have an account?</h3>
            <Link
              to="/i/flow/login"
              state={{ previousLocation: location }}
            >
              <Button data-testid="Login-Test-Id" variant="outline" className='text-secondary h-[40px] w-[300px]'>Sign in</Button>
            </Link>
          </div>
        </div>
      </div >
    </>
  )
}
