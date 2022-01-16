export const LOGIN_USER = (data) =>{
    return {
        type: 'user/loginUser', 
        payload:data
    }
}

export const LOGOUT_USER = () =>{
    return {
        type: 'user/logoutUser'
    }
}