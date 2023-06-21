import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from "../actions/userActions"
import Loading from "../components/Loading"
import Success from "../components/Success"
import Error from "../components/Error"


export default function Registerscreen() {

    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [cpassword, setcpassword] = useState('')
    const registerstate = useSelector(state => state.registerUserReducer)
    const { error, loading, success } = registerstate


    const dispatch = useDispatch()
    function register() {

        if (password !== cpassword) {

            alert("passwords not matched")

        } else {

            const user = {

                name,
                email,
                password

            }
            console.log(user)
            dispatch(registerUser(user))
        }
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
                <h2 className="text-center m-4" style={{ fontSize: '35px' }}>Register</h2>
                    <br />
                    
                    {loading && <Loading />}
                    {success && <Success success='You have Registered Successfully' />}
                    {error && (<Error error='Email already registered' />)}
                    <div className="d-flex">
                        <div style={{ width: "50%" }}>
                            <input

                                required
                                type="text"
                                placeholder="Name"
                                className="form-control"
                                value={name}
                                onChange={(e) => { setname(e.target.value) }}

                            />
                            <input

                                required
                                type="email"
                                placeholder="Email"
                                className="form-control"
                                value={email}
                                onChange={(e) => { setemail(e.target.value) }}

                            />
                            <input

                                required
                                type="password"
                                placeholder="Password"
                                className="form-control"
                                value={password}
                                onChange={(e) => { setpassword(e.target.value) }}

                            />
                            <input

                                required
                                type="password"
                                placeholder="Confirm password"
                                className="form-control"
                                value={cpassword}
                                onChange={(e) => { setcpassword(e.target.value) }}

                            />

                            <button onClick={register} className="btn mt-3 mb-3" >REGISTER</button>  <br />
                            <h9 style={{ fontSize: '15px' }}>Already have an Account ?</h9>
                            <br />
                             <h9 ><a style={{ color: 'black' }} className='text-start' href="/login">Click Here To Login</a></h9>   
                                <br />
                                <br />
                            {/* <a style={{ color: 'black' }} className='text-start' href="/register">Click Here To Register</a> */}
                        </div>
                        <div className="justify-content-end" style={{ width: "50%" }}>
                            <img src="https://img.freepik.com/free-vector/sign-concept-illustration_114360-125.jpg?w=740&t=st=1680948675~exp=1680949275~hmac=3c1f66d9b208fd0bc062f688dada62977d3969a88147233352630033929b4d7a" alt="Login" className="img-fluid mb-3" style={{ width: "100%", height: "auto" }} />
                        </div>
                    </div>
                </div>
            </div>
            <br />
            {/* <div className='row justify-content-center'>
                <div className="col-md-5 mt-5 text-start shadow p-4 mb-7 bg-white rounded">
              
                    {loading && <Loading />}
                    {success && <Success success='User Registered Successfully' />}
                    {error && (<Error error='Email already registered' />)}


                    <h2 className="text-center m-4" style={{ fontSize: '35px' }}>Register</h2>
                    <div>
                        
                      

                        <input

                            required
                            type="text"
                            placeholder="name"
                            className="form-control"
                            value={name}
                            onChange={(e) => { setname(e.target.value) }}

                        />
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
                            value={password}
                            onChange={(e) => { setpassword(e.target.value) }}

                        />
                        <input

                            required
                            type="password"
                            placeholder="confirm password"
                            className="form-control"
                            value={cpassword}
                            onChange={(e) => { setcpassword(e.target.value) }}

                        />
                        <button onClick={register} className="btn mt-3 mb-3" >REGISTER</button>  <br />
                        <h9 className="text-center m-4" style={{ fontSize: '15px' }}>Already have an Account ?</h9>
                            <br />
                             <h9 className="text-center m-4"><a style={{ color: 'black' }} className='text-start' href="/login">Click Here To Login</a></h9>   
                                <br />
                                <br />
                       

                        <img src="https://img.freepik.com/free-vector/sign-concept-illustration_114360-125.jpg?w=740&t=st=1680948675~exp=1680949275~hmac=3c1f66d9b208fd0bc062f688dada62977d3969a88147233352630033929b4d7a" alt="Right Side Image" style={{ float: 'right', maxWidth: '40%', height: 'auto' }} />

                        <br />
                    </div>
                </div>

            </div> */}

        </div>
    )
}
