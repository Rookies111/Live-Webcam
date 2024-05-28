<script>
const socket = new WebSocket('ws://0.0.0.0:4003')

socket.onopen = () => {
  console.log('Connected to the server')
  socket.send('Hello from the client!')
}

socket.onmessage = (event) => {
  // console.log('Message from the server:', event.data)
  screen = document.querySelector('.screen')
  screen.src = `data:image/jpeg;base64,${event.data}`
}
</script>

<template>
  <img src="../assets/no_signal.jpg" class="screen" />
</template>

<style scoped>
.screen {
  width: 60vw;
  border-radius: 15px;
  position: absolute;
  top: 47.5%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
