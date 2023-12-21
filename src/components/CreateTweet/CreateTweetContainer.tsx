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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTweet, getOperatingSystem } from "@/lib/utils";
import { toast } from "../ui/use-toast";
import { Spinner } from "../Spinner";
import React from "react";
type Images = {
  value: string;
  type: string;
};
const CreateTweetMainMemoized = React.memo(CreateTweetMain);

const CreateTweetContainer = ({
  mode = "popUp",
  replyToTweetId,
  replyToUser
}: {
  mode?: "home" | "popUp" | "reply";
  replyToTweetId?: string;
  replyToUser?: string;

}) => {
  const [showPopUp, setShowPopUp] = useState<boolean>(true);
  const [userLocation, setUserLocation] = useState("");
  const [selectedImages, setSelectedImages] = useState<Images[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [videoFile, setVideoFile] = useState<File>();
  const queryClient = useQueryClient();

  const [tweet, setTweet] = useState("");
  const { token } = useContext(UserContext);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof CreateTweetSchema>>({
    resolver: zodResolver(CreateTweetSchema),
    mode: "onChange",
  });
  const clearForm = () => {
    form.reset()
    setTweet("");
    setFiles([]);
    setSelectedImages([]);
    setVideoFile(undefined);
  }
  const { mutate, isPending } = useMutation({
    mutationFn: createTweet,
    onSuccess: (data) => {
      console.log(data);
      if (data) {
        toast({
          description: `Your ${mode=="reply"?"reply":"post"} was sent.`,
          variant: "secondary",
          duration: 2000,
          className: "py-4",
        });
        if (mode != "reply")
          queryClient.invalidateQueries({ queryKey: ["tweets"] });
        else
        {
          queryClient.invalidateQueries({ queryKey: ["tweet", replyToTweetId!, "replies"] });
        }
        clearForm();
      }
    },
    onError: (data) => {
      console.log(data);
      toast({
        title: "Something went wrong.",
        variant: "destructive",
        duration: 2000,
      });
    },
  });
  const closePopUp = () => {
    token;
    navigate(-1);
    setShowPopUp(false);
  };

  function getLocationOfUser() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
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
    getLocationOfUser();
    const formData = new FormData();
    formData.append("text", tweet);
    formData.append("coordinates", userLocation);
    replyToTweetId && formData.append("replyToTweetId", replyToTweetId);
    formData.append("source", getOperatingSystem());
    formData.append("sensitive", "false");
    files.forEach((file) => {
      formData.append("media[]", file);
    });
    
    mutate({ formData: formData, token: token! });
  }

  const handleRemoveFile = (index: number) => {
    const updatedImages = [...selectedImages];
    const updatedFiles = [...files];
    updatedImages.splice(index, 1);
    updatedFiles.splice(index, 1);
    setSelectedImages(updatedImages);
    setFiles(updatedFiles);
  };

  if (mode == "home") {
    return (
      <div className="px-4  h-fit max-h-[1000px] py-1 justify-start ">
        {isPending ? (
          <div className="w-full h-[180px] p-8">
            <Spinner />
          </div>
        ) : (
          <>
            <CreateTweetMainMemoized
              files={files}
              setFiles={setFiles}
              isValid={form.formState.isValid}
              text={tweet}
              handleSubmit={handleSubmit}
              selectedImages={selectedImages}
              setSelectedImages={setSelectedImages}
              mode="home"
              tweet={tweet}
              form={form}
              setTweet={setTweet}
              setVideoFile={setVideoFile}
              videoFile={videoFile}
              handleRemoveFile={handleRemoveFile}
            />
          </>
        )}
      </div>
    );
  }
  if (mode == "reply") {
    return (
      <div className="px-4  h-fit max-h-[1000px] py-1 justify-start ">
        {isPending ? (
          <div className="w-full h-[180px] p-8">
            <Spinner />
          </div>
        ) : (
          <>
            <CreateTweetMainMemoized
              files={files}
              setFiles={setFiles}
              isValid={form.formState.isValid}
              text={tweet}
              replyTo={replyToUser}
              handleSubmit={handleSubmit}
              selectedImages={selectedImages}
              setSelectedImages={setSelectedImages}
              mode="reply"
              tweet={tweet}
              form={form}
              setTweet={setTweet}
              setVideoFile={setVideoFile}
              videoFile={videoFile}
              handleRemoveFile={handleRemoveFile}
            />
          </>
        )}
      </div>
    );
  }
  return (
    <PopUpContainer
      show={showPopUp}
      className="px-5 min-h-[180px] h-fit max-h-[1000px] py-1 justify-start "
      headerButton={HeaderButton.close}
      headerFunction={closePopUp}
    >
      {isPending ? (
        <div className="w-full h-[180px] p-8">
          <Spinner />
        </div>
      ) : (
        <>
          <CreateTweetMainMemoized
            mode="popUp"
            tweet={tweet}
            form={form}
            setTweet={setTweet}
            selectedImages={selectedImages}
            handleRemoveFile={handleRemoveFile}
            videoFile={videoFile}
            setVideoFile={setVideoFile}
          />
          <CreateTweetFooter
            files={files}
            mode="popUp"
            setFiles={setFiles}
            isValid={form.formState.isValid}
            text={tweet}
            handleSubmit={handleSubmit}
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
            setVideoFile={setVideoFile}
            videoFile={videoFile}
          />
        </>
      )}
    </PopUpContainer>
  );
};
export default CreateTweetContainer;
