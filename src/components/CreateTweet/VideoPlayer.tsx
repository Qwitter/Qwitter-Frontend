import React from 'react';
import { HiOutlineXMark } from 'react-icons/hi2';
import { Player, BigPlayButton } from 'video-react';

const VideoPlayer = React.memo(({ video, setVideoFile }: { video: File; setVideoFile: React.Dispatch<React.SetStateAction<File | undefined>> }) => {
    return (
        <div
            className="my-4 relative rounded-lg overflow-hidden max-h-[400px] max-w-[300px]"
            onClick={(e) => e.preventDefault()}
        >
            <HiOutlineXMark
                className="tweet-image-remover-icon z-20"
                onClick={() => setVideoFile(undefined)}
            />

            <Player playsInline src={URL.createObjectURL(video)}>
                <BigPlayButton position="center" />
            </Player>
        </div>
    );
});

export default VideoPlayer;
