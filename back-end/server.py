# Import the necessary libraries
import json
import asyncio
import websockets
CLIENTS = set()

async def handler(websocket):
    CLIENTS.add(websocket)
    try:
        async for _ in websocket:
            pass
    finally:
        CLIENTS.remove(websocket)

async def broadcast(message):
    for websocket in CLIENTS.copy():
        try:
            await websocket.send(message)
        except websockets.ConnectionClosed:
            pass

async def broadcast_messages():
    while True:
        await asyncio.sleep(1)
        message = "hi"  # your application logic goes here
        await broadcast(message)

async def main():
    async with websockets.serve(handler, "0.0.0.0", 4003):
        await broadcast_messages()  # run forever

if __name__ == "__main__":
    asyncio.run(main())