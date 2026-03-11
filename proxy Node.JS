const express = require("express")
const request = require("request")

const app = express()

app.get("/stream", (req,res)=>{

const url = req.query.url

req.pipe(request(url)).pipe(res)

})

app.listen(3000)