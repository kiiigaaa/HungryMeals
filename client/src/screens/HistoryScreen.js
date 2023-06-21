import axios from 'axios'
import DataTable from "react-data-table-component"
import Swal from 'sweetalert2';
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateStatusAction, deleteRefundTransactionAction } from "../actions/refundActions";

import Loading from "../components/Loading";
//filter
import Error from "../components/Error"


let refundid;
export default function HistoryScreen() {

    const [refunds, setRefunds] = useState([]);
    const [filterdRefunds, setFilterdRefunds] = useState([]);
    const [searchRefunds, setSearchRefunds] = useState("");


    useEffect(() => {

        function getRefunds() {

            //get all refunds from database
            axios.get("/api/refunds/getallrefunds").then((res) => {
                setRefunds(res.data);
                console.log(res.data)


                setFilterdRefunds(res.data);


            }).catch((err) => {
                console.log(err.message)

            })
        }

        getRefunds();

    }, [])

    //crate data table for sales
    const columnsRefunds = [
        {
            name: "Transaction ID",
            selector: (row) => row._id,
            sortable: true
        },

        {
            name: "Amount",
            selector: (row) => row.refundamount,
            sortable: true
        },

        {
            name: "Date",
            selector: (row) => row.createdAt.substring(0, 10),
            sortable: true
        },

        {
            name: "Customer ID",
            selector: (row) => row.id,
            sortable: true
        },

        {
            name: "Email",
            selector: (row) => row.email,
            sortable: true
        },

        {
            name: "Delete",
            cell: row => <button onClick={() => { deleteAction(row._id) }} className="btn">Delete</button>
        },

    ]

    // search button
    useEffect(() => {
        const results = refunds.filter(refunds => {
            return refunds.id.toLowerCase().match(searchRefunds.toLowerCase());
        });


        setFilterdRefunds(results);
    }, [searchRefunds]);

    const dispatch = useDispatch();

    //delete function
    function deleteAction(refundid) {

        dispatch(deleteRefundTransactionAction(refundid));
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

                <div className='col-md-9 m-3   p-0 ' >


                    {/* Data table for sales details */}
                    <DataTable

                        title='Refund Transactions'
                        columns={columnsRefunds}
                        data={filterdRefunds}
                        pagination
                        fixedHeader
                        fixedHeaderScrollHeight="450px"
                        selectableRows
                        selectableRowsHighlight
                        subHeader
                        subHeaderComponent={
                            <input

                                type="text"
                                placeholder="Search Customer Id..."
                                className='w-25 form-control'
                                value={searchRefunds}
                                onChange={(e) => setSearchRefunds(e.target.value)}

                            />

                        }


                    />
                    <br />
                    {/* generate report button */}
                    <div className='modal-footer'>
                        <div className='p-1'><button class="btn" data-bs-target="#exampleModalToggleReport" data-bs-toggle="modal" data-bs-dismiss="modal"><i style={{ fontSize: '15px', color: 'white' }} class="fa fa-file" aria-hidden="true"></i> Generate Monthly Refund Report</button>
                        </div>
                    </div>

                    {/* report model */}

                    <div class="modal fade" id="exampleModalToggleReport" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                        <div class="modal-dialog modal-lg modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalToggleLabel">Monthly Refund transactions Report</h5>
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
                                                                    <strong>REFUND REQUESTED CUSTOMERS <i class="" style={{ fontSize: '13px', color: 'red' }} ></i></strong>
                                                                </p>
                                                                <h5 class="mb-0">
                                                                    {/* <strong>{usersCount}</strong> */}
                                                                    <small class="text-success ms-2">
                                                                        <i class=""></i></small>
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
                                                                    <strong>APPROVED REFUNDS <i class="" style={{ fontSize: '13px', color: 'red' }}></i></strong>
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
                                                                    <strong>Rejected Refunds <i class="" style={{ fontSize: '13px', color: 'red' }}></i></strong>
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
                                                                    <strong>Successfull Trasactions <i class="" style={{ fontSize: '13px', color: 'red' }}></i></strong>
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
                                                                            aria-controls="ex1-pills-1" aria-selected="true">Total Refund Amount</a>
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
            </div>
        </div>
    )
}