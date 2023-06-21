import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, registerUser } from "../actions/userActions"
import Error from "../components/Error";
import Loading from "../components/Loading";
import { setNotification } from "../actions/notificationAction";


export default function Loginscreen() {

    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const loginstate = useSelector(state => state.loginUserReducer)
    const { loading, error } = loginstate
    const dispatch = useDispatch()


    useEffect(() => {

        if (localStorage.getItem('currentUser')) {
            window.location.href = '/'
        }
    })


    function login() {

        const user = { email, password }
        dispatch(loginUser(user), setNotification())
        dispatch(setNotification())

    }


    return (

        <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className='row justify-content-center'>
                <div className="col-md-5 mt-5 text-start shadow p-4 mb-7 bg-white rounded">
                    <h2 className="text-center m-4" style={{ fontSize: '35px' }}>Login</h2>
                    <br />
                    
                    {loading && (<Loading />)}
                    {error && (<Error error='Invalid Credentials' />)}

                    <div className="d-flex">
                        <div style={{ width: "50%" }}>
                            <input
                                required
                                type="email"
                                placeholder="email"
                                className="form-control mb-3"
                                value={email}
                                onChange={(e) => { setemail(e.target.value) }}
                            />
                            

                            <input
                                required
                                type="password"
                                placeholder="password"
                                className="form-control mb-3"
                                value={password}
                                onChange={(e) => { setpassword(e.target.value) }}
                            />
                    


                            <button onClick={login} className="btn mt-3 mb-3 " >LOGIN</button>
                            <br />
                            <h9 className="text-center m-4" style={{ fontSize: '15px' }}>Don't You have an Account ?</h9>
                            <br />
                             <h9 className="text-center m-4"><a style={{ color: 'black' }} className='text-start' href="/register">         Click Here To Register</a></h9>   
                                <br />
                                <br />

                                {/* <a style={{ color: 'black' }} className='text-start' href="/admin/login"> Admin Login</a> */}
                            {/* <a style={{ color: 'black' }} className='text-start' href="/register">Click Here To Register</a> */}
                        </div>
                        <div className="justify-content-end" style={{ width: "50%" }}>
                            <img src="https://img.freepik.com/free-vector/tablet-login-concept-illustration_114360-7863.jpg?w=740&t=st=1680935956~exp=1680936556~hmac=c2ce0fcc5c0ca2b0b06fa5755856faaec118823bf288248a9f689aa5bd0fd5ea" alt="Login" className="img-fluid mb-3" style={{ width: "100%", height: "auto" }} />
                        </div>
                    </div>
                </div>
            </div>
            <br />


            

        </div>
    )
}
