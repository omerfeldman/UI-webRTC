import { useRef, useEffect } from 'react';
import {WHEPClient} from '../utils/whep_client.js';

export const useStreamManager = (stream) => {
    const videoRef = useRef(null);
    const whepClientRef = useRef(null);

    useEffect(() => {
        const startStream = () => {
            if (!whepClientRef.current && stream) {
                const { streamId, baseUrl, username, password } = stream;
                const whepClient = new WHEPClient(streamId, baseUrl, username, password);
                whepClientRef.current = whepClient;

                const video = videoRef.current;
                if (whepClient) {
                    whepClient.start(video);
                }

                video.addEventListener('pause', (e) => {
                    e.currentTarget.play();
                });
            }
        };

        const stopStream = () => {
            const video = videoRef.current;

            if (whepClientRef.current) {
                whepClientRef.current.stop();
                whepClientRef.current = null;
            }

            if (video && video.srcObject) {
                video.srcObject.getTracks().forEach(track => track.stop());
                video.srcObject = null;
            }
        };

        if (stream.isStreaming) {
            startStream();
        } else {
            stopStream();
        }

        return () => {
            stopStream();
        };
    }, [stream.isStreaming]);

    return { videoRef };
};
