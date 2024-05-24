# Import the necessary libraries
import json
import websockets.sync.client as ws

async def main():
    # Connect to the server and request ack message from the server
    websocket = ws.connect('ws://localhost:4003/')
    websocket.send('{"header": {"msg_type": "req", "device_type": "camara", "name": "camara1"}, "data": "ack"}')
    print("ack sent")

    # Wait for ack message from the server
    res = await json.loads(websocket.recv())
    while not res["header"]["msg_type"] == "ack":
        res = json.loads(websocket.recv())
        print("Waiting for ack...")
    print(res["data"], "has connected to port 4003!.")

if __name__ == "__main__":
    main()