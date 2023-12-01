import { Button } from "@/components";
import { MessagesSideProp } from "./types/MessagesTypes";
import { useLocation, useNavigate } from "react-router-dom";

export function MessagesSide({ p, showButton,h2="Select a message",button="New Messages" }: MessagesSideProp) {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <div className="w-full h-full max-h-[100vh] flex justify-center items-center">
            <div className="max-w-[400px] px-8 mx-8 ">
                <h2 className="text-primary text-[31px] font-bold break-words">{h2}</h2>
                <p className="text-gray text-[15px] break-words mb-7">{p}
                </p>
                {showButton && <Button variant={"secondary"} className="py-3 w-[200px]" onClick={() => navigate('/Messages/compose', { state: { previousLocation: location } })}>{button}</Button>}</div>
        </div>
    );
}
