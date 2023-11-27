import { useContext, useState, useEffect } from "react";
import { HeaderButton } from "@/models/PopUpModel";
import { PopUpContainer } from "../PopUpContainer/PopUpContainer";
import { useNavigate } from "react-router-dom";
import { UserContext } from "@/contexts/UserContextProvider";
import CreateTweetFooter from "./CreateTweetFooter";
import CreateTweetMain from "./CreateTweetMain";
import { useForm } from "react-hook-form";
import { CreateTweetSchema } from "@/models/CreateTweet";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
type Images = {
    value: string;
    type: string;
}
const CreateTweetContainer = () => {
    const [showPopUp, setShowPopUp] = useState<boolean>(true);
    const [userLocation,setUserLocation ] = useState("")
    const [selectedFile, setSelectedFile] = useState<Images[]>([]);
    const [tweet, setTweet] = useState("");
    const { token } = useContext(UserContext)
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof CreateTweetSchema>>({
        resolver: zodResolver(CreateTweetSchema),
        mode: "onChange",
      });
    const closePopUp = () => {
        token
        navigate(-1);
        setShowPopUp(false);
    };
    useEffect(() => {
        console.log(selectedFile)


    }, [selectedFile])
    function getOperatingSystem() {
        const userAgent =navigator.userAgent
        // Check for Windows
        if (userAgent.indexOf('Win') !== -1) {
            return 'Windows';
        }

        // Check for Linux
        if (userAgent.indexOf('Linux') !== -1) {
            return 'Linux';
        }

        // Check for iPhone (iOS)
        if (/iPhone|iPod/.test(userAgent)) {
            return 'iPhone (iOS)';
        }

        // Check for Android
        if (/Android/.test(userAgent)) {
            return 'Android';
        }

        // Default to unknown
        return 'Unknown';
    }
    function getLocationOfUser(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(success,error)
        }
        else{
            setUserLocation("");
        }
        function success(position:GeolocationPosition){
            const lat =position.coords.latitude;
            const long =position.coords.longitude;
            setUserLocation( lat+","+long);
        }
        function error (){  
            setUserLocation("");
        }
        
    }
    useEffect(()=>{
        getLocationOfUser()
        console.log(getOperatingSystem())
    },[])
    const handleRemoveFile = (index: number) => {
        const updatedFiles = [...selectedFile];
        updatedFiles.splice(index, 1);
        setSelectedFile(updatedFiles);
    };
    return (
        <PopUpContainer
            show={showPopUp}
            className="px-5 min-h-[220px] h-fit max-h-[1000px] py-1 justify-start "
            headerButton={HeaderButton.close}
            headerFunction={closePopUp}
        >
            <CreateTweetMain tweet={tweet} form={form} setTweet={setTweet} selectedFile={selectedFile} handleRemoveFile={handleRemoveFile} />
            <CreateTweetFooter isValid={form.formState.isValid} text={tweet} selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
        </PopUpContainer>
    );
};
export default CreateTweetContainer;
