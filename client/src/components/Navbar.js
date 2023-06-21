import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from "react";
import { logoutUser } from '../actions/userActions';
import { logoutAdmin } from '../actions/adminActions';
import { loginDriver, logoutDriver } from '../actions/driverActions';




var NotificationArray = new Array();
let userId;
let tot;
let notificationcount;
let publiccount = 0

var NotificationType
var NotificationHeader
var NotificationBody
var NotificationButton
var NotificationDate

let notificationOnecount = 0;
let notificationTwocount = 0;
let notificationThreecount = 0;
let notificationFourcount = 0;




export default function Navbar() {

    const cartState = useSelector(state => state.cartReducer)
    const userstate = useSelector(state => state.loginUserReducer)
    const { currentUser } = userstate
    const [currentusers, setUsers] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const adminloginstate = useSelector(state => state.adminloginReducer)
    const { currentAdmin } = adminloginstate
    const driverstate = useSelector(state => state.driverloginReducer)
    const { currentDriver } = driverstate
    const dispatch = useDispatch()









    useEffect(() => {




        function getPublicNotifications() {

            axios.get('/api/notifications/getnotifications').then((res) => {


                setNotifications(res.data);





                NotificationType = res.data[0].notificationType
                NotificationHeader = res.data[0].notificationHeader
                NotificationBody = res.data[0].notificationBody
                NotificationButton = res.data[0].notificationButton
                NotificationDate = res.data[0].notificationDate








            }).catch((error) => {
                console.log(error)


            })
        }
        getPublicNotifications();

    }, [])


    if (NotificationHeader === 'empty') {
        publiccount = 0;
    } else {
        publiccount = 1;
    }



    function getCurrentNotifications(userId) {



        axios.get(`/api/users/getcurrentuser/${userId}`).then((res) => {
            setUsers(res.data)


            NotificationArray = res.data

            if (NotificationArray.notificationOneHeader === 'empty') {
                notificationOnecount = 0;
            } else {
                notificationOnecount = 1;
            }

            if (NotificationArray.notificationTwoHeader === 'empty') {
                notificationTwocount = 0;
            } else {
                notificationTwocount = 1;
            }

            if (NotificationArray.notificationThreeHeader === 'empty') {
                notificationThreecount = 0;
            } else {
                notificationThreecount = 1;
            }

            if (NotificationArray.notificationFourHeader === 'empty') {
                notificationFourcount = 0;
            } else {
                notificationFourcount = 1;
            }


            console.log(notificationTwocount)

            tot = notificationOnecount + notificationTwocount + notificationThreecount + notificationFourcount + publiccount;
            console.log("Notification count :", tot)


        }).catch((error) => {
            console.log(error)


        })
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg shadow-lg p-3 mb-5 navbar-dark bg-black  fixed-top">

                <div className="container-fluid">
                    <a class="navbar-brand" href="/">
                        <img src="https://static.wixstatic.com/media/618c8c_698b18719d9142ca9ec080803802ceb4~mv2.png" alt="" width="78" height="45" class="d-inline-block align-text-top" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" ></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">

                            <li className="nav-item mt-1">
                                <a className="nav-link " href="/">
                                    <i class="fa-solid fa-pizza-slice fa-beat" style={{ fontSize: '15px', color: 'white' }} ></i><> </><h16>Pizzas</h16>
                                </a>
                            </li>
                            <li className="nav-item mt-1">
                                <a className="nav-link " href="/beverages">
                                    <i class="fas fa-cocktail fa-beat" style={{ fontSize: '18px', color: 'white', paddingLeft: "0px" }} ></i><> </><h16 style={{ paddingRight: "0px" }}>Beverages</h16>
                                </a>
                            </li>

                            {currentUser ? (

                                <div className="dropdown m-2">


                                    <a style={{ color: 'white' }} className="dropdown-toggles" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <h15>Hi, {currentUser.name}</h15> <img src='https://static.wixstatic.com/media/618c8c_5f176f88792f40609c74309e7f6f2eb2~mv2.png' style={{ height: '30px', height: '30px' }} />
                                    </a>

                                    <ul class="dropdown-menu text-center" style={{ minWidth: '0rem ' }} aria-labelledby="dropdownMenuButton1">

                                        <li><a className="dropdown-item" href="/profile"><h9>Profile</h9></a></li>
                                        <li><a className="dropdown-item" href="/orders"><h9>Orders</h9></a></li>
                                        <li><a className="dropdown-item" href="#" onClick={() => { dispatch(logoutUser()) }}><li><h9>Logout</h9></li></a></li>
                                    </ul>
                                </div>

                            ) : (

                                <li className="nav-item mt-1">
                                    <a className="nav-link" href="/login">
                                        <h15>Login</h15>
                                    </a>
                                </li>
                            ) &&
                                currentAdmin ? (


                                <div className="dropdown m-2">

                                    <a style={{ color: 'white', width: '120px' }} className="dropdown-toggles" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <h15>Hi, {currentAdmin.AdminName}</h15> <img src='https://static.wixstatic.com/media/618c8c_5f176f88792f40609c74309e7f6f2eb2~mv2.png' style={{ height: '30px', height: '30px' }} />
                                    </a>



                                    <ul class="dropdown-menu text-center" style={{ minWidth: '7rem ' }} aria-labelledby="dropdownMenuButton1">

                                        <li><a className="dropdown-item" href="/admin"><h9>Profile</h9></a></li>

                                        <li><a className="dropdown-item" href="#" onClick={() => { dispatch(logoutAdmin()) }}><li><h9>Logout</h9></li></a></li>
                                    </ul>

                                </div>
                            ) : (

                                <li className="nav-item mt-1">
                                    <a className="nav-link " href="/login">
                                        <h15>Login</h15>
                                    </a>
                                </li>
                            )&& currentDriver ? (


                                <div className="dropdown m-2">

                                    <a style={{ color: 'white', width: '120px' }} className="dropdown-toggles" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <h15>Hi, {currentDriver.name}</h15> <img src='https://static.wixstatic.com/media/618c8c_5f176f88792f40609c74309e7f6f2eb2~mv2.png' style={{ height: '30px', height: '30px' }} />
                                    </a>



                                    <ul class="dropdown-menu text-center" style={{ minWidth: '7rem ' }} aria-labelledby="dropdownMenuButton1">

                                        <li><a className="dropdown-item" href="/driver"><h9>Profile</h9></a></li>

                                        <li><a className="dropdown-item" href="#" onClick={() => { dispatch(logoutDriver()) }}><li><h9>Logout</h9></li></a></li>
                                    </ul>

                                </div>
                            ) : (

                                <li className="nav-item mt-1">
                                    <a className="nav-link " href="/login">
                                        <h15>Login</h15>
                                    </a>
                                </li>
                            )}



                            {/* {currentUser ? (
                                <li className="nav-item">
                                    <a className="nav-link" href="/feedback">
                                        Feedback
                                    </a>
                                </li>

                            ) : (


                                <li className="nav-item">
                                    <a className="nav-link" href="/feedback">
                                        Feedback
                                    </a>
                                </li>

                            ) && currentAdmin ? (
                                <li className="nav-item">
                                </li>) : (

                                <li className="nav-item">
                                    <a className="nav-link" href="/feedback">
                                        Feedback
                                    </a>
                                </li>

                            )} */}



                            {currentUser ? (
                                <div class="dropdown">
                                    <li className="nav-item p-1">
                                        <a className="nav-link" >
                                            <i onClick={() => { getCurrentNotifications(userId = currentUser._id) }} className="fas fa-bell dropdown-toggles" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: 'white', fontSize: '17px' }}></i>
                                            <span class=" badge-notification " style={{ fontSize: '11px', color: 'white', backgroundColor: 'red' }} ></span><sup><i class="fa fa-circle" aria-hidden="true" style={{ fontSize: '9px', color: 'red' }} ></i></sup>



                                            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-lg-star" style={{ minWidth: '17rem ' }} aria-labelledby="dropdownMenuLink">

                                                <span class="badge rounded-pill m-3" style={{ fontSize: '11px', color: 'white', backgroundColor: 'red' }} >{tot}<> Notification </><i class="fa fas fa-bell " style={{ fontSize: '8px', color: 'white' }} ></i></span>




                                                {NotificationArray.notificationOneHeader === 'empty' && NotificationArray.notificationTwoHeader === 'empty' && NotificationArray.notificationThreeHeader === 'empty' && NotificationArray.notificationFourHeader === 'empty' && NotificationHeader === 'empty' ? (


                                                    <li>

                                                        <div class="row justify-content-center p-0 m-1">



                                                            <p class="mb-2 text-muted fst-italic" style={{ fontSize: '13px' }}>You're All Caught Up...</p>

                                                            {/* <img src="https://static.toiimg.com/thumb/56933159.cms?imgsize=686279&width=800&height=800" alt="" width="200" height="120" style={{ borderRadius: '15px' }} /> */}




                                                        </div>

                                                    </li>

                                                ) : (

                                                    <></>

                                                )}


                                                {NotificationHeader === 'empty' ? (
                                                    <></>

                                                ) : (

                                                    <li>

                                                        <div class="row justify-content-center p-0 m-1">
                                                            <a href='/profile'><div><span class="btn badge bg-success" style={{ fontSize: '10px', position: 'absolute', right: '25px' }}>View</span></div></a>
                                                            <p class=" mb-2 text-muted" style={{ fontSize: '9px' }}>{NotificationDate} <i class="fa fas fa-bell " style={{ fontSize: '8px', color: 'black' }} ></i></p>


                                                            <p class="mb-2 " style={{ fontSize: '13px' }}> {NotificationBody}</p>

                                                            {/* <img src="https://static.toiimg.com/thumb/56933159.cms?imgsize=686279&width=800&height=800" alt="" width="200" height="120" style={{ borderRadius: '15px' }} /> */}




                                                        </div>

                                                    </li>

                                                )}



                                                {NotificationArray.notificationOneHeader === 'empty' ? (
                                                    <></>

                                                ) : (

                                                    <li>

                                                        <div class="row justify-content-center p-0 m-1">
                                                            <a href='/profile'><div><span class="btn badge bg-success" style={{ fontSize: '10px', position: 'absolute', right: '25px' }}>View</span></div></a>
                                                            <p class=" mb-2 text-muted" style={{ fontSize: '9px' }}>{NotificationArray.notificationOneDate}</p>


                                                            <p class="mb-2 " style={{ fontSize: '13px' }}>{NotificationArray.notificationOneBody}</p>

                                                            {/* <img src="https://static.toiimg.com/thumb/56933159.cms?imgsize=686279&width=800&height=800" alt="" width="200" height="120" style={{ borderRadius: '15px' }} /> */}



                                                        </div>

                                                    </li>

                                                )}


                                                {NotificationArray.notificationTwoHeader === 'empty' ? (
                                                    <></>

                                                ) : (

                                                    <li>

                                                        <div class="row justify-content-center p-0 m-1">
                                                            <a href='/profile'><div><span class="btn badge bg-success" style={{ fontSize: '10px', position: 'absolute', right: '25px' }}>View</span></div></a>
                                                            <p class=" mb-2 text-muted" style={{ fontSize: '9px' }}>{NotificationArray.notificationTwoDate}</p>


                                                            <p class="mb-2 " style={{ fontSize: '13px' }}> {NotificationArray.notificationTwoBody}</p>

                                                            {/* <img src="https://static.toiimg.com/thumb/56933159.cms?imgsize=686279&width=800&height=800" alt="" width="200" height="120" style={{ borderRadius: '15px' }} /> */}




                                                        </div>

                                                    </li>

                                                )}


                                                {NotificationArray.notificationThreeHeader === 'empty' ? (
                                                    <></>

                                                ) : (

                                                    <li>

                                                        <div class="row justify-content-center p-0 m-1">
                                                            <a href='/profile'><div><span class="btn badge bg-success" style={{ fontSize: '10px', position: 'absolute', right: '25px' }}>View</span></div></a>
                                                            <p class=" mb-2 text-muted" style={{ fontSize: '9px' }}>{NotificationArray.notificationThreeDate}</p>


                                                            <p class="mb-2 " style={{ fontSize: '13px' }}> {NotificationArray.notificationThreeBody}</p>

                                                            {/* <img src="https://static.toiimg.com/thumb/56933159.cms?imgsize=686279&width=800&height=800" alt="" width="200" height="120" style={{ borderRadius: '15px' }} /> */}




                                                        </div>

                                                    </li>

                                                )}

                                                {NotificationArray.notificationFourHeader === 'empty' ? (
                                                    <></>

                                                ) : (

                                                    <li>

                                                        <div class="row justify-content-center p-0 m-1">
                                                            <a href='/profile'><div><span class="btn badge bg-success" style={{ fontSize: '10px', position: 'absolute', right: '25px' }}>View</span></div></a>
                                                            <p class=" mb-2 text-muted" style={{ fontSize: '9px' }}>{NotificationArray.notificationFourDate}</p>


                                                            <p class="mb-2 " style={{ fontSize: '13px' }}> {NotificationArray.notificationFourBody}</p>

                                                            {/* <img src="https://static.toiimg.com/thumb/56933159.cms?imgsize=686279&width=800&height=800" alt="" width="200" height="120" style={{ borderRadius: '15px' }} /> */}




                                                        </div>

                                                    </li>

                                                )}







                                            </ul>

                                        </a>


                                    </li>




                                </div>

                            ) : (


                                <li className="nav-item">
                                </li>

                            ) && currentAdmin ? (

                                <li className="nav-item">
                                </li>) : (

                                <li className="nav-item">
                                </li>

                            )}




                            <li className="nav-item mt-1">
                                <a className="nav-link" href="/cart">

                                    <i class="fa fa-shopping-cart" style={{ color: 'white', fontSize: '96%' }} aria-hidden="true"></i>

                                    <span style={{ color: 'white' }}> {cartState.cartItems.length}</span>
                                </a>
                            </li>


                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
