import img from '../../assets/temp.png'
import { Textarea } from '../ui/textarea'
import TweetImagesViewer from "../TweetImagesViewer/TweetImagesViewer";
type Images = {
    value: string;
    type: string;
}
export default function CreateTweetMain({ tweet, setTweet ,selectedFile}: {selectedFile:Images[]; tweet: string, setTweet: React.Dispatch<React.SetStateAction<string>> }) {

    return (
        <div className="flex flex-row items-start h-full w-full">
            <div className='mr-1 mt-3 min-w-fit'>
                <img src={img} alt="" className='w-10 h-10 rounded-full border-[#ffffee] border-[1px] border-solid' />
            </div>
            <div className="max-h-[480px] w-[90%] overflow-y-auto">

                <Textarea placeholder='What is happing?!' text={tweet} setText={setTweet} className='bg-transparent  placeholder:text-gray  focus:ring-transparent focus:border-none focus:outline-none resize-none border-none'
                />
                <TweetImagesViewer images={selectedFile} />

            </div>
        </div>

    )
}