import React from 'react'
import axios from 'axios'
import DataTable from "react-data-table-component"
import Swal from 'sweetalert2';

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getUserOrders } from '../actions/orderActions'
import { addRefund } from '../actions/refundActions'
import { updateStatus, updateStatusAction } from "../actions/refundRequestActions";
import { addRefundReducer } from '../reducers/refundReducer';

import Loading from "../components/Loading";
import Error from "../components/Error";
import Success from "../components/Success"


let OrderId;
let requestid;

export default function RefundRequestScreen() {

    const [orders, setOrders] = useState([]);
    const [filterdOrders, setFilterdOrders] = useState([]);
    const [searchOrders, setSearchOrders] = useState("");




    useEffect(() => {
        //get all refund requests
        function getOrders() {
            axios.get("/api/orders/getallorders")
                .then((res) => {
                    const filteredOrders = res.data.filter(order => order.sendrefundStatus === true);
                    setOrders(filteredOrders);
                    setFilterdOrders(filteredOrders);
                    console.log(filteredOrders);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
        getOrders();


    }, [])

    //
    function getCurrentOrders(OrderId) {
        axios
            .get(`/api/orders/getcurrentorders/${OrderId}`)
            .then((res) => {
                setOrders(res.data);
                orders = res.data;
                console.log(orders);
            })
            .catch((error) => {
                console.log(error);
            });

    }

    const [id, setid] = useState('')
    const [orderid, setorderid] = useState('')
    const [refundamount, setrefundamount] = useState('')
    const [email, setemail] = useState('')
    const [description, setdescription] = useState('')
    const [isSuccessfull, setisSuccessfull] = useState(false)
    // const [request, setrequest] = useState(null);

    const addrefundstate = useSelector(state => state.addRefundReducer)
    const { success, error, loading } = addrefundstate


    // useEffect(() => {
    //     // Make an API call to retrieve the data from MongoDB
    //     axios.get(`/api/orders/getcurrentorders/${OrderId}`).then(response => {
    //         const data = response.data;
    //         // Set the initial state using the retrieved data
    //         setid(data.id);
    //         setid(data.orderid);
    //         setrefundamount(data.refundamount);
    //         setemail(data.email);
    //         setdescription(data.description);
    //         setisSuccessfull(data.isSuccessfull);
    //     }).catch(error => {
    //         console.log(error);
    //     });
    // }, []);

    function formHandler(e) {

        e.preventDefault();

        const refund = {
            id,
            orderid,
            refundamount,
            email,
            description,
            isSuccessfull
        }

        console.log(refund);
        dispatch(addRefund(refund));

    }


    //update status
    function updateStatus(requestid, val) {

        const updateisSuccessful = {

            isSuccessfull: val
        }

        console.log(updateisSuccessful, requestid)


        dispatch(updateStatusAction(updateisSuccessful, requestid, val))


    }

    //create data table for refund requests
    const columnsOrders = [
        {
            name: "Order ID",
            selector: (row) => row._id,
            sortable: true
        },

        {
            name: "Customer ID",
            selector: (row) => row.userid,
            sortable: true
        },

        {
            name: "Amount(LKR)",
            selector: (row) => row.orderAmount,
            sortable: true
        },

        {
            name: "Email",
            selector: (row) => row.email,
            sortable: true
        },

        {
            name: "Date",
            selector: (row) => row.createdAt.substring(0, 10),
            sortable: true
        },

        {
            name: "Action",
            cell: row => <button onClick={() => getCurrentOrders(row._id)} type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">ADD</button>

        },

        {
            name: "Status",
            cell: row => <> {row.isSuccessfull === true ? (<span className="badge bg-success">Successfull</span>) : (<span className="badge bg-warning">Pending</span>)} </>


        },

    ]

    // search button
    useEffect(() => {
        const results = orders.filter(orders => {
            return orders.createdAt.substring(5, 8).toLowerCase().match(searchOrders.toLowerCase());
        });

        setFilterdOrders(results);
    }, [searchOrders]);



    const dispatch = useDispatch();


    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className='row justify-content-center'>

            
                <div className='col-md-10'>

                    <ul className='financemanagerfunctions'>
                        <li><a href="requests">Refund Requests</a></li>
                        <li><a href="history">Transaction History</a></li>
                    </ul>

                </div>
            
                <div className='col-md-9 m-3   p-0 ' >

                    {/* Data table for refund request details */}
                    <DataTable

                        title='Refund Requests'
                        columns={columnsOrders}
                        data={filterdOrders}
                        pagination
                        fixedHeader
                        fixedHeaderScrollHeight="450px"
                        selectableRows
                        selectableRowsHighlight
                        subHeader
                        subHeaderComponent={
                            <input

                                type="text"
                                placeholder="Search Month..."
                                className='w-25 form-control'
                                value={searchOrders}
                                onChange={(e) => setSearchOrders(e.target.value)}

                            />

                        }


                    />

                </div>



                {/* Add refund transaction model*/}
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">ADD REFUND TRANSACTION</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                {/* form*/}

                                {orders.userid}<br />
                                {orders._id}<br />
                                {orders.orderAmount}<br />
                                {orders.email}

                                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                                    <div className='box col-md-10 m-2 p-5'>
                                        <div className='text-left'>
                                            {/* <h1>Add Refund Transaction</h1> */}

                                            {loading && (<Loading />)}
                                            {error && (<Error error='Something went wrong' />)}
                                            {success && (<Success success='New Refund Transaction Added Successfully' />)}

                                            <form onSubmit={formHandler}>
                                                <br />
                                                <div className="form-group">
                                                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Customer ID" value={id} onChange={(e) => { setid(e.target.value) }} />
                                                </div><br />
                                                <div className="form-group">
                                                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Order ID" value={orderid} onChange={(e) => { setorderid(e.target.value) }} />
                                                </div><br />
                                                <div className="form-group">
                                                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Refund Amount" value={refundamount} onChange={(e) => { setrefundamount(e.target.value) }} />
                                                </div><br />
                                                <div className="form-group">
                                                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Email address" value={email} onChange={(e) => { setemail(e.target.value) }} />
                                                </div> <br />
                                                <div className="form-group">
                                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Description" value={description} onChange={(e) => { setdescription(e.target.value) }}></textarea>
                                                </div>

                                                <button onClick={() => { { updateStatus(orders._id, true) } }} className='btn mt-3' type='submit'>Add Transaction</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn" data-bs-dismiss="modal">Close</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}