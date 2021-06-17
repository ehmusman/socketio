const express = require("express")
const socketio = require("socket.io")
const http = require("http")
const dotenv = require("dotenv")
dotenv.config()
const app = express()
const router = require("./router")
const server = http.createServer(app)

const io = socketio(server)
io.on("connection", socket => {
    console.log("We have a new Connection !!!")

    socket.on("disconnect", () => {
        console.log("User Had Left!!!")
    })
})

app.use(router)

const PORT = process.env.PORT || 6000
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))