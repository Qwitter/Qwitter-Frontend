import  { useContext, useEffect, useState } from "react";
import { PopUpContainer } from "@/components/PopUpContainer/PopUpContainer";
import { HeaderButton } from "@/models/PopUpModel";
import { Button } from "@/components/ui/button";
import { ImagePicker } from "@/components/ImagePicker/ImagePicker";
import { TextInput } from "@/components/TextInput/TextInput";
import { MessagesContext } from "@/contexts/MessagesContextProvider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GroupNameSchema } from "@/models/GroupName";
import { z } from "zod";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "@/components/Spinner";
import { UserContext } from "@/contexts/UserContextProvider";
import { toast } from "@/components/ui/use-toast";
import { updateGroupImageAndName } from "@/lib/utils";



export const MessagesGroupEditPopup = () => {
    const [imageFile, setImageFile] = useState<File>(); // here is where the file of the image will be set so we can send it to backend
    const [image, setImage] = useState(""); // here is where the file of the image will be set so we can send it to backend
    const { currentConversation ,setCurrentConversation} = useContext(MessagesContext)
    const navigate = useNavigate()
    const { conversationId } = useParams();
    const [imageKey, setImageKey] = useState<number>(0);

    const { token } = useContext(UserContext);
    const form = useForm<z.infer<typeof GroupNameSchema>>({
        resolver: zodResolver(GroupNameSchema),
        mode: "onChange",
    });
    const handleImageChange = () => {
        setImageKey((prevKey) => prevKey + 1);
    };

    useEffect(() => {
        handleImageChange()
        setInputFieldValue(currentConversation?.name || "")
        setNewName(currentConversation?.name || "")
        setImage(currentConversation?.photo  || "https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg")
    }, []);
    const [newName, setNewName] = useState<string>("");

    const { mutate, isPending } = useMutation({
        mutationFn: updateGroupImageAndName,
        onSuccess: (data,{formData}) => {
            if (data) {
                toast({
                    title: "Change Group",
                    description: "Group changed successfully",
                });
                const pic =URL.createObjectURL(formData.get("media")!as File);
                setCurrentConversation({...currentConversation!,photo:pic,name:formData.get('name')! as string})
                navigate(-1);
            }
            else {
                toast({
                    title: "Change GroupName",
                    description: "Failed : ServerSide error",
                    variant: "destructive"
                });
            }
        },
        onError: () => {
            toast({
                title: "Change GroupName",
                description: "Failed : ServerSide error",
                variant: "destructive"
            });
        }
    })
    if (!currentConversation) {
        return (<></>)
    }
    const handleSubmit = () => {
        const formData = new FormData();
        formData.append("name", newName);
        formData.append("media", imageFile!);
        mutate({ conversationId: conversationId!, token: token!, formData: formData });
    }
    const saveButton = <Button onClick={handleSubmit} disabled={!form.formState.isValid}>Save</Button>;
    const setInputFieldValue = (value: string) => {
        form.setValue("groupName", value);
        setNewName(value);
        form.trigger("groupName");
    };

    return (
        <PopUpContainer
            show
            title="Edit"
            headerButton={HeaderButton.close}
            headerFunction={() => navigate(-1)}
            optionalHeader={saveButton}
            headerClassName="justify-between"
            className="p-3 pt-0 justify-center   sm:justify-start min-h-fit h-[32vh]"
        >{isPending ? <div className="w-full h-[200px]">
            <Spinner />
        </div> : <>
            <div className="w-full bg-primary bg-opacity-30 h-[1px] mb-4"></div>
            <div className="w-full items-center flex flex-col pb-6">
                <ImagePicker
                    image={image}
                    key={imageKey}
                    name="groupImage"
                    setImagePath={setImageFile}
                    alt="Group Image"
                    className="border-none w-[125px] h-[125px] max-h-fit"
                />

                <TextInput placeHolder="Group name" value={newName}
                    {...form.register("groupName", {
                        required: "Enter your username",
                        onChange: (e) => setInputFieldValue(e.target.value),
                    })}
                    errorMessage={
                        form.formState.errors.groupName?.message?.toString() || ""
                    }
                />
            </div></>}
        </PopUpContainer>
    );
};