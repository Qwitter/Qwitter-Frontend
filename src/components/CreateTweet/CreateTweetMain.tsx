import img from '../../assets/temp.png'
import { Textarea } from '../ui/textarea'

export default function CreateTweetMain({ tweet, setTweet }: { tweet: string, setTweet: React.Dispatch<React.SetStateAction<string>> }) {

    return (
        <div className="flex flex-row items-start h-full w-full">
            <div className='mr-1 mt-3 min-w-fit'>
                <img src={img} alt="" className='w-10 h-10 rounded-full border-[#ffffee] border-[1px] border-solid' />
            </div>
            <Textarea text={tweet} setText={setTweet} className='bg-transparent z-10 py-3 w-full placeholder:text-gray text-[20px] focus:ring-transparent focus:border-none focus:outline-none resize-none border-none'
            />
        </div>

    )
}