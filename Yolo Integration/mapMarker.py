# This code draws is extended from a rectangle to polygon on image with a mouse click
# -----------------------------------------
#  FOUR CLICKs IN CLOCK WISE DIRECTION like this    1  4
#                                                   2  3
# -----------------------------------------
# Left click to add and right click to remove the area (any of the four dots)
# -----------------------------------------
# Use the first frame of the view and then use this file for marking parking lines
# -----------------------------------------

import cv2
import pickle

mapFileName = 'guideLines'
video_filetouse = 'video.mp4'
cap = cv2.VideoCapture(video_filetouse)

#  marker width
width, height = 5, 5

try:
    with open(mapFileName, 'rb') as f:
        poslist = pickle.load(f)
except:
    poslist = []

# to capture and delete the clicks
def mouseClick(events, x, y, flags, parmas):
    if events == cv2.EVENT_LBUTTONDOWN:
        poslist.append((x, y))
    if events == cv2.EVENT_RBUTTONDOWN:
        for i, pos in enumerate(poslist):
            x1, y1 = pos
            if x1 < x < x1 + width and y1 < y < y1 + height:
                poslist.pop(i)

    with open(mapFileName, 'wb') as f:
        pickle.dump(poslist, f)

_, frame1 = cap.read()
cv2.imwrite('file.png', frame1)

while True:
    img = cv2.imread('file.png')
    for pos in poslist:
        cv2.rectangle(img, pos, (pos[0] + width, pos[1] + height), (255, 0, 255), 2)
    cv2.imshow('image', img)
    cv2.setMouseCallback('image', mouseClick)
    cv2.waitKey(1)