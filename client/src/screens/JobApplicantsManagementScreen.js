import React from 'react'
import axios from 'axios'
import DataTable from "react-data-table-component"
import Swal from 'sweetalert2';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { deleteApplicantAction } from '../actions/jobApplicantAction';

function JobApplicantsManagementScreen() {









  const [applicants, setApplicants] = useState([]);
  const [filterdApplicants, setFilterdApplicants] = useState([]);
  const [searchApplicant, setSearchApplicant] = useState("");




  useEffect(() => {

    function getJobs() {

      axios.get("/api/jobapply/getallApplications").then((res) => {
        setApplicants(res.data);
        console.log(res.data)


        setFilterdApplicants(res.data);


      }).catch((err) => {
        console.log(err.message)

      })
    }

    getJobs();

  }, [])



  const columns = [
    {
      name: "Applicant ID",
      selector: (row) => row._id,
      sortable: true
    },

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
      name: "Address",
      selector: (row) => row.address,

    },
    {
      name: "Phone No",
      selector: (row) => row.phoneNo,

    },
    {
      name: "Job Category",
      selector: (row) => row.jobCategory,

    },
    {
      name: "Delete",
      cell: row => <button onClick={() => { deleteApplicant(row._id) }} className="btn" role="button">Delete</button>


    },


  ]



  // search button
  useEffect(() => {
    const results = applicants.filter(applicants => {
      return applicants._id.toLowerCase().match(searchApplicant.toLowerCase());
    });

    setFilterdApplicants(results);
  }, [searchApplicant]);

  //delete
  const dispatch = useDispatch();

  function deleteApplicant(ApplicantId) {

    dispatch(deleteApplicantAction(ApplicantId));


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
          <DataTable

            title='Job Applicants Management'
            columns={columns}
            data={filterdApplicants}
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
                value={searchApplicant}
                onChange={(e) => setSearchApplicant(e.target.value)}

              />

            }


          />
          <br />
          <br />
          <div className='modal-footer'>
            {/* <div className='p-1'>
                            <button class="btn" data-bs-target="#addnewjob" data-bs-toggle="modal" data-bs-dismiss="modal"><i style={{ fontSize: '15px', color: 'white' }} class="fa fa-plus" aria-hidden="true"></i>Create a New Job</button>
                        </div> */}

            {/* generate report button */}
            <div className='p-1'><button class="btn" data-bs-target="#exampleModalToggleReport" data-bs-toggle="modal" data-bs-dismiss="modal"><i style={{ fontSize: '15px', color: 'white' }} class="fa fa-file" aria-hidden="true"></i> Generate  Report</button>
            </div>
            <br />
            <div className='p-1'>
              <a href="/admin/jobportalManage" className="btn">
                <i style={{ fontSize: '15px', color: 'white' }} aria-hidden="true"></i>Go to Job Lists
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* generate report */}

      <div class="modal fade" id="exampleModalToggleReport" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalToggleLabel"> Detailed Report about Job Applicants</h5>
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
                                                            <strong>Total Job Applicants <i class="fa-solid fa-circle fa-fade" style={{ fontSize: '13px', color: 'red' }} ></i></strong>
                                                        </p>
                                                        <h5 class="mb-0">
                                                            <strong>{ }</strong>
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
                                                            <strong>Administrative section <i class="fa-solid fa-circle fa-fade" style={{ fontSize: '13px', color: 'red' }}></i></strong>
                                                        </p>
                                                        <h5 class="mb-0">
                                                            <strong>{ }</strong>
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
                                                            <strong>General Section <i class="fa-solid fa-circle fa-fade" style={{ fontSize: '13px', color: 'red' }}></i></strong>
                                                        </p>
                                                        <h5 class="mb-0">
                                                            <strong>{ }%</strong>
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
                                                            <strong>Inventory section <i class="fa-solid fa-circle fa-fade" style={{ fontSize: '13px', color: 'red' }}></i></strong>
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
                                                        <p class="text-center"><strong>Deleted/Rejeted applications</strong></p>
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
  )
}

export default JobApplicantsManagementScreen