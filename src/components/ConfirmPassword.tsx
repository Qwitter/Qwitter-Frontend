import { MoveLeft } from 'lucide-react'
import { CheckPassword } from './CheckPassword'
type Props = {}

export function ConfirmPassword({ }: Props) {

    return (
        <div className=" w-full h-full border-r border-primary border-opacity-30 mb-20">
            <div className="p-4 flex flex-row gap-8 items-center">
                <MoveLeft className='max-w-[56px] ' />
                <h1 className="text-primary text-xl font-bold text-start ">Account information</h1>
            </div>
            
            <CheckPassword />
            
        </div>
    )
}
