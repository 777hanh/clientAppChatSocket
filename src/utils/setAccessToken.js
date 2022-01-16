import axios from 'axios'

//set authorization to header of response
//gắn thằng token từ respone vào header
const setAuthToken = token =>{
    if(token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    else
    delete axios.defaults.headers.common['Authorization']
}

export default setAuthToken