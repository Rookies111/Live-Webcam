let frame_count = 0
let start_time = Date.now()
const debug = document.getElementById("debug")
const socket = new WebSocket('ws://localhost:4003');
socket._host = "test"
socket.addEventListener("open", () => {debug.innerHTML = "We are connected"})
const img = document.getElementById('video');

socket.onmessage = function(event) {
    frame_count++;
    img.src = 'data:image/jpeg;base64,' + event.data;
    // console.log({start: start_time, now: Date.now(), delta: Date.now() - start_time})
    debug.innerHTML = `FPS: ${frame_count*1000/(Date.now() - start_time)}`
};

function StartRecord() {
    socket.send(JSON.stringify({msg:"start", type:"cmd"}))
}

function StopRecord() {
    socket.send(JSON.stringify({msg:"stop", type:"cmd"}))
}

function End() {
    socket.send(JSON.stringify({msg:"end", type:"cmd"}))
}