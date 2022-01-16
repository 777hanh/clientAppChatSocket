const initValue = {
    conversations: [],
    currentChat: ''
}

const conversationrReducer = (state = initValue, action) => {
    switch (action.type) {
        case 'conversation/addConversation':
            return {
                ...state,
                conversations: [ action.payload.conversation]
                // currentChat: action.payload.currentChat
            }

        case 'conversation/addCurrentChat':
            return {
                ...state,
                conversations: [...state.conversations,action.payload.conversation],
                currentChat: action.payload.currentChat
            }


        default:
            return {
                ...state
            }
    }
}

export default conversationrReducer