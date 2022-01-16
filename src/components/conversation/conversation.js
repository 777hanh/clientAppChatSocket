import "./conversation.css"
import { useSelector } from 'react-redux'
import defaulImgConversation from "../../assets/avatar.jpg"


export default function Conversation(conversation) {

    const user = useSelector(state => state.user.phone)
    const nameFirt = conversation.conversation.members[0]
    const nameSecond = conversation.conversation.members[1]
    // console.log(nameFirt)
    // console.log(nameSecond)

    let name=''
    if(nameFirt!==user)
        name = nameFirt
    else{
        name = nameSecond
    }

    return(
        <div className="conversation">
            <img className="conversationImg" src={defaulImgConversation} alt="defaulImgConversation" />
            <span className="conversationName">{name}</span>
            {/* {console.log(conversation)} */}
        </div>
    )
}