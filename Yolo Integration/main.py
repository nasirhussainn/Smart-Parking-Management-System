# The main code for processing videos. In case of live stream use
# ------------------------------------------

import cv2
import pickle
import numpy as np

from object_detection import ObjectDetection
# Initialize Object Detection (if using without GPU use Yolo-tiny)
od = ObjectDetection()

mapfiletouse = 'mapSpotFile'
video_filetouse = 'video.mp4'

cap = cv2.VideoCapture(video_filetouse)  # you can use camera feed here for live video stream

width_img = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height_img = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
fps = cap.get(cv2.CAP_PROP_FPS)
fps_inc = fps-1
size = (width_img, height_img)

# the object to make video
vidstr = cv2.VideoWriter('output.avi', cv2.VideoWriter_fourcc(*'MJPG'), fps, size)

# LOAD the Parking Spot Info
with open(mapfiletouse, 'rb') as f:
    poslist = pickle.load(f)


#------------------------------------------
polygonlist: list = []
templist: list = []
for pos in poslist:
    if len(templist) <= 3:
        templist.append(pos)
    else:
        polygonlist.append(templist)
        templist: list = [] # delete the list to startover
        templist.append(pos)
# as for last loop else condition
polygonlist.append(templist)
#------------------------------------------

count = 0
while True:
    checkFilledSpots = np.zeros((len(polygonlist),), dtype=int)
    # to display frames
    success, img = cap.read()

    if success:
        count += fps_inc-5  # for fps = 1
        print(count)
        cap.set(cv2.CAP_PROP_POS_FRAMES, count)
    else:
        cap.release()
        break

    # Point current frame
    center_points_cur_frame = []

    # Detect objects on frame
    (class_ids, scores, boxes) = od.detect(img)
    for box in boxes:
        (x, y, w, h) = box
        cx = int((x + x + w) / 2)
        cy = int((y + y + h) / 2)
        center_points_cur_frame.append((cx, cy))
        cv2.circle(img, [cx, cy], 2, (255, 0, 255), 1)
        center_points_cur_frame.append([cx, cy])

    index = 0
    for area in polygonlist:
        flag = 0

        for cxcy in center_points_cur_frame:
            result = cv2.pointPolygonTest(np.array(area, np.int32), cxcy, False)
            if result >= 0:
                flag = 1

        if flag == 1:
            cv2.polylines(img, np.int32([area]), True, (0, 0, 255), 1)
            checkFilledSpots[index] = 1
        else:
            cv2.polylines(img, np.int32([area]), True, (1, 255, 1), 1)

        index += 1

    filledSpots = np.count_nonzero(checkFilledSpots)
    cv2.putText(img, 'Filled Spots: ' + str(filledSpots), (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
    cv2.putText(img, 'Empty Spots: ' + str(len(polygonlist) - filledSpots), (width_img - 450, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (1, 255, 1), 2)
    cv2.imshow('image', img)
    vidstr.write(img)
    cv2.waitKey(5)