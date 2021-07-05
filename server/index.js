const express = require("express")
const http = require("http")
const dotenv = require("dotenv")
dotenv.config()
const socketio = require("socket.io")
const app = express()
const router = require("./router")
const server = http.createServer(app)
const cors = require("cors")

const { getUser, getUserInRoom, removeUser, addUser } = require("./users")

app.use(cors())

const io = socketio(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
io.on("connection", socket => {

    socket.on("join", ({ name, room }, callback) => {
        console.log(name, room)
        const { error, user } = addUser({ id: socket.id, name, room })
        if (error) return callback(error)
        console.log("after user seraching")
        socket.emit("message", { user: "admin", text: `${user.name}, Welcom to the room ${user.room}` })
        console.log("message of joining")
        socket.broadcast.to(user.room).emit("message", { user: "admin", text: `${user.name}, has Joined!` });
        console.log("Message to every one")

        socket.join(user.room)
        callback()
    })
    socket.on("sendMessage", (message, callback) => {
        const user = getUser(socket.id)
        io.to(user.room).emit("message", { user: user.name, text: message })
        callback()
    })
    socket.on("disconnect", () => {

    })
})

app.use(router)

const PORT = 6000
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))