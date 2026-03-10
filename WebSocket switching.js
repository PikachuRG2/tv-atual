const WebSocket = require("ws")

const wss = new WebSocket.Server({port:8080})

wss.on("connection",ws=>{

ws.on("message",msg=>{

wss.clients.forEach(c=>{

if(c.readyState===WebSocket.OPEN){
c.send(msg)
}

})

})

})