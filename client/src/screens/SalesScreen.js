import React from 'react'
import axios from 'axios'
import DataTable from "react-data-table-component"
import Swal from 'sweetalert2';
//import { Modal } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getUserOrders } from '../actions/orderActions'
import { updateStatus, updateStatusAction } from "../actions/salesActions";

let salesid;
export default function SalesScreen() {

    const [orders, setOrders] = useState([]);
    const [filterdOrders, setFilterdOrders] = useState([]);
    const [searchOrders, setSearchOrders] = useState("");

    useEffect(() => {

        function getOrders() {

            //get all sales from database
            axios.get("/api/orders/getallorders").then((res) => {
                setOrders(res.data);
                console.log(res.data)


                const filteredOrders = res.data.filter(order => order.isDelivered === true);
                setOrders(filteredOrders);
                setFilterdOrders(filteredOrders);

            }).catch((err) => {
                console.log(err.message)

            })
        }

        getOrders();


    }, [])

    //update status

    function updateStatus(salesid, val) {

        const updateisSuccessful = {

            isSuccessfull: val
        }

        console.log(updateisSuccessful, salesid)


        dispatch(updateStatusAction(updateisSuccessful, salesid, val))


    }

    function getCurrentOrders(salesid) {
        axios
            .get(`/api/orders/getcurrentorders/${salesid}`)
            .then((res) => {
                setOrders(res.data);
                orders = res.data;
                console.log(orders);
            })
            .catch((error) => {
                console.log(error);
            });

    }

    //create data table sales details
    const columnsOrders = [
        {
            name: "Transaction ID",
            selector: (row) => row.transactionId,
            sortable: true
        },


        {
            name: "Amount(LKR)",
            selector: (row) => row.orderAmount,
            sortable: true
        },

        {
            name: "Date",
            selector: (row) => row.createdAt.substring(0, 10),
            sortable: true
        },
        {
            name: "Order Status",
            selector: (row) => {

                return <span className="badge bg-success">Completed</span>;

            }
        },

        {
            name: "Trasaction Details",
            cell: row => <button onClick={() => getCurrentOrders(row._id)} type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">View</button>

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
                <div className='col-md-9 m-3   p-0 ' >

                    {/* Data table for sales details */}
                    <DataTable

                        title='Sales Details'
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
                    <br />
                    <div className='modal-footer'>
                        <div className='p-1'><button class="btn" data-bs-target="#exampleModalToggleReport" data-bs-toggle="modal" data-bs-dismiss="modal"><i style={{ fontSize: '15px', color: 'white' }} class="fa fa-file" aria-hidden="true"></i> Generate Monthly Sales Report</button>
                        </div>
                    </div>

                    {/* report model */}

                    <div class="modal fade" id="exampleModalToggleReport" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                        <div class="modal-dialog modal-lg modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalToggleLabel">Monthly Sales Report</h5>
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
                                                                    <strong>NO OF SALES<i class="" style={{ fontSize: '13px', color: 'red' }} ></i></strong>
                                                                </p>
                                                                <h5 class="mb-0">
                                                                    {/* <strong>{usersCount}</strong> */}
                                                                    <small class="text-success ms-2">
                                                                        <i class=""></i></small>
                                                                </h5>

                                                                <hr />

                                                                <p class="text-uppercase text-muted small mb-2">
                                                                    REVENUE
                                                                </p>
                                                                {/* <h5 class="text-muted mb-0">11 467</h5> */}
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div class="col-lg-3 col-md-6 mb-4">
                                                        <div class="card">
                                                            <div class="card-body shadow">
                                                                <p class="text-uppercase small mb-2">
                                                                    <strong>COST<i class="" style={{ fontSize: '13px', color: 'red' }}></i></strong>
                                                                </p>
                                                                <h5 class="mb-0">
                                                                    {/* <strong>{totalVerifiedUsers}</strong> */}
                                                                    <small class="text-success ms-2">
                                                                        <i class=""></i></small>
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
                                                                    <strong>COST BREAKDOWN <i class="" style={{ fontSize: '13px', color: 'red' }}></i></strong>
                                                                </p>
                                                                <h5 class="mb-0">
                                                                    {/* <strong>{VerifiedPercentageRate}%</strong> */}
                                                                    <small class="text-success ms-2">
                                                                        <i class=""></i></small>
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
                                                                    <strong>REVENUE <i class="" style={{ fontSize: '13px', color: 'red' }}></i></strong>
                                                                </p>
                                                                <h5 class="mb-0">
                                                                    <strong>0</strong>
                                                                    <small class="text-danger ms-2">
                                                                        <i class=""></i></small>
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
                                                                            aria-controls="ex1-pills-1" aria-selected="true">Sales Revenue</a>
                                                                    </li>



                                                                </ul>

                                                                {/* <div className=''> {VerifiedUsers.map((names) => (
                                                                    <ol>{names}<i class="fa fa-check-circle p-1" title="Verified Customer" style={{ fontSize: '14px', color: '#00b9ff' }} aria-hidden="true"></i></ol>

                                                                ))}
                                                                </div> */}



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

                </div>



                {/* view model */}
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                {/* <h5 class="modal-title" id="exampleModalLabel">Transaction Details</h5> */}
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <h2 style={{ fontSize: '25px' }}>Transaction Details</h2>
                                <hr />
                                <p>Order Id : {orders._id}</p>
                                <p>Customer Id : {orders.userid}</p>
                                <p>Email : {orders.email}</p>

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn " data-bs-dismiss="modal">Close</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}