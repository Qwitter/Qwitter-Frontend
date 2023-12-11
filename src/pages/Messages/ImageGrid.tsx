import React from 'react';

interface ImageGridProps {
    images: string[];
}

const ImageGrid:React.FC<ImageGridProps> = ({ images }) => {
    // Determine the grid layout based on the number of images
    if (images.length === 1) {
        return (<div className=' flex flex-row mr-4 w-10 h-10 overflow-hidden rounded-full '>
            <img src={images[0]} className="w-full h-full " />

        </div>)

    } else if (images.length === 2) {
        return (
            <div className='flex flex-row mr-4 w-10 h-10 overflow-hidden rounded-full  gap-[0.05rem]'>
                <div className={`grid grid-rows-1 grid-cols-2 gap-[0.05rem]`}>
                    {images.map((image, index) => (
                        <img src={image} key={`Image ${index + 1}`} className="w-full h-full object-cover" />
                    ))}
                </div>

            </div>
        );
    } else if (images.length === 3) {
        return (
            <div className='flex flex-row mr-4 w-10 h-10 overflow-hidden rounded-full  gap-[0.05rem]'>
                <div className={`grid grid-rows-2 gap-[0.05rem]`}>
                    {images.slice(0, -1).map((image, index) => (
                        <img src={image} key={`Image ${index + 1}`} className=" max-w-full" />
                    ))}
                </div>
                <img src={images[2]} alt={`Image ${2 + 1}`} className=" h-full w-[50%] object-cover" />

            </div>
        );

    } else {
        return (
            <div className='flex flex-row mr-4 w-10 h-10 overflow-hidden rounded-full '>
                <div className={`grid grid-rows-2 grid-cols-2 gap-[0.05rem] w-full`}>
                    {images.map((image, index) => (
                        <img src={image} key={`Image ${index + 1}`} className="w-full h-full object-cover" />
                    ))}
                </div>

            </div>
        );
    }
};

export default ImageGrid;