const express = require("express")
const socketio = require("socket.io")
const http = require("http")
const dotenv = require("dotenv")
dotenv.config()
const app = express()

const server = http.createServer(app)

const io = socketio(server)


const PORT = process.env.PORT || 6000
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))