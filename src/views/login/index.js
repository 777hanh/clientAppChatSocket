import React from 'react';
import Form from 'react-bootstrap/Form'
import axios from 'axios';
import { Link, useNavigate, } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { apiUrl } from '../../constants/apiUrl'
import { LOGIN_USER } from '../../redux/action/authAction'
import setAuthToken from '../../utils/setAccessToken'
import AlertMessage from '../../components/layout/alertMessage';
// import checkLogged from '../../utils/checkLogged'

const Login = () => {

    let navigate = useNavigate()
    const dispatch = useDispatch()
    const check = useSelector(state => state.user.phone)
    useEffect(() => {
        if (check)
            navigate('/home')
    }, [check])


    const [loginForm, setLoginForm] = useState({
        phone: '',
        password: '',
    })

    const [alert, setAlert] = useState(null)

    const { phone, password } = loginForm
    const onChangeLoginForm = event => setLoginForm({
        ...loginForm,
        [event.target.name]: event.target.value
    })

    // //login
    const loginEvent = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${apiUrl}/user/login`, loginForm)
            if (response.data.success) {
                localStorage.setItem('e-laptop', response.data.accessToken)
                setAuthToken(localStorage['e-laptop'])
                try {
                    const req = await axios.post(`${apiUrl}/user`)
                    dispatch(LOGIN_USER({
                        phone: req.data.user.phone
                    }))
                    navigate('/mess')
                } catch (error) {
                    console.log('Loi token')
                }
            }
            else {
                setAlert({ type: 'danger', message: response.data.message })
            }
        }
        catch (err) {
            console.log(err)
        }
    }


    let body = (
        <>
            <Form className="mt-4" onSubmit={loginEvent}>

                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        id="phone"
                        placeholder="Enter Phone Number"
                        name="phone"
                        value={phone}
                        onChange={onChangeLoginForm}
                    />
                </div>
                <div className="form-group mt-4">
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={onChangeLoginForm}
                    />
                </div>
                <AlertMessage info={alert} />
                <button type="submit" className="btn btn-primary mt-4">Login</button>
            </Form>
            <p className="mt-4">You don't have Account?
                <Link to="/register" className="link-form-landing"> Register </Link>
                now
            </p>
        </>
    )
    return (
        <React.Fragment>

            <div className="landing">
                <div className="dark-overlay">
                    <div className="landing-inner">
                        <h1 className="nameWeb" onClick={()=> navigate('/home')}>Chat App</h1>
                        {body}
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}

export default Login