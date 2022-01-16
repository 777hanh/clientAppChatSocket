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



const Register = () => {

    let navigate = useNavigate()
    const dispatch = useDispatch()

    
    let check = useSelector(state => state.user.phone)
    useEffect(() => {
        if (check) {
            navigate('/home')
        }
        else {
            console.log(check)
        }
    }, [check])


    const [registerForm, setRegisterForm] = useState({
        phone: '',
        password: '',
        confirmPassword: '',
        fullName: '',
    })

    const [alert, setAlert] = useState(null)

    const { phone, password, confirmPassword, fullName } = registerForm

    const onChangRegisterForm = event => setRegisterForm({
        ...registerForm,
        [event.target.name]: event.target.value
    })
    const onChangePassword = event => {
        setRegisterForm({
            ...registerForm,
            password: event.target.value
        })
        if (event.target.value === confirmPassword) {
            setAlert(null)
        }
        else {
            setAlert({ type: 'danger', message: 'Password and Confirm Password is not equal' })
            // console.log('Password and Confirm Password is not equal')
        }
    }
    const onChangeConfirmPass = event => {
        setRegisterForm({
            ...registerForm,
            confirmPassword: event.target.value
        })
        if (event.target.value === password) {
            setAlert(null)
        }
        else {
            setAlert({ type: 'danger', message: 'Password and Confirm Password is not equal' })
            // console.log('Password and Confirm Password is not equal')
        }
    }

    //Register
    const registerEvent = async (e) => {
        e.preventDefault()
        try {
            // console.log(registerForm)   
            const response = await axios.post(`${apiUrl}/user/register`, registerForm)
            // return console.log(response.data)
            if (response.data.success) {
                localStorage.setItem('e-laptop', response.data.accessToken)
                setAuthToken(localStorage['e-laptop'])
                try {
                    const req = await axios.post(`${apiUrl}/user`)
                    dispatch(LOGIN_USER({
                        phone: req.data.user.phone
                    }))
                    // console.log(req.data)
                    navigate('/home')
                } catch (error) {
                    console.log('Loi token')
                }
                // navigate('/dashboard')
            }
            else {
                setAlert({ type: 'danger', message: response.data.message })
                // console.log(response.data.message)
            }
        }
        catch (err) {
            console.log(err)
        }
    }


    let body = (
        <>
            <Form className="mt-4" onSubmit={registerEvent}>

                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        placeholder="Enter your name"
                        name="fullName"
                        value={fullName}
                        onChange={onChangRegisterForm}
                    />
                </div>
                <div className="form-group mt-4">
                    <input
                        type="text"
                        className="form-control"
                        id="phone"
                        placeholder="Enter Phone Number"
                        name="phone"
                        value={phone}
                        onChange={onChangRegisterForm}
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
                        onChange={onChangePassword}
                    />
                </div>
                <div className="form-group mt-4">
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={onChangeConfirmPass}
                    />
                </div>

                <button type="submit" className="btn btn-primary mt-4">Register</button>
            </Form>
            <p className="mt-4">You already have Account?
                <Link to="/login" className="link-form-landing"> Login </Link>
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
                        <AlertMessage info={alert} />
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}

export default Register