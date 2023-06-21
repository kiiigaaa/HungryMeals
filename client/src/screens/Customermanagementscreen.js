import React from 'react'
import axios from 'axios'
import DataTable from "react-data-table-component"
import Swal from 'sweetalert2';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { deleteCustomerAction, addUser } from '../actions/CustomerAction';
import { addAdmin, deleteAdminAction } from '../actions/adminActions';
import { updateCustomerName, updateCustomerEmail, updateCustomerPassword, updateCustomerVerification } from '../actions/CustomerAction';

import Loading from "../components/Loading"
import Success from "../components/Success"
import Error from "../components/Error"



let userId;
let usersCount;
let usersArray;
let totalVerifiedUsers = 0
const VerifiedUsers = new Array();
let VerifiedPercentage;
let VerifiedPercentageRate;

let adminID;
let adminCount;
let adminArray;

function Customermanagementscreen() {

    const [cpassword, setcpassword] = useState('')
    const customeraddstate = useSelector(state => state.addCustomerReducer)
    const { error, loading, success } = customeraddstate


    //add new customer by admin
    function addcustomer() {

        if (password != cpassword) {

            alert("passwords not matched")

        }
        else {

            const user = {

                name,
                email,
                password
            }


            if (name.trim().length !== 0 && email.trim().length !== 0) {

                dispatch(addUser(user))

            }
            else {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })

                Toast.fire({
                    icon: 'error',
                    title: 'Please fill out required fields !'
                })
            }

        }
    }





    const [users, setUsers] = useState([]);
    const [filterdUsers, setFilterdUsers] = useState([]);
    const [search, setSearch] = useState("");




    useEffect(() => {
        function getUsers() {

            //get all users from database
            axios.get("/api/users/getAllusers").then((res) => {
                setUsers(res.data);
                // console.log(res.data)

                usersArray = res.data;
                usersCount = usersArray.length;


                //verification status purpose

                for (let index = 0; index < usersArray.length; index++) {
                    if (res.data[index].isVerified) {
                        const DATA = res.data[index].name;
                        VerifiedUsers.push(DATA)
                        totalVerifiedUsers = totalVerifiedUsers + 1;
                    }

                }

                console.log(VerifiedUsers)
                console.log(totalVerifiedUsers)
                // console.log(usersCount)


                setFilterdUsers(res.data);
            }).catch((err) => {
                console.log(err.message)

            })
        }
        getUsers();

    }, [])




    // search button
    useEffect(() => {
        const result = users.filter(users => {
            return users.name.toLowerCase().match(search.toLowerCase());
        });

        setFilterdUsers(result);
    }, [search]);


    //delete function

    const dispatch = useDispatch();

    function deleteUser(userId) {

        dispatch(deleteCustomerAction(userId));

    }

    //update function

    const [name, updateCName] = useState('')
    const [email, updateCEmail] = useState('')
    const [password, updateCPassword] = useState('')

    //update customer name
    function updatename(userId) {

        const updateCName = {

            name
        }

        console.log(updateCName, userId)
        dispatch(updateCustomerName(updateCName, userId))


    }


    //update email
    var isTrue = false
    function updateemail(userId) {

        const updateCEmail = {

            email
        }


        for (let index = 0; index <= usersCount; index++) {

            if (index !== usersCount) {


                if (usersArray[index].email === email) {


                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })

                    Toast.fire({
                        icon: 'error',
                        title: 'Email already registerd'
                    })

                    setTimeout(function () {
                        window.location.reload('/admin/customers');
                    }, 1500);

                    console.log('Email already registerd')
                    index = 1000

                }
            }


            if (index === usersCount) {


                dispatch(updateCustomerEmail(updateCEmail, userId))

            }
        }
    }

    //update customer password
    function updatepassword(userId) {

        const updateCPassword = {

            password
        }

        console.log(updateCPassword, userId)


        dispatch(updateCustomerPassword(updateCPassword, userId))


    }

    //update verified users
    const [isVerified, updateCisVerified] = useState('')

    function updateverification(userId, val) {

        const updateCisVerified = {

            isVerified: val
        }

        console.log(updateCisVerified, userId)


        dispatch(updateCustomerVerification(updateCisVerified, userId, val))


    }




    //create data table customers
    const columns = [
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Email",
            selector: (row) => row.email,
        },
        {
            name: "Password",
            selector: (row) => row.password,
        },



        {
            name: "Update",
            cell: row => <button onClick={() => { (userId = row._id) }} className="btn" data-bs-toggle="modal" href="#exampleModalToggle" role="button">Update</button>

        },
        {
            name: "Delete",
            cell: row => <button onClick={() => { deleteUser(row._id) }} className="btn" role="button">Delete</button>


        },
        {
            name: "Verification Status",


            cell: row => <> {row.isVerified === true ? (<button onClick={() => { { updateverification(row._id, false) } }} className="btn" role="button">Disable</button>) : (<button onClick={() => { { updateverification(row._id, true) } }} className="btn" role="button">Enable</button>)} </>



        }

    ]

    //calculations for report
    VerifiedPercentage = (totalVerifiedUsers / usersCount) * 100;
    VerifiedPercentageRate = VerifiedPercentage.toFixed(2)



    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // administrator section

    const [AdminName, setAdminName] = useState('')
    const [AdminEmail, setAdminEmail] = useState('')
    const [AdminPassword, setAdminPassword] = useState('')
    const [AdRePassword, setAdRepassword] = useState('')

    const [admins, setAdmins] = useState([]);
    const [filterdAdmins, setFilterdAdmins] = useState([]);
    const [searchAdmin, setSearchAdmin] = useState("");

    useEffect(() => {
        function getAdmins() {

            //get all users from database
            axios.get("/api/admins/getalladmins").then((res) => {
                setAdmins(res.data);
                console.log(res.data)


                adminArray = res.data;
                adminCount = adminArray.length;
                console.log("admin Count " + adminCount);


                setFilterdAdmins(res.data);


            }).catch((err) => {
                console.log(err.message)

            })
        }
        getAdmins();

    }, [])



    //function for add admins to Database
    function addAdministrator() {

        if (AdminPassword != AdRePassword) {

            alert("passwords not matched")

        } else {

            const admin = {

                AdminName,
                AdminEmail,
                AdminPassword
            }


            if (AdminName.trim().length !== 0 && AdminEmail.trim().length !== 0) {

                dispatch(addAdmin(admin))

            }
            else {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })

                Toast.fire({
                    icon: 'error',
                    title: 'Please fill out required fields !'
                })
            }
        }
    }

    // search button
    useEffect(() => {
        const results = admins.filter(admins => {
            return admins.AdminName.toLowerCase().match(searchAdmin.toLowerCase());
        });

        setFilterdAdmins(results);
    }, [searchAdmin]);


    //delete function

    function deleteAdmin(adminID) {

        dispatch(deleteAdminAction(adminID));

    }



    //create data table admins
    const columnsAdmin = [
        {
            name: "Name",
            selector: (row) => row.AdminName,
            sortable: true,
        },
        {
            name: "Email",
            selector: (row) => row.AdminEmail,
        },
        {
            name: "Password",
            selector: (row) => row.AdminPassword,
        },



        // {
        //     name: "Update",
        //     cell: row => <button onClick={() => { (adminID = row._id) }} className="btn" data-bs-toggle="modal" href="#exampleModalToggle" role="button">Update</button>

        // },
        {
            name: "Delete",
            cell: row => <button onClick={() => { deleteAdmin(row._id) }} className="btn" role="button">Delete</button>


        },

    ]
















    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            <div className='row justify-content-center'>
                <div className='col-md-9 m-3   p-0 ' >

                    {/* Data table for customer details */}
                    <DataTable

                        title='User Management - Customers'
                        columns={columns}
                        data={filterdUsers}
                        pagination
                        fixedHeader
                        fixedHeaderScrollHeight="450px"
                        selectableRows
                        selectableRowsHighlight
                        subHeader
                        subHeaderComponent={
                            <input

                                type="text"
                                placeholder="Search here..."
                                className='w-25 form-control'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}

                            />

                        }


                    />
                    <br />
                    <br />
                    <div className='modal-footer'>
                        <div className='p-1'>
                            <button class="btn" data-bs-target="#addnewcustomer" data-bs-toggle="modal" data-bs-dismiss="modal"><i style={{ fontSize: '15px', color: 'white' }} class="fa fa-plus" aria-hidden="true"></i>Add Customer</button>
                        </div>
                        {/* generate report button */}
                        <div className='p-1'><button class="btn" data-bs-target="#exampleModalToggleReport" data-bs-toggle="modal" data-bs-dismiss="modal"><i style={{ fontSize: '15px', color: 'white' }} class="fa fa-file" aria-hidden="true"></i> Generate Customer Report</button>
                        </div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />




                    {/* Data Table for admin details */}
                    <DataTable

                        title='Managers Details'
                        columns={columnsAdmin}
                        data={filterdAdmins}
                        pagination
                        fixedHeader
                        fixedHeaderScrollHeight="450px"
                        selectableRows
                        selectableRowsHighlight
                        subHeader
                        subHeaderComponent={
                            <input

                                type="text"
                                placeholder="Search here..."
                                className='w-25 form-control'
                                value={searchAdmin}
                                onChange={(e) => setSearchAdmin(e.target.value)}

                            />

                        }


                    />
                    <br />
                    <br />
                    <div className='modal-footer'>

                        {/* enter new admin to the system */}

                        <button class="btn" data-bs-target="#addnewadmin" data-bs-toggle="modal" data-bs-dismiss="modal"><i style={{ fontSize: '15px', color: 'white' }} class="fa fa-plus" aria-hidden="true"></i>Add New Admin</button>
                        {/* generate report button */}
                        <div className='p-1'><button class="btn" data-bs-target="#exampleModalToggleReportAdmin" data-bs-toggle="modal" data-bs-dismiss="modal"><i style={{ fontSize: '15px', color: 'white' }} class="fa fa-file" aria-hidden="true"></i> Generate Admin Details Report</button>
                        </div>

                    </div>

                    {/* report model */}

                    <div class="modal fade" id="exampleModalToggleReport" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                        <div class="modal-dialog modal-lg modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalToggleLabel">Customer Detail Report</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">

                                    <div class="container my-4">

                                        <div class="border p-5 mb-5">

                                            <section>
                                                <div class="row">
                                                    <div class="col-lg-3 col-md-6 mb-4">
                                                        <div class="card">
                                                            <div class="card-body shadow shadow" >
                                                                <p class="text-uppercase small mb-2">
                                                                    <strong>ACTIVE LIVE USERS <i class="fa-solid fa-circle fa-fade" style={{ fontSize: '13px', color: 'red' }} ></i></strong>
                                                                </p>
                                                                <h5 class="mb-0">
                                                                    <strong>{usersCount}</strong>
                                                                    <small class="text-success ms-2">
                                                                        <i class="fas fa-arrow-up fa-sm pe-1"></i></small>
                                                                </h5>

                                                                <hr />

                                                                <p class="text-uppercase text-muted small mb-2">
                                                                    Previous period
                                                                </p>
                                                                {/* <h5 class="text-muted mb-0">11 467</h5> */}
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div class="col-lg-3 col-md-6 mb-4">
                                                        <div class="card">
                                                            <div class="card-body shadow">
                                                                <p class="text-uppercase small mb-2">
                                                                    <strong>VERIFIED LIVE USERS <i class="fa-solid fa-circle fa-fade" style={{ fontSize: '13px', color: 'red' }}></i></strong>
                                                                </p>
                                                                <h5 class="mb-0">
                                                                    <strong>{totalVerifiedUsers}</strong>
                                                                    <small class="text-success ms-2">
                                                                        <i class="fas fa-arrow-up fa-sm pe-1"></i></small>
                                                                </h5>

                                                                <hr />
                                                                <p class="text-uppercase text-muted small mb-2">
                                                                    Previous period
                                                                </p>

                                                                {/* <h5 class="text-muted mb-0">38 454</h5> */}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-lg-3 col-md-6 mb-4">
                                                        <div class="card">
                                                            <div class="card-body shadow">
                                                                <p class="text-uppercase small mb-2">
                                                                    <strong>Verified User Rate <i class="fa-solid fa-circle fa-fade" style={{ fontSize: '13px', color: 'red' }}></i></strong>
                                                                </p>
                                                                <h5 class="mb-0">
                                                                    <strong>{VerifiedPercentageRate}%</strong>
                                                                    <small class="text-success ms-2">
                                                                        <i class="fas fa-arrow-up fa-sm pe-1"></i></small>
                                                                </h5>

                                                                <hr />
                                                                <p class="text-uppercase text-muted small mb-2">
                                                                    Previous period
                                                                </p>

                                                                <h5 class="text-muted mb-0"></h5>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-lg-3 col-md-6 mb-4">
                                                        <div class="card">
                                                            <div class="card-body shadow">
                                                                <p class="text-uppercase small mb-2">
                                                                    <strong>Deleted User Accounts <i class="fa-solid fa-circle fa-fade" style={{ fontSize: '13px', color: 'red' }}></i></strong>
                                                                </p>
                                                                <h5 class="mb-0">
                                                                    <strong>0</strong>
                                                                    <small class="text-danger ms-2">
                                                                        <i class="fas fa-arrow-down fa-sm pe-1"></i></small>
                                                                </h5>

                                                                <hr />

                                                                <p class="text-uppercase text-muted small mb-2">
                                                                    Previous period
                                                                </p>
                                                                <h5 class="text-muted mb-0"></h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>

                                            <section>
                                                <div class="row">
                                                    <div class="col-md-8 mb-4">
                                                        <div class="card">
                                                            <div class="card-body shadow">

                                                                <ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                                                                    <li class="nav-item" role="presentation">
                                                                        <a class="nav-link active" id="ex1-tab-1" data-mdb-toggle="pill" role="tab"
                                                                            aria-controls="ex1-pills-1" aria-selected="true">Verified Users</a>
                                                                    </li>



                                                                </ul>

                                                                <div className=''> {VerifiedUsers.map((names) => (
                                                                    <ol>{names}<i class="fa fa-check-circle p-1" title="Verified Customer" style={{ fontSize: '14px', color: '#00b9ff' }} aria-hidden="true"></i></ol>

                                                                ))}
                                                                </div>



                                                                <div class="tab-content" id="ex1-content">
                                                                    <div class="tab-pane fade show active" id="ex1-pills-1" role="tabpanel" aria-labelledby="ex1-tab-1">
                                                                        <div id="chart-users"></div>
                                                                    </div>
                                                                    <div class="tab-pane fade" id="ex1-pills-2" role="tabpanel" aria-labelledby="ex1-tab-2">
                                                                        <div id="chart-page-views"></div>
                                                                    </div>
                                                                    <div class="tab-pane fade" id="ex1-pills-3" role="tabpanel" aria-labelledby="ex1-tab-3">
                                                                        <div id="chart-average-time"></div>
                                                                    </div>
                                                                    <div class="tab-pane fade" id="ex1-pills-4" role="tabpanel" aria-labelledby="ex1-tab-4">
                                                                        <div id="chart-bounce-rate"></div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-4 mb-4">
                                                        <div class="card mb-4">
                                                            <div class="card-body shadow">
                                                                <p class="text-center"><strong>Current period</strong></p>
                                                                <div id="pie-chart-current">0</div>
                                                            </div>
                                                        </div>

                                                        <div class="card">
                                                            <div class="card-body shadow">
                                                                <p class="text-center"><strong>Previous period</strong></p>
                                                                <div id="pie-chart-previous">0</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>

                                        </div>


                                    </div>

                                </div>

                                <div class="modal-footer">
                                    <button class="btn" onClick={() => window.print()} >Print</button>
                                    <button class="btn" data-bs-toggle="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>



                    {/* name model */}
                    <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalToggleLabel">Update Customer Name</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="mb-3">

                                        <label for="exampleFormControlInput1" class="form-label">Type New Username</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="exampleFormControlInput1"
                                            value={name}
                                            onChange={(e) => { updateCName(e.target.value) }}
                                        />

                                    </div>
                                </div>

                                <div class="modal-footer">
                                    <button onClick={() => updatename(userId)} type="button" class="btn ">Save Changes</button>


                                    <button class="btn" data-bs-target="#exampleModalToggle1" data-bs-toggle="modal" data-bs-dismiss="modal">Change Email</button>
                                    <button class="btn" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal">Change Password</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Email model */}
                    <div class="modal fade" id="exampleModalToggle1" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalToggleLabel">Update Customer Email</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="mb-3">

                                        <label for="exampleFormControlInput1" class="form-label">Type New Email</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="exampleFormControlInput1"
                                            value={email}
                                            onChange={(e) => { updateCEmail(e.target.value) }}
                                        />

                                    </div>
                                </div>

                                <div class="modal-footer">
                                    <button onClick={() => updateemail(userId)} type="button" class="btn ">Save Changes</button><br />  <br />
                                    <button class="btn" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" data-bs-dismiss="modal">Change Name</button><br />  <br />
                                    <button class="btn" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal">Change Password</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Password model */}
                    <div class="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalToggleLabel">Update Customer Password</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="mb-3">

                                        <label for="exampleFormControlInput1" class="form-label">Type New Password</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="exampleFormControlInput1"
                                            value={password}
                                            onChange={(e) => { updateCPassword(e.target.value) }}
                                        />

                                    </div>
                                </div>

                                <div class="modal-footer">
                                    <button onClick={() => updatepassword(userId)} type="button" class="btn ">Save Changes</button>
                                    <button class="btn" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" data-bs-dismiss="modal">Change Name</button>
                                    <button class="btn" data-bs-target="#exampleModalToggle1" data-bs-toggle="modal" data-bs-dismiss="modal">Change Email</button>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* modal for add new customer by admin */}
                    <div class="modal fade" id="addnewcustomer" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="updateemailLabel">Add new Customer</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">

                                    {/* {loading && <Loading />}
                                    {success && <Success success='Customer Added Successfully' />}
                                    {error && (<Error error='Email already registered' />)} */}
                                    <form>


                                        <div class="mb-3">
                                            <label for="customer-name" class="col-form-label">Name:</label>
                                            <input

                                                required
                                                type="text"
                                                class="form-control"
                                                id="customer-name"
                                                value={name}
                                                onChange={(e) => { updateCName(e.target.value) }}

                                            />
                                        </div>


                                        <div class="mb-3">
                                            <label for="customer-email" class="col-form-label">Email:</label>
                                            <input

                                                required
                                                type="text"
                                                class="form-control"
                                                id="customer-email"
                                                value={email}
                                                onChange={(e) => { updateCEmail(e.target.value) }}

                                            />
                                        </div>


                                        <div class="mb-3">
                                            <label for="customer-password" class="col-form-label">Password:</label>
                                            <input

                                                required
                                                type="password"
                                                class="form-control"
                                                id="customer-password"
                                                value={password}
                                                onChange={(e) => { updateCPassword(e.target.value) }}

                                            />
                                        </div>

                                        <div class="mb-3">
                                            <label for="customer-cpassword" class="col-form-label">ReType - Password:</label>
                                            <input

                                                required
                                                type="password"
                                                class="form-control"
                                                id="customer-cpassword"
                                                value={cpassword}
                                                onChange={(e) => { setcpassword(e.target.value) }}

                                            />
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">

                                    <button onClick={addcustomer} type="button" class="btn ">Add</button>
                                    <button type="button" class="btn " data-bs-dismiss="modal">Close</button>

                                </div>
                            </div>
                        </div>
                    </div>



                    {/* modal register new addmin */}


                    <div class="modal fade" id="addnewadmin" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="updateemailLabel">Register New Administrators</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">

                                    <form>


                                        <div class="mb-3">
                                            <label for="customer-name" class="col-form-label">Name:</label>
                                            <input

                                                required
                                                type="text"
                                                class="form-control"
                                                id="customer-name"
                                                value={AdminName}
                                                onChange={(e) => { setAdminName(e.target.value) }}

                                            />
                                        </div>


                                        <div class="mb-3">
                                            <label for="customer-email" class="col-form-label">Email:</label>
                                            <input

                                                required
                                                type="text"
                                                class="form-control"
                                                id="customer-email"
                                                value={AdminEmail}
                                                onChange={(e) => { setAdminEmail(e.target.value) }}

                                            />
                                        </div>


                                        <div class="mb-3">
                                            <label for="customer-password" class="col-form-label">Password:</label>
                                            <input

                                                required
                                                type="password"
                                                class="form-control"
                                                id="customer-password"
                                                value={AdminPassword}
                                                onChange={(e) => { setAdminPassword(e.target.value) }}

                                            />
                                        </div>

                                        <div class="mb-3">
                                            <label for="customer-cpassword" class="col-form-label">ReType - Password:</label>
                                            <input

                                                required
                                                type="password"
                                                class="form-control"
                                                id="customer-cpassword"
                                                value={AdRePassword}
                                                onChange={(e) => { setAdRepassword(e.target.value) }}

                                            />
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">

                                    <button onClick={addAdministrator} type="button" class="btn ">Register</button>
                                    <button type="button" class="btn " data-bs-dismiss="modal">Close</button>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Customermanagementscreen
