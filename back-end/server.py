# Import the necessary libraries
import json
import camera
import asyncio
import websockets

CLIENTS = set()
cam = camera.camera()

async def handler(websocket):
    CLIENTS.add(websocket)
    await websocket.send("Hello")
    print(CLIENTS)
    while True and len(CLIENTS) > 0:
        websockets.broadcast(CLIENTS, cam.frame_encoded)
    try:
        async for _ in websocket:
            pass
    finally:
        CLIENTS.remove(websocket)

async def main():
    cam.start_stream()
    async with websockets.serve(handler, "0.0.0.0", 4003):
        await asyncio.Future()  # run forever
        
if __name__ == "__main__":
    asyncio.run(main())