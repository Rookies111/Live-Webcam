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
  ws.on('close', (data) => {
    console.log(data)
    console.log(`${client.name} has disconnected from port 4003!`)
  })
  ws.on('message', data => {
    const res = JSON.parse(data.toString())
    // console.log(res)
    const header = res.header
    const req = {
      header: {
        msg_type: 'res',
        device_type: 'server',
        name: 'server'
      },
      data: null
    }
    sockserver.clients.forEach(client => {
      switch (header.msg_type) {
        case 'req':
          if (res.data == 'ack' && !client_list.includes(header.name)) {
            client_list.push(header.name)
            client.name = header.name
            client.device_type = header.device_type
            req.header.msg_type = 'ack'
            req.data = header.name
            console.log(`${client.name} has connected to port 4003!`)
          } else if (res.data == 'dis' && client_list.includes(header.name)) {
            client_list = client_list.filter(client => client != header.name)
            client.close(`${header.name}`)
            console.log(`${header.name} has disconnected from port 4003!`)
          }
          break

        case 'cmd':
          if (client.device_type == "camara") {
            req.header.msg_type = 'cmd'
            req.data = res.data
          }
          break

        case 'res':
          req.header.msg_type = 'res'
          req.data = res.data
          break

        default:
          console.log(`default ${res}`)
          break
      }
      client.send(JSON.stringify(req))
    })
    console.log(client_list)
  })
  ws.onerror = function () {
    console.log('websocket error')
  }
})
