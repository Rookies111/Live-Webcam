const socket = new WebSocket('ws://192.168.137.73:4003');
const img = document.getElementById('video');
const debug = document.getElementById("debug")
let frame_count = 0
let start_time = Date.now()

socket.addEventListener("open", () => {debug.innerHTML = "We are connected"})

socket.onmessage = function(event) {
    frame_count++;
    img.src = 'data:image/jpeg;base64,' + event.data;
    // console.log({start: start_time, now: Date.now(), delta: Date.now() - start_time})
    debug.innerHTML = `FPS: ${frame_count*1000/(Date.now() - start_time)}`
};

function StartRecord() {
    socket.send({"cmd":"start"})
}

function StopRecord() {
    socket.send({"cmd":"stop"})
}

function End() {
    socket.send({"cmd":"end"})
}