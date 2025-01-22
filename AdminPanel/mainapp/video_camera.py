# video_camera.py
import cv2

class VideoCamera:
    def __init__(self):
        # Use the default camera (index 0), or you can change this to a different camera
        self.video = cv2.VideoCapture(0)

    def __del__(self):
        self.video.release()

    def get_frame(self):
        # Read a frame from the video stream
        ret, frame = self.video.read()

        if not ret:
            raise ValueError("Failed to capture video frame")

        return frame
