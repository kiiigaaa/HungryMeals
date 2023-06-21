import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    MDBProgress,
    MDBProgressBar,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem
} from 'mdb-react-ui-kit';
import axios from 'axios'
import { updateNotificationOneAction } from "../../actions/userActions";
import { updateNotificationTwoAction } from "../../actions/userActions";
import { updateNotificationThreeAction } from "../../actions/userActions";
import { updateNotificationFourAction } from "../../actions/userActions";




var isVerified;
var notificationsArray = new Array();
var publicnotificationsArray = new Array();


export default function Profilescreen() {


    const dispatch = useDispatch()

    const userstate = useSelector(state => state.loginUserReducer)
    const { currentUser } = userstate
    const [notifications, setNotifications] = useState([]);
    const [currentusers, setUsers] = useState([]);


    useEffect(() => {




        function getCurrentUser() {

            axios.get(`/api/users/getcurrentuser/${currentUser._id}`).then((res) => {


                setUsers(res.data);


                isVerified = res.data.isVerified
                notificationsArray = res.data



            }).catch((error) => {
                console.log(error)


            })
        }
        getCurrentUser();

    }, [])



    useEffect(() => {




        function getPublicNotifications() {

            axios.get('/api/notifications/getnotifications').then((res) => {


                setNotifications(res.data);


                publicnotificationsArray = res.data[0]



            }).catch((error) => {
                console.log(error)


            })
        }
        getPublicNotifications();

    }, [])



    const [notificationOneImage, updatenotiOneImage] = useState('')
    const [notificationOneHeader, updatenotiOneHeader] = useState('')
    const [notificationOneBody, updatenotiOneBody] = useState('')
    const [notificationOneDate, updatenotiOneDate] = useState('')

    function updateNotificationOne(userId, val) {


        console.log(userId, val)

        const updateNotificationOne = {

            notificationOneImage,
            notificationOneHeader: val,
            notificationOneBody,
            notificationOneDate

        }

        console.log(updateNotificationOne, userId)
        dispatch(updateNotificationOneAction(updateNotificationOne, userId))



    }

    const [notificationTwoImage, updatenotiTwoImage] = useState('')
    const [notificationTwoHeader, updatenotiTwoHeader] = useState('')
    const [notificationTwoBody, updatenotiTwoBody] = useState('')
    const [notificationTwoDate, updatenotiTwoDate] = useState('')

    function updateNotificationTwo(userId, val) {


        console.log(userId, val)

        const updateNotificationTwo = {

            notificationTwoImage,
            notificationTwoHeader: val,
            notificationTwoBody,
            notificationTwoDate

        }

        console.log(updateNotificationTwo, userId)
        dispatch(updateNotificationTwoAction(updateNotificationTwo, userId))

        currentUser.notificationTwoHeader = 'empty';
        localStorage.setItem('currentUser', JSON.stringify(currentUser))




    }

    const [notificationThreeImage, updatenotiThreeImage] = useState('')
    const [notificationThreeHeader, updatenotiThreeHeader] = useState('')
    const [notificationThreeBody, updatenotiThreeBody] = useState('')
    const [notificationThreeDate, updatenotiThreeDate] = useState('')

    function updateNotificationThree(userId, val) {


        console.log(userId, val)

        const updateNotificationThree = {

            notificationThreeImage,
            notificationThreeHeader: val,
            notificationThreeBody,
            notificationThreeDate

        }

        console.log(updateNotificationThree, userId)
        dispatch(updateNotificationThreeAction(updateNotificationThree, userId))

        currentUser.notificationThreeHeader = 'empty';
        localStorage.setItem('currentUser', JSON.stringify(currentUser))




    }

    const [notificationFourImage, updatenotiFourImage] = useState('')
    const [notificationFourHeader, updatenotiFourHeader] = useState('')
    const [notificationFourBody, updatenotiFourBody] = useState('')
    const [notificationFourDate, updatenotiFourDate] = useState('')

    function updateNotificationFour(userId, val) {


        console.log(userId, val)

        const updateNotificationFour = {

            notificationFourImage,
            notificationFourHeader: val,
            notificationFourBody,
            notificationFourDate

        }

        console.log(updateNotificationFour, userId)
        dispatch(updateNotificationFourAction(updateNotificationFour, userId))

        currentUser.notificationFourHeader = 'empty';
        localStorage.setItem('currentUser', JSON.stringify(currentUser))




    }





    return (

        <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            <div className='row justify-content-center'>


                <div className='col-md-8 m-2 p-1 shadow p-3 mb-5 bg-white' style={{ color: 'black', borderRadius: '15px' }}>
                    <section>
                        <MDBContainer className="py-5">
                            <MDBRow>
                                <MDBCol>
                                    <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                                        <MDBBreadcrumbItem>
                                            <a href='#' style={{ textDecoration: 'none' }}>Home</a>
                                        </MDBBreadcrumbItem>
                                        <MDBBreadcrumbItem active>Profile</MDBBreadcrumbItem>
                                    </MDBBreadcrumb>
                                </MDBCol>
                            </MDBRow>

                            <MDBRow>
                                <MDBCol lg="4">
                                    <MDBCard className="mb-4 shadow">
                                        <MDBCardBody className="text-center">
                                            <MDBCardImage
                                                src="https://static.wixstatic.com/media/618c8c_5f176f88792f40609c74309e7f6f2eb2~mv2.png"
                                                alt="avatar"
                                                className="rounded-circle"
                                                style={{ width: '150px' }}
                                                fluid />
                                            <br />
                                            <br />
                                            <h4 className="mb-1">{currentUser.name}{isVerified ? (

                                                <i class="fa fa-check-circle p-1" title="Verified Customer" style={{ fontSize: '18px', color: '#00b9ff' }} aria-hidden="true"></i>

                                            ) : (


                                                <></>

                                            )}</h4>
                                            <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                                            <div className="d-flex justify-content-center mb-2">
                                                {/* <MDBBtn>Follow</MDBBtn>
                      <MDBBtn outline className="ms-1">Message</MDBBtn> */}
                                            </div>
                                        </MDBCardBody>
                                    </MDBCard>

                                    <MDBCard className="mb-4 mb-lg-0">
                                        <MDBCardBody className="p-0">
                                            <MDBListGroup flush className="rounded-3">
                                                <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                                    <MDBIcon fas icon="globe fa-lg text-warning" />
                                                    <a href='/profile/details' style={{ textDecoration: 'none', color: 'black' }}>Home</a>
                                                </MDBListGroupItem>
                                                <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                                    <MDBIcon fab icon="github fa-lg" style={{ color: '#333333' }} />
                                                    <MDBCardText>mdbootstrap</MDBCardText>
                                                </MDBListGroupItem>
                                                <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                                    <MDBIcon fab icon="twitter fa-lg" style={{ color: '#55acee' }} />
                                                    <MDBCardText>@mdbootstrap</MDBCardText>
                                                </MDBListGroupItem>
                                                <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                                    <MDBIcon fab icon="instagram fa-lg" style={{ color: '#ac2bac' }} />
                                                    <MDBCardText>mdbootstrap</MDBCardText>
                                                </MDBListGroupItem>
                                                <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                                    <MDBIcon fab icon="facebook fa-lg" style={{ color: '#3b5998' }} />
                                                    <MDBCardText>mdbootstrap</MDBCardText>
                                                </MDBListGroupItem>
                                            </MDBListGroup>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                                <MDBCol lg="8">
                                    {/* <MDBCard className="mb-4">
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Name</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{currentUser.name}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Email</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{currentUser.email}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Phone</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">(097) 234-5678</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Mobile</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">(098) 765-4321</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Address</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">Bay Area, San Francisco, CA</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard> */}

                                    <MDBRow>
                                        <MDBCol lg="5">
                                            <MDBCard className="mb-4 shadow">
                                                <MDBCardBody>
                                                    <h5 className="p-2">Notifications</h5>

                                                    {notificationsArray.notificationOneHeader === 'empty' && notificationsArray.notificationTwoHeader === 'empty' && notificationsArray.notificationThreeHeader === 'empty' && notificationsArray.notificationFourHeader === 'empty' && publicnotificationsArray.notificationHeader === 'empty' ? (




                                                        <div class="row justify-content-center p-0 m-1">



                                                            <p class="mb-2 text-muted fst-italic" style={{ fontSize: '13px' }}>You're All Caught Up...</p>

                                                            {/* <img src="https://static.toiimg.com/thumb/56933159.cms?imgsize=686279&width=800&height=800" alt="" width="200" height="120" style={{ borderRadius: '15px' }} /> */}




                                                        </div>




                                                    ) : (

                                                        <></>

                                                    )}


                                                    {publicnotificationsArray.notificationHeader === 'empty' ? (
                                                        <></>

                                                    ) : (



                                                        <div class="row justify-content-center p-0 m-1 text-start">
                                                            {/* <button  type="button" class="btn-close p-0" style={{fontSize: '10px', position: 'absolute', right: '15px' }} aria-label="Close"></button> */}
                                                            <div><span class="btn badge bg-success" data-bs-toggle="modal" data-bs-target="#staticBackdroPubnoti" style={{ fontSize: '10px', position: 'absolute', right: '30px' }}>View</span></div>
                                                            {/* <div><span class="badge bg-success" style={{ fontSize: '10px', position: 'absolute', right: '30px' }}>Delete</span></div> */}
                                                            <p class=" mb-2 text-muted" style={{ fontSize: '9px' }}>{publicnotificationsArray.notificationDate}<> </><span class="badge rounded-pill" style={{ fontSize: '10px', color: 'white', backgroundColor: 'black' }} ><> Public </><i class="fa fas fa-bell " style={{ fontSize: '10px', color: 'white' }} ></i></span> </p>


                                                            <p class="mb-2 " style={{ fontSize: '13px' }}> {publicnotificationsArray.notificationBody}</p>

                                                            {/* <img src="https://static.toiimg.com/thumb/56933159.cms?imgsize=686279&width=800&height=800" alt="" width="200" height="120" style={{ borderRadius: '15px' }} /> */}




                                                        </div>



                                                    )}



                                                    {notificationsArray.notificationOneHeader === 'empty' ? (
                                                        <></>

                                                    ) : (



                                                        <div class="row justify-content-center p-0 m-1 text-start">
                                                            {/* <button type="button" class="btn-close p-0" style={{ fontSize: '10px', position: 'absolute', right: '30px' }} aria-label="Close"></button> */}
                                                            <div><span class="btn badge bg-success" data-bs-toggle="modal" data-bs-target="#staticBackdroNoti1" style={{ fontSize: '10px', position: 'absolute', right: '80px' }}>View</span></div>
                                                            <div><span class="btn badge bg-danger" onClick={() => { updateNotificationOne(currentUser._id, 'empty') }} style={{ fontSize: '10px', position: 'absolute', right: '30px' }}>Delete</span></div>
                                                            <p class=" mb-2 text-muted" style={{ fontSize: '9px' }}>{notificationsArray.notificationOneDate}</p>


                                                            <p class="mb-2 " style={{ fontSize: '13px' }}>{notificationsArray.notificationOneBody}</p>

                                                            {/* <img src="https://static.toiimg.com/thumb/56933159.cms?imgsize=686279&width=800&height=800" alt="" width="200" height="120" style={{ borderRadius: '15px' }} /> */}



                                                        </div>



                                                    )}


                                                    {notificationsArray.notificationTwoHeader === 'empty' ? (
                                                        <></>

                                                    ) : (



                                                        <div class="row justify-content-center p-0 m-1 text-start">
                                                            <div><span class="btn badge bg-success" data-bs-toggle="modal" data-bs-target="#staticBackdroNoti2" style={{ fontSize: '10px', position: 'absolute', right: '80px' }}>View</span></div>
                                                            <div><span class="btn badge bg-danger" onClick={() => { updateNotificationTwo(currentUser._id, 'empty') }} style={{ fontSize: '10px', position: 'absolute', right: '30px' }}>Delete</span></div>
                                                            <p class=" mb-2 text-muted" style={{ fontSize: '9px' }}>{notificationsArray.notificationTwoDate}</p>


                                                            <p class="mb-2 " style={{ fontSize: '13px' }}> {notificationsArray.notificationTwoBody}</p>

                                                            {/* <img src="https://static.toiimg.com/thumb/56933159.cms?imgsize=686279&width=800&height=800" alt="" width="200" height="120" style={{ borderRadius: '15px' }} /> */}




                                                        </div>



                                                    )}


                                                    {notificationsArray.notificationThreeHeader === 'empty' ? (
                                                        <></>

                                                    ) : (



                                                        <div class="row justify-content-center p-0 m-1 text-start">
                                                            <div><span class="btn badge bg-success" data-bs-toggle="modal" data-bs-target="#staticBackdroNoti3" style={{ fontSize: '10px', position: 'absolute', right: '80px' }}>View</span></div>
                                                            <div><span class="btn badge bg-danger" onClick={() => { updateNotificationThree(currentUser._id, 'empty') }} style={{ fontSize: '10px', position: 'absolute', right: '30px' }}>Delete</span></div>
                                                            <p class=" mb-2 text-muted" style={{ fontSize: '9px' }}>{notificationsArray.notificationThreeDate}</p>


                                                            <p class="mb-2 " style={{ fontSize: '13px' }}> {notificationsArray.notificationThreeBody}</p>

                                                            {/* <img src="https://static.toiimg.com/thumb/56933159.cms?imgsize=686279&width=800&height=800" alt="" width="200" height="120" style={{ borderRadius: '15px' }} /> */}




                                                        </div>



                                                    )}

                                                    {notificationsArray.notificationFourHeader === 'empty' ? (
                                                        <></>

                                                    ) : (



                                                        <div class="row justify-content-center p-0 m-1 text-start">
                                                            <div><span class="btn badge bg-success" data-bs-toggle="modal" data-bs-target="#staticBackdroNoti4" style={{ fontSize: '10px', position: 'absolute', right: '80px' }}>View</span></div>
                                                            <div><span class="btn badge bg-danger" onClick={() => { updateNotificationFour(currentUser._id, 'empty') }} style={{ fontSize: '10px', position: 'absolute', right: '30px' }}>Delete</span></div>
                                                            <p class=" mb-2 text-muted" style={{ fontSize: '9px' }}>{notificationsArray.notificationFourDate}</p>


                                                            <p class="mb-2 " style={{ fontSize: '13px' }}> {notificationsArray.notificationFourBody}</p>

                                                            {/* <img src="https://static.toiimg.com/thumb/56933159.cms?imgsize=686279&width=800&height=800" alt="" width="200" height="120" style={{ borderRadius: '15px' }} /> */}




                                                        </div>



                                                    )}

                                                </MDBCardBody>
                                            </MDBCard>
                                        </MDBCol>

                                        <MDBCol md="6">
                                            <MDBCard className="mb-4 mb-md-0 shadow">
                                                <MDBCardBody>
                                                    <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status</MDBCardText>
                                                    <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</MDBCardText>
                                                    <MDBProgress className="rounded">
                                                        <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                                                    </MDBProgress>

                                                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</MDBCardText>
                                                    <MDBProgress className="rounded">
                                                        <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                                                    </MDBProgress>

                                                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</MDBCardText>
                                                    <MDBProgress className="rounded">
                                                        <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                                                    </MDBProgress>

                                                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</MDBCardText>
                                                    <MDBProgress className="rounded">
                                                        <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                                                    </MDBProgress>

                                                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</MDBCardText>
                                                    <MDBProgress className="rounded">
                                                        <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                                                    </MDBProgress>
                                                </MDBCardBody>
                                            </MDBCard>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    </section>
                </div>






                {/* Public Notification Model */}

                <div class="modal fade" id="staticBackdroPubnoti" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">{publicnotificationsArray.notificationHeader}<span className="text-muted" style={{ fontSize: '12px' }}> - {publicnotificationsArray.notificationDate}</span></h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body ">

                                <div class=" m-1">

                                    <img src={publicnotificationsArray.notificationImage} style={{ borderRadius: '15px' }} class={"card-img-top shadow"} alt="..." />

                                    <div class="card-body">
                                        <br />
                                        <h4 class="card-title">{publicnotificationsArray.notificationHeader}</h4>
                                        <br />
                                        <p class="card-text text-muted ">{publicnotificationsArray.notificationBody}</p>

                                    </div>
                                </div>

                            </div>
                            <div class="modal-footer">

                                <button type="button" class="btn " data-bs-dismiss="modal">Close</button>

                            </div>
                        </div>
                    </div>
                </div>


                {/* Notification Model 1 */}

                <div class="modal fade" id="staticBackdroNoti1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">{notificationsArray.notificationOneHeader}<span className="text-muted" style={{ fontSize: '12px' }}> - {notificationsArray.notificationOneDate}</span></h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body ">

                                <div class=" m-1">

                                    <img src={notificationsArray.notificationOneImage} style={{ borderRadius: '15px' }} class={"card-img-top shadow"} alt="..." />

                                    <div class="card-body">
                                        <br />
                                        <h4 class="card-title">{notificationsArray.notificationOneHeader}</h4>
                                        <br />
                                        <p class="card-text text-muted ">{notificationsArray.notificationOneBody}</p>

                                    </div>
                                </div>

                            </div>
                            <div class="modal-footer">

                                <button type="button" onClick={() => { updateNotificationOne(currentUser._id, 'empty') }} class="btn " data-bs-dismiss="modal">Delete <i class="fa-solid fa-trash-can"></i></button>
                                <button type="button" class="btn " data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>



                {/* Notification Model 2 */}

                <div class="modal fade" id="staticBackdroNoti2" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">{notificationsArray.notificationTwoHeader}<span className="text-muted" style={{ fontSize: '12px' }}> - {notificationsArray.notificationTwoDate}</span></h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body ">

                                <div class=" m-1">

                                    <img src={notificationsArray.notificationTwoImage} style={{ borderRadius: '15px' }} class={"card-img-top shadow"} alt="..." />

                                    <div class="card-body">
                                        <br />
                                        <h4 class="card-title">{notificationsArray.notificationTwoHeader}</h4>
                                        <br />
                                        <p class="card-text text-muted ">{notificationsArray.notificationTwoBody}</p>

                                    </div>
                                </div>

                            </div>
                            <div class="modal-footer">

                                <button type="button" onClick={() => { updateNotificationTwo(currentUser._id, 'empty') }} class="btn " data-bs-dismiss="modal">Delete <i class="fa-solid fa-trash-can"></i></button>
                                <button type="button" class="btn " data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Notification Model 3 */}

                <div class="modal fade" id="staticBackdroNoti3" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">{notificationsArray.notificationThreeHeader}<span className="text-muted" style={{ fontSize: '12px' }}> - {notificationsArray.notificationThreeDate}</span></h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body ">

                                <div class=" m-1">

                                    <img src={notificationsArray.notificationThreeImage} style={{ borderRadius: '15px' }} class={"card-img-top shadow"} alt="..." />

                                    <div class="card-body">
                                        <br />
                                        <h4 class="card-title">{notificationsArray.notificationThreeHeader}</h4>
                                        <br />
                                        <p class="card-text text-muted ">{notificationsArray.notificationThreeBody}</p>

                                    </div>
                                </div>

                            </div>
                            <div class="modal-footer">

                                <button type="button" onClick={() => { updateNotificationThree(currentUser._id, 'empty') }} class="btn " data-bs-dismiss="modal">Delete <i class="fa-solid fa-trash-can"></i></button>
                                <button type="button" class="btn " data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Notification Model 4 */}

                <div class="modal fade" id="staticBackdroNoti4" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">{notificationsArray.notificationFourHeader}<span className="text-muted" style={{ fontSize: '12px' }}> - {notificationsArray.notificationFourDate}</span></h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body ">

                                <div class=" m-1">

                                    <img src={notificationsArray.notificationFourImage} style={{ borderRadius: '15px' }} class={"card-img-top shadow"} alt="..." />

                                    <div class="card-body">
                                        <br />
                                        <h4 class="card-title">{notificationsArray.notificationFourHeader}</h4>
                                        <br />
                                        <p class="card-text text-muted ">{notificationsArray.notificationFourBody}</p>

                                    </div>
                                </div>

                            </div>
                            <div class="modal-footer">

                                <button type="button" onClick={() => { updateNotificationFour(currentUser._id, 'empty') }} class="btn " data-bs-dismiss="modal">Delete <i class="fa-solid fa-trash-can"></i></button>
                                <button type="button" class="btn " data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>



            </div>


        </div>

    );
}