import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { loginDriver } from "../../actions/driverActions";
import Error from "../../components/Error";
import Loading from "../../components/Loading";



export default function Driverloginscreen() {


    const [email, setemail] = useState('')
    const [Password, setpassword] = useState('')
    const driverloginstate = useSelector(state => state.driverloginReducer)
    const { loading, error } = driverloginstate
    const dispatch = useDispatch()


    useEffect(() => {

        if (localStorage.getItem('currentDriver')) {
            window.location.href = '/driver'
        }
    })


    function login() {

        const driver = { email,Password }
        dispatch(loginDriver(driver))
        
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
                <div className="col-md-5 mt-5 text-start shadow p-3 mb-5 bg-white rounded">
                    <h2 className="text-center m-4" style={{ fontSize: '35px' }}>Rider Login</h2>

                    {loading && (<Loading />)}
                    {error && (<Error error='Invalid Credentials' />)}


                    <div>

                        <input

                            required
                            type="email"
                            placeholder="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => { setemail(e.target.value) }}

                        />
                        <input

                            required
                            type="password"
                            placeholder="password"
                            className="form-control"
                            value={Password}
                            onChange={(e) => { setpassword(e.target.value) }}

                        />


                        <button onClick={login} className="btn mt-3 mb-3 " >LOGIN</button>
                        <br />
                        
                    </div>

                </div>

            </div>
            <br />

        </div>
    )
}