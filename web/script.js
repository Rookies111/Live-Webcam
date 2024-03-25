let frame_count = 0
let start_time = Date.now()
const socket = new WebSocket('ws://localhost:4003')

socket.addEventListener("open", () => {
    console.log("We are connected")
    socket.send('{"header": {"msg_type": "req", "device_type": "viewer", "name": "viewer1"}, "data": ""}')
})
socket.addEventListener("message", (event) => {
    res = JSON.parse(event.data)
    while (!(res.header.msg_type == 'ack')) {
        console.log('waiting for server')
    }
    console.log(res.data)
    start_streaming()
})

function start_streaming() {
    console.log("start streaming")
    const fps = document.getElementById("fps")
    const img = document.getElementById('video')

    socket.onmessage = function(event) {
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