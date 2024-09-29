import React from 'react';
import PropTypes from 'prop-types'; 
import { useVideoCanvas } from '../../hooks';
import styles from './videoCanvas.module.css';

export const VideoCanvas = ({ stream, videoRef }) => {
    const { canvasRef } = useVideoCanvas(stream, videoRef);

    return (
        <canvas
            ref={canvasRef}
            className={styles.canvasVideo} 
        />
    );
};

VideoCanvas.propTypes = {
    videoRef: PropTypes.object.isRequired,  
  };