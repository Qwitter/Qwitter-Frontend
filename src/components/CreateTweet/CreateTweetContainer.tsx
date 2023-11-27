import { useContext, useState } from "react";
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
import { useMutation } from "@tanstack/react-query";
import { createTweet } from "@/lib/utils";
import { toast } from "../ui/use-toast";
import { Spinner } from "../Spinner";
type Images = {
    value: string;
    type: string;
}
const CreateTweetContainer = ({ mode = "popUp" }: { mode?: "home" | "popUp" }) => {
    const [showPopUp, setShowPopUp] = useState<boolean>(true);
    const [userLocation, setUserLocation] = useState("")
    const [selectedImages, setSelectedImages] = useState<Images[]>([]);
    const [files, setFiles] = useState<File[]>([]);

    const [tweet, setTweet] = useState("");
    const { token } = useContext(UserContext)
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof CreateTweetSchema>>({
        resolver: zodResolver(CreateTweetSchema),
        mode: "onChange",
    });
    const { mutate, isPending } = useMutation({
        mutationFn: createTweet,
        onSuccess: (data) => {
            if (data) {
                toast({
                    description: "Your post was sent.",
                    variant: "secondary",
                    duration: 2000,
                    className: "py-4"

                })
            }
            else
                navigate(-1);
        },
        onError: (data) => {
            console.log(data)
            navigate(-1);
        }
    });
    const closePopUp = () => {
        token
        navigate(-1);
        setShowPopUp(false);
    };

    function getOperatingSystem() {
        const userAgent = navigator.userAgent
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
    function getLocationOfUser() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error)
        }
        else {
            setUserLocation("");
        }
        function success(position: GeolocationPosition) {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            setUserLocation(lat + "," + long);
        }
        function error() {
            setUserLocation("");
        }

    }
    function handleSubmit() {
        getLocationOfUser()
        const formData = new FormData();
        formData.append('text', tweet);
        formData.append('replyToTweetId', '');
        formData.append('retweetedId', '');
        formData.append('qouteTweetedId', '');
        formData.append('coordinates', userLocation);
        formData.append('source', getOperatingSystem());
        files.forEach((file) => {
            formData.append('media[]', file);
        });
        mutate({ formData: formData, token: token! })
    }

    const handleRemoveFile = (index: number) => {
        const updatedFiles = [...selectedImages];
        updatedFiles.splice(index, 1);
        setSelectedImages(updatedFiles);
    };
    if (mode == "home") {
        return (
            <div
                className="px-4  h-fit max-h-[1000px] py-1 justify-start "
            > {
                    isPending ? <div className='w-full h-[180px] p-8'>
                        <Spinner />
                    </div> : (<>
                        <CreateTweetMain
                            files={files}
                            setFiles={setFiles}
                            isValid={form.formState.isValid}
                            text={tweet}
                            handleSubmit={handleSubmit} selectedImages={selectedImages} setSelectedImages={setSelectedImages} 
                        mode="home" tweet={tweet} form={form} setTweet={setTweet} handleRemoveFile={handleRemoveFile} />


                    </>)
                }
            </div>
        )
    }
    return (
        <PopUpContainer
            show={showPopUp}
            className="px-5 min-h-[180px] h-fit max-h-[1000px] py-1 justify-start "
            headerButton={HeaderButton.close}
            headerFunction={closePopUp}

        > {
                isPending ? <div className='w-full h-[180px] p-8'>
                    <Spinner />
                </div> : (<>
                    <CreateTweetMain mode="popUp" tweet={tweet} form={form} setTweet={setTweet} selectedImages={selectedImages} handleRemoveFile={handleRemoveFile} />
                    <CreateTweetFooter
                        files={files}
                        mode="popUp"
                        setFiles={setFiles}
                        isValid={form.formState.isValid}
                        text={tweet}
                        handleSubmit={handleSubmit} selectedImages={selectedImages} setSelectedImages={setSelectedImages} />

                </>)
            }
        </PopUpContainer>
    );
};
export default CreateTweetContainer;
