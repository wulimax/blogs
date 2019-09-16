const http = require('http')
const socketIO =require('socket.io')
const express = require('express')
const socketFn = require('./socketFn.js')
const app =express()


app.use(express.static('./www')) //定义静态文件夹
app.use(express.static('./node_modules/'))
const server = http.createServer(app)



//监听
const io = socketIO(server)
//监听连接事件
io.on('connection',socketFn)
server.listen(3000)