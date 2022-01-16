import { useDispatch } from 'react-redux'
import axios from "axios"
import { useEffect } from 'react'
import { LOGIN_USER, LOGOUT_USER } from './../redux/action/authAction'
import setAuthToken from "./setAccessToken"
import { apiUrl } from './../constants/apiUrl'

function CheckLogged() {
    const dispatch = useDispatch()
    useEffect(async () => {
        if (localStorage.getItem('e-laptop')) {
            setAuthToken(localStorage.getItem('e-laptop'))
            try {
                const response = await axios.post(`${apiUrl}/user`)
                if (response.data.success) {
                    dispatch(LOGIN_USER({
                        phone: response.data.user.phone
                    }))
                }
                else {
                    localStorage.removeItem('e-laptop')
                }
            } catch (error) {
                localStorage.removeItem('e-laptop')
                dispatch(LOGOUT_USER())
            }

        }
    })
}
export default CheckLogged
    // const dispatch = useDispatch()
    // let result = false
    // useEffect(async () => {
    //     if (localStorage['e-laptop'])
    //         setAuthToken(localStorage['e-laptop'])

    //     // useEffect(async () => {
    //     const res = await axios.post(`${apiUrl}/user`)
    //     if (res.data.success) {
    //         dispatch(LOGIN_USER({
    //             phone: res.data.user.phone
    //         }))
    //         // console.log(res.data)
    //         return result = true
    //     }
    //     else {
    //         dispatch(LOGOUT_USER())
    //         return result = true
    //     }
    //     // },[])
    // }, [])
    // return result

