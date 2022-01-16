import { Link } from 'react-router-dom'

// import logoutIcon from './../../assets/logout.svg'
import { useDispatch, useSelector } from 'react-redux'
import { LOGOUT_USER } from './../../redux/action/authAction'
import { useNavigate } from 'react-router-dom'

// import store from '../../redux/store'
// import axios from 'axios'

const NavbarMenu = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    // const abc = useSelector(state => state)
    const logoutEvent = () => {
        localStorage.removeItem('state')
        localStorage.removeItem('e-laptop')
        // console.log(abc)
        dispatch(LOGOUT_USER())
        // const a = store.getState().user
        // console.log(a)
        // useEffect(()=>{
        //     console.log(a)
        // })
        navigate('/login')
    }
    const refreshEvent = () => {
        navigate('/')
    }

    const user = useSelector(state => state.user.phone)
    // console.log(user)


    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    {/* <img src={logo} alt='logo' width='32' height='32' /> */}
                    <span className="nameWeb navbar-brand ml-1" style={{ color: '#0dcaf0' }} onClick={refreshEvent}>PrevLife</span>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarColor01"
                        aria-controls="navbarColor01"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarColor01">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link to="/home" className="nav-link active" >Home</Link>
                                <span className="visually-hidden">(current)</span>
                            </li>
                            <li className="navbar-nav me-auto">
                                <Link to="/mess" className="nav-link active" >Message</Link>
                                <span className="visually-hidden">(current)</span>
                            </li>

                        </ul>
                        <span className="navbar-brand nav-item" disabled>{user ? 'Phone: ' + user : 'anonymus'}</span>
                        <button className="btn btn-secondary my-2 my-sm-0 nav-item" onClick={logoutEvent} >
                            {/* {user ? <img src={logoutIcon} alt="logout" width='24' height='16' /> : 'Đăng nhập'} */}
                            {user ? 'Đăng xuất' : 'Đăng nhập'}

                        </button>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavbarMenu