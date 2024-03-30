let frame_count = 0
let start_time = Date.now()
const socket = new WebSocket('ws://localhost:4003')
const id = Math.random().toString(36).substring(2,10+2)

window.onunload = function () {
    socket.send(`{"header": {"msg_type": "req", "device_type": "viewer", "name": "viewer-${id}"}, "data": "dis"}`)
    socket.close()
}

socket.addEventListener("open", () => {
    console.log("We are connected")
    socket.send(`{"header": {"msg_type": "req", "device_type": "viewer", "name": "viewer-${id}"}, "data": "ack"}`)
    console.log("sent request")
})

socket.addEventListener("message", (event) => {
    res = JSON.parse(event.data)
    while (!(res.header.msg_type == 'ack' && res.data == `viewer-${id}`)) {
        console.log('waiting for server')
        res = JSON.parse(event.data)
    }
    console.log(`${res.data} has connected to port 4003!`)
    start_streaming()
})

function start_streaming() {
    console.log("start streaming")

    socket.onmessage = function (event) {
        const fps = document.getElementById("fps")
        const img = document.getElementById('video')
        res = JSON.parse(event.data)
        console.log(res)
        img.src = 'data:image/jpeg;base64,' + res.data
        frame_count++
        // console.log({start: start_time, now: Date.now(), delta: Date.now() - start_time})
        fps.innerHTML = `FPS: ${frame_count*1000/(Date.now() - start_time)}`
    }
}

function StartRecord() {
    socket.send(JSON.stringify({msg:"start", type:"cmd"}))
}

function StopRecord() {
    socket.send(JSON.stringify({msg:"stop", type:"cmd"}))
}

function End() {
    socket.send(JSON.stringify({msg:"end", type:"cmd"}))
}