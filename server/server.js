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
client_list = []
const sockserver = new WebSocket.Server({ port: 4003 })
sockserver.on('connection', ws => {
  ws.on('close', () => console.log(`${ws.name} has disconnected from port 4003!`))
  ws.on('message', data => {
    const res = JSON.parse(data.toString())
    const header = res.header
    sockserver.clients.forEach(client => {
      switch (header.msg_type) {
        case 'req':
          if (res.data == 'ack' && !client_list.includes(header.name)) {
            console.log(client_list)
            client_list.push(header.name)
            ws.name = header.name
            ws.device_type = header.device_type
            console.log(`${ws.name} has connected to port 4003!`)
            client.send(`{"header": {"msg_type": "ack", "device_type": "server", "name": "server"}, "data": "${ws.name}"}`)
          } else if (res.data == 'dis' && client_list.includes(header.name)) {
            console.log(client_list)
            client_list = client_list.filter(client => client != header.name)
            console.log(client_list)
            console.log(`${ws.name} has disconnected from port 4003!`)
          }
          break

        case 'cmd':
          if (client.device_type == "camara") {
            client.send(`{"header": {"msg_type": "cmd", "device_type": "server", "name": "server"}, "data": ${res.data}}`)
          }
          break

        case 'res':
          client.send(`{"header": {"msg_type": "res", "device_type": "server", "name": "server"}, "data": ${res.data}}`)
          break

        default:
          console.log(`default ${res}`)
          break
      }
      if (header.msg_type == 'req' && res.data == "ack") {
        
      } else if (header.msg_type == 'cmd') {
        
      } else {
        
      }
    })
  })
  ws.onerror = function () {
    console.log('websocket error')
  }
})
