const express = require('express')
const app = express()
const path = require('path')
const WebSocket = require('ws')
const port = 8080

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../web') });
})

app.use(express.static(path.join(__dirname, '../web')));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// Message structure
// {header: {msg_type: "msg_type", device_type: "device_type", name: "device_name"}, data: "data"}
// msg_type:
// - req: request to connect
// - res: response to request
// - ack: acknowledge connection
// - cmd: command
// device_type:
// - viewer: viewer device
// - camera: camera device
// - server: server device
// name: device name
// data: data

// Received data from outside
const sockserver = new WebSocket.Server({ port: 4003 })
sockserver.on('connection', ws => {
  ws.on('close', () => console.log(`${ws.name} has disconnected from port 4003!`))
  ws.on('message', data => {
    const res = JSON.parse(data.toString())
    const header = res.header
    sockserver.clients.forEach(client => {
      if (header.msg_type == 'cmd') {
        if (client.device_type == "camara") {
          client.send(JSON.stringify({header: {msg_type: "cmd", device_type: "server", name: "server"}, data: res.data}))
        }
      } else if (header.msg_type == 'req') {
        ws.name = header.name
        ws.type = header.device_type
        // console.log(`${ws.name} has connected to port 4003!`)
        client.send(JSON.stringify({header: {msg_type: "ack", device_type: "server", name: "server"}, data: `${ws.name} has connected to port 4003!`}))
      } else {
        client.send(JSON.stringify({header: {msg_type: "res", device_type: "server", name: "server"}, data: res.data}))
      }
    })
  })
  ws.onerror = function () {
    console.log('websocket error')
  }
})
