from datetime import datetime
from websockets.sync.client import connect
import threading
import time
import os
import cv2
import base64

def list_ports():
    """
    Test the ports and returns a tuple with the available ports and the ones that are working.
    """
    non_working_ports = []
    dev_port = 0
    working_ports = []
    available_ports = []
    while len(non_working_ports) < 6: # if there are more than 5 non working ports stop the testing. 
        camera = cv2.VideoCapture(dev_port)
        try:
            if not camera.isOpened():
                non_working_ports.append(dev_port)
                print("Port %s is not working." %dev_port)
            else:
                is_reading, img = camera.read()
                w = camera.get(3)
                h = camera.get(4)
                if is_reading:
                    print("Port %s is working and reads images (%s x %s)" %(dev_port,h,w))
                    working_ports.append(dev_port)
                else:
                    print("Port %s for camera ( %s x %s) is present but does not reads." %(dev_port,h,w))
                    available_ports.append(dev_port)
            dev_port +=1
        except:
            continue
    return available_ports,working_ports,non_working_ports

def render_video():
    global image_count
    images = [img for img in os.listdir("../Output") if img.endswith(".jpeg")]
    images.sort()
    frame = cv2.imread(os.path.join("../Output", images[0]))
    height, width, layers = frame.shape

    video = cv2.VideoWriter(f"../Output/{datetime.now().strftime('%d-%m-%Y_%H%M%S')}.avi", 0, 30, (width,height))

    for image in images:
        video.write(cv2.imread(os.path.join("../Output", image)))
        os.remove(f"../Output/{image}")

    cv2.destroyAllWindows()
    video.release()
    image_count = 1
    print("Finished")
    return 0

def capture_and_stream():
    global record, active, image_count
    available, working, not_working = list_ports()
    # print(available, working, not_working)
    image_count = 1
    cap = cv2.VideoCapture(working[0])
    # cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1080)
    # cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)

    # font 
    font = cv2.FONT_HERSHEY_SIMPLEX 
    # org 
    org = (50, 50) 
    # fontScale 
    fontScale = 1
    # Blue color in BGR 
    color = (255, 0, 0) 
    # Line thickness of 2 px 
    thickness = 2

    while cap.isOpened() and active:
        ret, frame = cap.read()
        if not ret:
            break
        cv2.putText(frame, str(datetime.now()), org, font,
                fontScale, color, thickness, cv2.LINE_AA)
        # Convert the frame to JPEG format
        _, buffer = cv2.imencode('.jpeg', frame, [int(cv2.IMWRITE_JPEG_QUALITY), 70])
        # Encode the frame as base64 string
        frame_encoded = base64.b64encode(buffer).decode('utf-8')
        # Send the frame to the client
        websocket.send('{"msg":"' + frame_encoded + '", "type":"image"}')
        if record:
            cv2.imwrite(f"../Output/{str(image_count).zfill(5)}.jpeg",frame)
            image_count += 1
        elif not record and image_count > 1:
            print("Rendering video...")
            threading.Thread(target=render_video).start()

    cap.release()
    return 0

def recv_msg():
    global record, active
    while active:
        msg = websocket.recv()
        print("python received:", msg)
        if msg == "start":
            record = True
            print("Recording...")
        elif msg == "stop":
            record = False
        elif msg == "end":
            active = False
    return 0

if __name__ == "__main__":
    record = False
    active = True
    websocket = connect('ws://localhost:4003/')
    websocket.send('{"msg": "camara", "device_type": "camara", "type": "req"}')
    while not websocket.recv() == "ack":
        print("Waiting for ack...")
        time.sleep(500)
    print("received ack. Start streaming...")
    threading.Thread(target=capture_and_stream).start()
    threading.Thread(target=recv_msg).start()
