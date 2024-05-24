# Import the necessary libraries
import os
import threading
import cv2
import base64
from datetime import datetime

class camara():
    def __init__(self):
        available, working, not_working = self._list_ports()
        self.cap = cv2.VideoCapture(working[0])
        self.dimension = (720, 1080)
        self.image_count = 1
        self.state = {
            "is_active": True,
            "is_record": False
        }

    def _list_ports(self):
        """
        Test the ports and returns a tuple with the available ports and the ones that are working.
        """
        dev_port = 0
        non_working_ports = []
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

    def stream(self):
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
        
        while self.cap.isOpened() and self.state["is_active"]:
            ret, frame = self.cap.read()
            if not ret:
                break
            cv2.putText(frame, str(datetime.now()), org, font,
                    fontScale, color, thickness, cv2.LINE_AA)
            # Convert the frame to JPEG format
            _, buffer = cv2.imencode('.jpeg', frame, [int(cv2.IMWRITE_JPEG_QUALITY), 70])
            # Encode the frame as base64 string
            frame_encoded = base64.b64encode(buffer).decode('utf-8')
            # Send the frame to the client
            # websocket.send('{"header": {"msg_type": "res", "device_type": "camara", "name": "camara1"}, "data": "%s"}' %(frame_encoded))
            print("data sent")
            if self.state["is_record"]:
                cv2.imwrite(f"../Output/{str(self.image_count).zfill(5)}.jpeg",frame)
                self.image_count += 1
            elif not self.state["is_record"] and self.image_count > 1:
                print("Rendering video...")
                threading.Thread(target=self.render_video, name="render").start()
                self.image_count = 1

        self.cap.release()
        # websocket.send('{"header": {"msg_type": "req", "device_type": "camara", "name": "camara1"}, "data": "dis"}')
        return 0
    
    def start_record(self):
        self.state["is_record"] = True
        return 0
    
    def stop_record(self):
        self.state["is_record"] = False
        self.image_count = 1
        threading.Thread(target=self.render_video, name="render").start()
        return 0
    