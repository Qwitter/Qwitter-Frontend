import { useNavigate } from "react-router-dom";
import { Button } from "../";
import { PopUpContainer } from "../PopUpContainer/PopUpContainer";
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContextProvider";

export function LogOut() {
    const navigation = useNavigate();
    const { logout } = useContext(UserContext)

    return (
        <PopUpContainer show showLogo className=" h-[90%] sm:w-[400px] px-10 items-center " 
        >
            <div className=" h-[300px] w-full   justify-between flex flex-col">
                <div>
                    <h2 className=" text-primary font-bold text-3xl mb-2">
                        Log out of Qwitter?

                    </h2>
                    <p className=" text-gray mb-3">
                        You can always log back in at any time.
                    </p>
                </div>
                <div>
                <Button className="my-6  w-full" onClick={() => { logout(); navigation('/') }} >
                    Logout
                </Button>
                <Button variant="outline" className=" w-full" onClick={() => navigation(-1)}>
                    Cancel
                </Button>
                </div>
            </div>

        </PopUpContainer>
    );
}
