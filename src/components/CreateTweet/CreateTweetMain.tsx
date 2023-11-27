import img from '../../assets/temp.png'
import { Textarea } from '../ui/textarea'
import TweetImagesViewer from "../TweetImagesViewer/TweetImagesViewer";
import { UseFormReturn } from 'react-hook-form';
type Images = {
    value: string;
    type: string;
}
export default function CreateTweetMain({ tweet, setTweet, selectedFile, handleRemoveFile, form }: {
    form: UseFormReturn<{
        Text: string;
    }>; selectedFile: Images[]; tweet: string, setTweet: React.Dispatch<React.SetStateAction<string>>, handleRemoveFile: (index: number) => void
}) {
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {

        const inputText = e.target.value;
        if (inputText.length > 700) return;
        setTweet(inputText);
        form.setValue("Text", inputText);
        form.trigger("Text");

    };


    return (
        <div className="flex flex-row items-start h-full w-full">
            <div className='mr-1 mt-3 min-w-fit'>
                <img src={img} alt="" className='w-10 h-10 rounded-full border-[#ffffee] border-[1px] border-solid' />
            </div>
            <div className="max-h-[480px] w-[90%] overflow-y-auto">

                <Textarea
                    {...form.register("Text", {
                        required: "Enter a tweet",
                        onChange: (e) => handleInputChange(e)
                    })}
                    placeholder='What is happing?!' text={tweet} setText={setTweet} className='bg-transparent  placeholder:text-gray  focus:ring-transparent focus:border-none focus:outline-none resize-none border-none'
                />
                <TweetImagesViewer images={selectedFile} mode='edit' removeAttachment={handleRemoveFile} />

            </div>
        </div>

    )
}