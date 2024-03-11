const express = require('express')
const app = express()
const path = require('path')
const WebSocket = require('ws')
const port = 8080

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../web') });
})

app.use(express.static(path.join(__dirname, 'web')));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// Received data from outside
uuid = 0
user = []
const sockserver = new WebSocket.Server({ port: 4003 })
sockserver.on('connection', ws => {
  ws.id = uuid
  user.push(ws.id)
  uuid++
  console.log(`New client uuid ${ws.id} has connected to port 4003!`)
  ws.on('close', () => console.log(`Client uuid ${ws.id} has disconnected from port 4003!`))
  ws.on('message', data => {
    // console.log(JSON.parse(data.toString()))
    data = JSON.parse(data.toString())
    sockserver.clients.forEach(client => {
      if (data.type == 'cmd') {
        if (client.id == user[0]) {
          client.send(`${data.msg}`)
        }
      } else if (client.id != user[0]) {
        client.send(`${data.msg}`)
      }
    })
  })
  ws.onerror = function () {
    console.log('websocket error')
  }
})
