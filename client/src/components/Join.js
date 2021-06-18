import React, { useState } from 'react'
import { Link } from "react-router-dom"
const Join = () => {
    const [name, setName] = useState("")
    const [room, setRoom] = useState("")
    return (
        <div >
            <div className="row justify-content-center text-primary align-items-center" style={{ minHeight: "100vh" }}>
                <div className="col-4 ">
                    <div className="card ">
                        <div className="card-header">
                            Sign In
                        </div>
                        <div className="card-body">
                            <form className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Name"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                                <input
                                    type="text"
                                    className="form-control my-2"
                                    placeholder="Room"
                                    value={room}
                                    onChange={e => setRoom(e.target.value)}
                                />
                                <Link
                                    onClick={(e) => (!name || !room) ? e.preventDefault() : null}
                                    style={{ cursor: (!name || !room) ? "default" : "pointer" }}
                                    to={`/chat?name=${name}&room=${room}`}>
                                    <button
                                        type="submit"
                                        disabled={(!name || !room) ? true : false}
                                        className="btn btn-primary w-100">
                                        Signin
                                    </button>
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Join
