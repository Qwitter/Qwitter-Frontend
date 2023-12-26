import { Button } from '@/components'
import { Link, Navigate } from 'react-router-dom'


export default function NotFound() {
    const token = localStorage.getItem("token");
    if (!token) {
        return (
            <Navigate to={"/"} replace />
        );
    }
    return (
        <div className='px-3 py-10 flex flex-col w-full'>
            <div className='max-w-[600px] mt-10 flex flex-col justify-center items-center w-full py-5 mx-auto px-3'>
                <span className='text-gray mb-7'>Hmm...this page doesn't exist. Try searching for something else.</span>
                <Link to='/Explore' >
                    <Button variant={'secondary'}   >Search </Button>
                </Link>
            </div>
        </div>
    )
}