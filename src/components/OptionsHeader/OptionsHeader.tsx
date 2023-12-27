import { cn } from '@/lib';
import { MoveLeft } from 'lucide-react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
type Props = {
    header: string;
    className?: string;
    defaultBack?: boolean;

}

export function OptionsHeader({ header, className, defaultBack = false }: Props) {
    const navigate = useNavigate();
    const [isLg, setIsLg] = useState(false)



    useEffect(() => {
        if (window.matchMedia) {
        const mediaQuery = window.matchMedia("(min-width: 1024px)");
        setIsLg(mediaQuery.matches);

        const handleMediaQueryChange = (event: { matches: boolean | ((prevState: boolean) => boolean); }) => {
            setIsLg(event.matches);
        };
        mediaQuery.addEventListener("change", handleMediaQueryChange);
        return () => {
            mediaQuery.removeEventListener("change", handleMediaQueryChange);
        };
    }
    }, []);

    return (
        <div className="px-4 py-2 flex flex-row gap-8 items-center ">
            {
                className && className.includes('lg') &&isLg? <div className='h-10 w-5'></div> :
                    <div className="hover:bg-[#191919] h-10 rounded-full transition-all p-2 cursor-pointer"
                        data-testid="Back"
                        onClick={() => {
                            defaultBack ? navigate('/') : navigate(-1)
                        }}>
                        <MoveLeft className={cn(
                            'max-w-[50px] ',
                            className
                        )} />
                    </div>
            }
            <h1 className="text-primary text-xl font-bold text-start ">{header}</h1>
        </div>
    )
}