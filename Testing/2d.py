import cv2
import numpy as np

# Load the image
image = cv2.imread('file.png')

# Define the four corners of the original image
# These points should form a quadrilateral in the order: top-left, top-right, bottom-right, bottom-left
original_corners = np.array([[0, 0], [image.shape[1], 0], [image.shape[1], image.shape[0]], [0, image.shape[0]]], dtype=np.float32)

# Define the four corners of the desired top-down view
# Adjust these points according to the desired transformation
# This is just an example, you'll need to adjust these points based on your specific image and desired top-down view
top_down_corners = np.array([[0, 0], [600, 0], [600, 600], [0, 600]], dtype=np.float32)

# Compute the perspective transformation matrix
matrix = cv2.getPerspectiveTransform(original_corners, top_down_corners)

# Apply the perspective transformation to the image
top_down_image = cv2.warpPerspective(image, matrix, (600, 600))  # Adjust the size as needed

# Display the top-down view image
cv2.imshow('Top-Down View', top_down_image)
cv2.waitKey(0)
cv2.destroyAllWindows()
