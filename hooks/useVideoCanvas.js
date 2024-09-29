import { useEffect, useRef } from 'react';

export const useVideoCanvas = (stream, videoRef) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;

        const onVideoCanPlay = () => {
            adjustCanvasSize();  
            drawVideo(); 
        };

        if (video) {
            if (stream.startAutoPlay) {
                onVideoCanPlay();
            } else {
                video.addEventListener('canplay', onVideoCanPlay);
            }
        }

        return () => {
            if (video) {
                video.removeEventListener('canplay', onVideoCanPlay);
            }
        };
    }, [stream]);

    const adjustCanvasSize = () => { 
        const canvas = canvasRef.current;

        const [streamWidth, streamHeight] = stream.resolution
            ? stream.resolution.split('x').map(Number)
            : [640, 480];

        const aspectRatio = streamWidth / streamHeight;

        const parentWidth = canvas.parentElement ? canvas.parentElement.offsetWidth : window.innerWidth;
        const calculatedHeight = parentWidth / aspectRatio;

        canvas.width = parentWidth;
        canvas.height = calculatedHeight;
    };

    const drawVideo = () => {
        const videoElement = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const drawLoop = () => {
            if (ctx && videoElement) {
                ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
                setTimeout(drawLoop, 1000 / 30); // drawing at 30fps
            }
        };
        drawLoop();
    };

    return { canvasRef };
};
