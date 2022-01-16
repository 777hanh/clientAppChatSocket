import React from "react";
import { useSelector } from 'react-redux'
import "./message.css"
import {format} from 'timeago.js'

export default function Message({ message }) {
    // console.log(message)
    const user = useSelector(state => state.user.phone)
    return (
        <>
            <div className={user === message.sender ? "message own" : "message"}>
                {/* <div className={own ? "message own" : "message"}> */}
                <>
                    <div className="messageTop">
                        <div className={user === message.sender ? "messageName own" : "messageName"}>
                            {/* <div className={own ? "messageName own" : "messageName"}> */}
                            <p>{message.sender} :</p>
                        </div>
                        <p className="messageText">{message.text}</p>
                    </div>
                    <div className="messageBottom">
                        <p>{format(message.createdAt)}</p>
                    </div>
                </>
            </div>
        </>
    )
}