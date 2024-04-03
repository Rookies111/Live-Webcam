# Import the necessary libraries
import os
import threading
import json
import cv2
import base64
from datetime import datetime
import websockets.sync.client as ws

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
    print("Finished")
    return 0

def capture_and_stream(websocket: ws.ClientConnection):
    global state, image_count
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

    while cap.isOpened() and state["is_active"]:
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
        websocket.send('{"header": {"msg_type": "res", "device_type": "camara", "name": "camara1"}, "data": "%s"}' %(frame_encoded))
        print("data sent")
        if state["is_record"]:
            cv2.imwrite(f"../Output/{str(image_count).zfill(5)}.jpeg",frame)
            image_count += 1
        elif not state["is_record"] and image_count > 1:
            print("Rendering video...")
            threading.Thread(target=render_video, name="render").start()
            image_count = 1

    cap.release()
    websocket.send('{"header": {"msg_type": "req", "device_type": "camara", "name": "camara1"}, "data": "dis"}')
    return 0

def recv_msg(websocket: ws.ClientConnection):
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

# Main function
def main():
    global state
    # Initialize the variables
    state = {"is_record": False, "is_active": True}

    # Connect to the server and request ack message from the server
    websocket = ws.connect('ws://localhost:4003/')
    websocket.send('{"header": {"msg_type": "req", "device_type": "camara", "name": "camara1"}, "data": "ack"}')
    print("ack sent")

    stream = threading.Thread(target=capture_and_stream, name="stream", args=[websocket])

    # Wait for ack message from the server
    res = json.loads(websocket.recv())
    while not res["header"]["msg_type"] == "ack":
        res = json.loads(websocket.recv())
        print("Waiting for ack...")
    print(res["data"], "has connected to port 4003!. Start streaming...")

    # Start streaming
    try:
        pass
        stream.start()
        # threading.Thread(target=recv_msg, name="receiver", args=[websocket]).start()
    except:
        pass

# Run the main function
if __name__ == "__main__":
    main()
