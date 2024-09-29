import { useQuery } from '@tanstack/react-query';
import { apiGetStreamById } from '../api/streamsApi';

export const useStreamData = (streamId) => {
  return useQuery(['stream', streamId], () => apiGetStreamById(streamId), {
    staleTime: 6000, 
  });
};
 