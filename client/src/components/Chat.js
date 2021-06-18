import React, { useState, useEffect } from 'react'
import queryString from "query-string"
import io from "socket.io-client"

let socket;
const Chat = ({ location }) => {
    const [name, setName] = useState("")
    const [room, setRoom] = useState("")
    const endPoint = "http://localhost:5000"
    useEffect(() => {
        const { name, room } = queryString.parse(location.search)
        socket = io(endPoint)
        setName(name)
        setRoom(room)
        socket.emit("join", { name, room })

        return () => {
            socket.emit("disconnect")
            socket.off()
        }
    }, [endPoint, location.search])
    return (
        <div>
            Chat
        </div>
    )
}

export default Chat
