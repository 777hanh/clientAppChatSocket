import "./friend.css";
import defaulImgConversation from "../../assets/avatar.jpg"

export default function Friend(){
    return(
        <>
        <div className="friend">
            <div >
                <img className="friendImg" src={defaulImgConversation} alt="defaulImgConversation" />
                <span className="friendName">Prevlife</span>
            </div>
        </div>
        </>
    )
}