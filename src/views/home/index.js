import React from 'react';
import Spinner from "../../components/layout/spin"
import NavBarMenu from '../../components/layout/navMenu'



const Login = () => {

    let body = (
        <>
            <Spinner />
        </>
    )


    return (
        <React.Fragment>

            <div className="home">
                <NavBarMenu />
                <h1>Home page</h1>
                {body}
            </div>

        </React.Fragment>
    )
}

export default Login