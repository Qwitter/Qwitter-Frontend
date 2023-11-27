import img from '../../assets/temp.png'
import { Textarea } from '../ui/textarea'
import TweetImagesViewer from "../TweetImagesViewer/TweetImagesViewer";
import CreateTweetFooter from './CreateTweetFooter';
import { CreateTweetMainProp } from './types/CreateTweetProps';
export default function CreateTweetMain({ selectedImages, setSelectedImages, handleSubmit, setFiles, tweet, files, mode, setTweet, handleRemoveFile, form }: CreateTweetMainProp) {
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {

        const inputText = e.target.value;
        if (inputText.length > 700) return;
        setTweet(inputText);
        form.setValue("Text", inputText);
        form.trigger("Text");

    };


    return (
        <div className="flex flex-row items-start h-full w-full ">
            <div className='mr-1 mt-3 min-w-fit'>
                <img src={img} alt="" className='w-10 h-10 rounded-full border-[#ffffee] border-[1px] border-solid' />
            </div>
            <div className='w-[90%]'>
                <div className={`${tweet.length>100||selectedImages.length>0?'overflow-y-auto':"" } max-h-[480px] relative`}>
                    <Textarea
                        {...form.register("Text", {
                            required: "Enter a tweet",
                            onChange: (e) => handleInputChange(e)
                        })}
                        mode={mode}
                        placeholder='What is happing?!' text={tweet} setText={setTweet} className='bg-transparent  placeholder:text-gray  focus:ring-transparent focus:border-none focus:outline-none resize-none border-none'
                    />
                    <TweetImagesViewer images={selectedImages} mode='edit' removeAttachment={handleRemoveFile} />
                </div>

                {mode == "home" && <CreateTweetFooter
                    mode={mode}
                    files={files!}
                    setFiles={setFiles!}
                    isValid={form.formState.isValid}
                    text={tweet}
                    
                    handleSubmit={handleSubmit!} selectedImages={selectedImages!} setSelectedImages={setSelectedImages!} />
                }</div>
        </div>

    )
}