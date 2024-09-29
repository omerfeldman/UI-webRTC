import { useStreamManager, useStreamData } from '../hooks';
import PropTypes from 'prop-types';
import { VideoCanvas } from '../videoCanvas/videoCanvas';
import {CircularProgress, ErrorMessage} from '@UILibrary/MUIConfig.js';

export const LiveStream = ({ streamId }) => {

    const { data: stream, isPending, isError, error } = useStreamData(streamId);

    if (isPending) return <div><CircularProgress/></div>;
    if (isError) return <div><ErrorMessage message={error.message}/></div>;
    
    const { videoRef } = useStreamManager(stream);
    return (
        <>
            <video ref={videoRef} width="0" height="0" muted autoPlay playsInline />
            <VideoCanvas stream={stream} videoRef={videoRef} />
        </>
    );
};

LiveStream.propTypes = {
    stream: PropTypes.shape({
      streamId: PropTypes.string.isRequired, 
      resolution: PropTypes.string.isRequired, 
      username: PropTypes.string,          
      password: PropTypes.string,             
      baseUrl: PropTypes.string.isRequired,   
      isStreaming: PropTypes.bool.isRequired, 
    }).isRequired,
};
