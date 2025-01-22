import cv2
from object_detection1 import ObjectDetection

# Initialize Object Detection
od = ObjectDetection()

# To store counts
vehicle_counts = {'two_wheeler': 0, 'four_wheeler': 0}
vehicle_inside = {}  # To track if vehicles are inside the video frame

def process_frame(img, od):
    global vehicle_counts, vehicle_inside

    # Detect objects on frame
    (class_ids, scores, boxes) = od.detect(img)

    # Initialize a dictionary to track detections in this frame
    detections_in_frame = {}

    for i, box in enumerate(boxes):
        (x, y, w, h) = box
        cx = int((x + x + w) / 2)
        cy = int((y + y + h) / 2)
        label = od.classes[class_ids[i]]

        # Draw marker around the detected vehicle
        cv2.rectangle(img, (x, y), (x + w, y + h), (255, 0, 0), 2)
        cv2.putText(img, label, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 2)

        if label in ["bicycle", "motorcycle"]:
            vehicle_type = 'two_wheeler'
        elif label in ["car", "truck", "bus"]:
            vehicle_type = 'four_wheeler'
        else:
            continue

        detections_in_frame[(cx, cy)] = vehicle_type

    # Update vehicle_inside dictionary for vehicles that have left the frame
    for (cx, cy) in list(vehicle_inside.keys()):
        if (cx, cy) not in detections_in_frame:
            vehicle_type = vehicle_inside.pop((cx, cy))
            vehicle_counts[vehicle_type] -= 1

    # Update vehicle_inside dictionary for new detections
    for (cx, cy), vehicle_type in detections_in_frame.items():
        if (cx, cy) not in vehicle_inside:
            vehicle_counts[vehicle_type] += 1
            vehicle_inside[(cx, cy)] = vehicle_type

    # Print counts to the prompt
    print(f'Two-Wheelers: {vehicle_counts["two_wheeler"]}, Four-Wheelers: {vehicle_counts["four_wheeler"]}')

    # Display counts on the video frame
    cv2.putText(img, f'Two-Wheelers: {vehicle_counts["two_wheeler"]}', (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
    cv2.putText(img, f'Four-Wheelers: {vehicle_counts["four_wheeler"]}', (10, 70), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
    # print(img)

    return img



def process_video(video_path, output_path, od):
    cap = cv2.VideoCapture(video_path)
    width_img = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height_img = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    size = (width_img, height_img)

    vidstr = cv2.VideoWriter(output_path, cv2.VideoWriter_fourcc(*'MJPG'), fps, size)
    print(vidstr)

    while True:
        success, img = cap.read()
        if not success:
            break

        img = process_frame(img, od)
        cv2.imshow('image', img)
        vidstr.write(img)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    vidstr.release()
    cv2.destroyAllWindows()

if __name__ == '__main__':
    input_path = r'E:\sociology\smartparking\cemras detection\video.mp4'  # Change this to your input file path
    output_path = 'output1.avi'  # Change this to your desired output file path

    process_video(input_path, output_path, od)
