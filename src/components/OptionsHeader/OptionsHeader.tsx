import { cn } from '@/lib';
import { MoveLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
type Props = {
    header: string;
    className?: string;
    defaultBack?:boolean;

}

export function OptionsHeader({ header, className ,defaultBack=false}: Props) {
    const navigate = useNavigate();

    return (
        <div className="px-4 py-2 flex flex-row gap-8 items-center ">
            <div className= "hover:bg-[#191919] h-10 rounded-full transition-all p-2 cursor-pointer"
            onClick={() => {
                defaultBack?navigate('/'):navigate(-1)
                }}>
                <MoveLeft className={cn(
                'max-w-[50px] ',
                className
            )} />
            </div>
            <h1 className="text-primary text-xl font-bold text-start ">{header}</h1>
        </div>
    )
}