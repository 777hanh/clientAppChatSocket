const initValue = {
    isAuthenticated: false,
    phone: ''
}

const userReducer = (state = initValue, action) => {
    switch (action.type) {
        case 'user/loginUser':
            return {
                ...state,
                isAuthenticated: true,
                phone: action.payload.phone
            }

        case 'user/logoutUser':
            return {
                ...state,
                isAuthenticated: false,
                phone: ''
            }


        default:
            return {
                ...state
            }
    }
}

export default userReducer