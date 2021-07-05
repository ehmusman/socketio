import React, { useState, useEffect } from 'react'
import queryString from "query-string"
import io from "socket.io-client"

let socket;
const Chat = ({ location }) => {
    const [name, setName] = useState("")
    const [room, setRoom] = useState("")
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState("")

    const endPoint = "http://localhost:6000"
    useEffect(() => {
        const { name, room } = queryString.parse(location.search)
        socket = io(endPoint)
        setName(name)
        setRoom(room)
        console.log("before join", name, room)
        socket.emit("join", { name, room })

        return () => {
            socket.off()
        }
    }, [endPoint, location.search])

    // receiving message from backend

    useEffect(() => {
        socket.on("message", message => {
            console.log(message)
            setMessages([...messages, message])
        })
    }, [messages])

    // function for sending messages
    const sendMessage = e => {
        e.preventDefault()
        if (message) {
            socket.emit("sendMessage", message, () => setMessage(""))
        }
    }

    console.log(message, messages)
    return (
        <div className="container">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" ? sendMessage(e) : null}
            />
        </div>
    )
}

export default Chat
