import {  MoveLeft } from 'lucide-react'
type Props = {
    header: string
}

export function OptionsHeader({header }: Props) {
    return (
        <div className="px-4 py-2 flex flex-row gap-8 items-center ">
            <a href='#' className='hover:bg-[#191919] rounded-full transition-all p-2 cursor-pointer'>
            <MoveLeft className='max-w-[50px] ' />
            </a>
            <h1 className="text-primary text-xl font-bold text-start ">{header}</h1>
        </div>
    )
}