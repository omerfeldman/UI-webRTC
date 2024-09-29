# WebRTC Feature - Single Stream Viewer

## Overview
This feature implements a simple WebRTC-based solution for viewing a single video stream. It fetches stream data from a backend API and manages the WebRTC connection, rendering the video stream using a `<canvas>` for enhanced performance. This feature is an older version of a production system and is provided for code reference only.

## Key Components
### 1. LiveStream Component:

- Fetches the stream data using `useStreamData`.
- Manages the video stream using `useStreamManager`.
- Displays loading or error states when necessary.
- Passes the video stream to the `VideoCanvas` for rendering.

### 2. useStreamData Hook:

Fetches the stream data from the backend by `streamId` and considers the data fresh for 1 minute. After that, the data becomes stale, and the API will refetch the data only when necessary, such as when the `streamId` changes or the connection is reestablished.

### 3. useStreamManager Hook:

- Manages the lifecycle of the WebRTC stream.
- Uses a `WHEPClient` to establish and maintain the WebRTC connection.
- Starts and stops the stream based on the `isStreaming` status.

### 4. VideoCanvas Component:

- Draws the video stream on a `<canvas>` element, adjusting the size based on the stream's resolution.
- Utilizes the `useVideoCanvas` hook to handle canvas size adjustments and video rendering.

### 5. WHEPClient Class:

- Establishes the WebRTC connection.
- Manages ICE candidates and sends local video offers to the backend.
- Handles track events to render the stream on the `<video>` element.

## How It Works

The `LiveStream` component starts by fetching the stream data using the `useStreamData` hook. This hook considers the data fresh for 1 minute and refetches it only when necessary (e.g., when the `streamId` changes or the connection is reestablished).
Once the stream data is ready, `useStreamManager` establishes the WebRTC connection through the `WHEPClient` and binds the video stream to a hidden `<video>` element.
The actual rendering is done on a `<canvas>` element in the `VideoCanvas` component. The canvas size is adjusted dynamically to fit the stream's resolution using the `useVideoCanvas` hook.
The WebRTC connection uses ICE servers and manages track events, ensuring the video is rendered correctly on the `<canvas>`.

## Limitations

This is an older, simpler version of the WebRTC feature designed to handle a single stream. It doesn't include functionality for handling multiple streams or configuring the environment for local development. In the newer production version, the API has been enhanced to support fetching multiple streams per `siteId`, allowing for a grid of streams to be displayed on the screen.

## Notes
- **Running Locally**: This version does not include setup instructions for local execution, as it's provided for reference only.
- **Production Enhancements**: The newer version of this feature supports fetching multiple streams and dynamically rendering them in a grid, allowing for a more scalable and versatile solution.
