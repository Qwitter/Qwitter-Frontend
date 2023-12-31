import { Button } from "@/components/ui/button";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { PopUpContainer } from "../PopUpContainer/PopUpContainer";
import { useState } from "react";
import { HeaderButton } from "@/models/PopUpModel";
import GoogleSignUpButton from "../GoogleSignUpButton/GoogleSignUpButton";

export function LoginSignUp() {
    const [showPopUp, setShowPopUp] = useState<boolean>(true); // controls if the sign up is started or not
    const navigate = useNavigate();
    const location = useLocation();
    const closePopUp = () => {
        navigate('/')
        setShowPopUp(false)
    }
    return (
        <PopUpContainer
            show={showPopUp}
            showLogo
            headerButton={HeaderButton.close}
            headerFunction={closePopUp}
            className='flex flex-col justify-start items-center'
        >
            <p className='my-6 text-2xl font-bold text-left'>Join Qwitter today.</p>
           <GoogleSignUpButton />
            <p className="text-center or-item h-[40px] w-[300px] relative" >or</p>
            <Link
                to="/i/flow/signup"
                state={{ previousLocation: location }}
            >
                <Button variant="default" className="mb-2 h-[40px] w-[300px]">Create account</Button>
            </Link>
            <span className='text-gray  text-sm mb-10  text-start h-[30px] w-[300px]'>By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.</span>
            <h3 className='mb-5 text-md text-left   text-gray'>Have an account already? <Link
                to="/i/flow/login"
                state={{ previousLocation: location }}
            >  <span className="text-secondary">Log in</span>    </Link></h3>


        </PopUpContainer>
    )
}
