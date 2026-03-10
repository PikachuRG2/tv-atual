const express = require("express")
const request = require("request")

const app = express()

app.get("/canal/:id",(req,res)=>{

const id = req.params.id

const url = `http://gerenciar.vivatele.com:80/viva_padrao/viva2384/${id}`

request(url).pipe(res)

})

app.listen(3000)
