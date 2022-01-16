import "./mess.css"
import Spinner from "../../components/layout/spin"
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react'
import NavBarMenu from '../../components/layout/navMenu'
import CheckLogged from '../../utils/checkLogged'
import Conversation from "../../components/conversation/conversation";
import Message from "../../components/message/message";
import Friend from "../../components/friend/friend";
import { apiUrl } from '../../constants/apiUrl'
import io from "socket.io-client";

import { ADD_CONVERSATION } from '../../redux/action/conversationAction'

const socket = io.connect("https://hidden-sierra-71377.herokuapp.com/")


export default function Mess() {

    const [conversations, setConversations] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('')
    const [addConversation, setAddConversation] = useState('')
    const flag = { a: 1 }





    const scrollRef = useRef()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    CheckLogged()
    let check = useSelector(state => state.user.isAuthenticated)
    const user = useSelector(state => state.user.phone)

    const handleAddConverSation = async () => {
        const requestBody = { receiverId: addConversation }
        if (addConversation !== '') {
            try {
                const response = await axios.post(`${apiUrl}/conversation`, requestBody)
                if (response)
                    flag.a += 1
                setAddConversation('')
            } catch (error) {
                console.log(error);
            }
        }
    }


    const joinConversation = (c) => {
        const infoSender = { c, user }
        if (currentChat !== "") {
            socket.emit("joinConversation", infoSender)
        }
    }


    //load conversations
    useEffect(() => {
        const getConversations = async () => {
            try {
                const response = await axios.get(`${apiUrl}/conversation/conversations`)
                setConversations(response.data)
                dispatch(ADD_CONVERSATION({
                    conversation: response.data.conversations
                }))
                // console.log(conversations.conversations)
            } catch (error) {
                console.log(error);
            }
        }
        getConversations()
    }, [flag])

    //get message
    useEffect(() => {
        const getMessage = async () => {
            try {
                const response = currentChat ? await axios.get(`${apiUrl}/message/` + currentChat._id) : ''
                // console.log(response.data.messages)
                setMessages(response.data.messages)
            } catch (error) {
                console.log(error);
            }
        }
        getMessage()
    }, [currentChat])
    // console.log(messages)

    //scroll to last message
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    // console.log(messages)

    const handleSendMessage = async (e) => {
        const message = {
            ConversationId: currentChat._id,
            text: newMessage
        }
        if (newMessage !== '') {
            try {
                const response = await axios.post(`${apiUrl}/message/add`, message)
                // console.log(response.data.messages)

                //send messaga to socket server
                socket.emit("sendMessage", response.data.messages)

                setMessages([...messages, response.data.messages])
                setNewMessage('')
                // console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        }

    }

    useEffect(() => {
        socket.on("recieveMessage", (data) => {
            // console.log(data)
            // console.log(currentChat)
            setMessages((prev) => [...prev, data])
        })
    }, [socket])




    let body = (
        <Spinner />
    )

    if (!check) {
        body = (
            <div className="d-flex justify-content-center mt-5">
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col-md-auto">
                            <h2>You need Login first to access this page</h2>
                        </div>
                    </div>
                    <div className="row justify-content-md-center">
                        <div className="col-md-auto nameWeb" onClick={() => {
                            navigate('/login')
                        }}>
                            Login Now
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else {
        body = (
            <>
                <div className="messenger">
                    {/* Hiển thị roomchat */}
                    <div className="chatMenu">
                        <div className="chatMenuWrapper">
                            <div className="searchFriendWrapper">
                                <button className="chatMenuSearchBtn" onClick={handleAddConverSation}><i class="fas fa-xs fa-plus itemMenuSearchBtn"></i></button>
                                <input
                                    className="chatMenuSearch"
                                    placeholder="Search Friend"
                                    onChange={(e) => setAddConversation(e.target.value)}
                                    value={addConversation}
                                    onKeyPress={(e) => {
                                        e.key === "Enter" &&
                                            handleAddConverSation()
                                    }}
                                />
                            </div>
                            {
                                conversations.conversations ?
                                    conversations.conversations.length > 0 ?
                                        conversations.conversations.map((c, index) => (
                                            <div key={index} onClick={() => {
                                                // console.log(c)
                                                setCurrentChat(c)
                                                joinConversation(c)
                                            }
                                            }>
                                                <Conversation conversation={c} />
                                            </div>

                                        ))
                                        :
                                        <div>There is no conversations</div>
                                    :
                                    <div>There is no conversations</div>
                            }
                        </div>
                    </div>

                    {/* Hiển thị hội thoại */}
                    <div className="chatBox">
                        <div className="chatBoxWrapper">
                            {
                                currentChat ?
                                    <>
                                        <div className="chatBoxTop">
                                            {messages ?
                                                messages.length > 0 ?
                                                    messages.map((m, index) => (
                                                        <div key={index} ref={scrollRef}>
                                                            <Message message={m} />
                                                        </div>
                                                    ))
                                                    : <p className="null-current-chat">Hãy gửi gì đó . . .</p>
                                                : <p className="null-current-chat">Hãy gửi gì đó . . .</p>}
                                        </div>
                                        <div className="chatBoxBottom">
                                            <input
                                                className="chatMessageInput"
                                                placeholder="Aa"
                                                onChange={(e) => { setNewMessage(e.target.value) }}
                                                value={newMessage}
                                                onKeyPress={(e) => {
                                                    e.key === "Enter" &&
                                                        handleSendMessage()
                                                }}
                                            />
                                            <button className="chatSubmitButton"
                                                onClick={handleSendMessage}
                                            ><i className="fa fa-paper-plane-o" aria-hidden="true"></i></button>
                                        </div>
                                    </>
                                    :
                                    <span className="null-current-chat">Open a conversation to start a chat.</span>
                            }
                        </div>
                    </div>

                    {/* <div className="chatFriend">
                        <div className="chatFriendHeader">
                            <h4>Your Friend</h4>
                        </div>
                        <div className="chatFriendWrapper" >
                            <Friend />
                        </div>
                    </div> */}
                </div>
            </>
        )
    }

    return (
        <>
            <NavBarMenu />
            {body}
        </>
    )

}