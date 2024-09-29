import { getClient } from '@api/axiosBaseClient';

export const apiGetStreamById = async (streamId) => {
  const client = getClient('streams');

  const response = await client.get(`stream/${streamId}`, {
    params: {
      media_type: 'webrtc',
    },
  });

  return response.data;
};
