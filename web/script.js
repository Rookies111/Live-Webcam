let frame_count = 0
let start_time = Date.now()
const debug = document.getElementById("debug")
const socket = new WebSocket('ws://127.0.0.1:4003');
socket.addEventListener("open", () => {debug.innerHTML = "We are connected"})
    // connected = false
    // socket.send(JSON.stringify({msg:"viewer{i}", device_type:"viewer", type:"req"}))
    // while (!connected) {
    //     delay(1000)
    //     console.log('waiting for server')
    //     socket.onmessage = function(event) {
    //         console.log(event.data)
    //         // if (event.data == 'viewer{i} has connected') {
    //         //     console.log('server connected')
    //         //     connected = true
    //         // }
    //     }
    // }
    // function waitOneSecond(ms) {
    //     return new Promise(resolve => {
    //       setTimeout(resolve, ms);
    //     });
    // }

    // async function delay(ms) {
    //     await waitOneSecond(ms);
    // }
// })
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