const ws = new WebSocket("ws://server:8080")

function trocarCanal(id){

ws.send(id)

}

ws.onmessage=(msg)=>{

abrirCanal(msg.data)

}