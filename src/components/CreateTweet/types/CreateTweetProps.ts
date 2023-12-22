import { UseFormReturn } from "react-hook-form";

type Images = {
    value: string;
    type: string;
}
export type CreateTweetFooterProp =
    {
        mode: "popUp" | "home"|"reply";
        files: File[]; 
        setFiles: React.Dispatch<React.SetStateAction<File[]>>;
        videoFile: File|undefined; 
        setVideoFile: React.Dispatch<React.SetStateAction<File|undefined>>;
        handleSubmit(): void;
        handleTextChange:(e:string)=>void;
        isValid: boolean;
        text: string;
        selectedImages: Images[];

        setSelectedImages: React.Dispatch<React.SetStateAction<Images[]>>;
    }
export type CreateTweetMainProp = {
    mode: "popUp" | "home" | "reply";
    form: UseFormReturn<{
        Text: string;
    }>;
    replyTo?:string;
    
    selectedImages: Images[]; tweet: string, setTweet: React.Dispatch<React.SetStateAction<string>>, handleRemoveFile: (index: number) => void
} & Partial<CreateTweetFooterProp>

export type Mention = {
    position: number;
    length: number;
    mention: string;
}