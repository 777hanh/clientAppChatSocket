export const ADD_CONVERSATION = (data) =>{
    return {
        type: 'conversation/addConversation', 
        payload:data
    }
}

export const ADD_CURRENTCHAT = () =>{
    return {
        type: 'conversation/addCurrentChat'
    }
}