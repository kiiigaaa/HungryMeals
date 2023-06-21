import React from 'react'
import axios from 'axios'
import DataTable from "react-data-table-component"
import Swal from 'sweetalert2';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { deletefeedbackAction } from '../actions/feedbackAction';
import { updateDisplayFeedback } from '../actions/feedbackAction';






let userId;
let usersCount;
var feedbackSub, feedbackMessage;
let feedbackArray;
let feedbackCount;
let feedbackPercentage;
let feedbackPercentageRate;

function Feedbackmanagementscreen() {






  const [users, setUsers] = useState([]);
  const [usersforfeedback, setUsersforfeedback] = useState([]);
  const [filterdUsers, setFilterdUsers] = useState([]);
  const [search, setSearch] = useState("");





  useEffect(() => {
    function getFeedbacks() {
      axios.get("/api/feedback/getallfeedbacks").then((res) => {

        setUsers(res.data);
        setFilterdUsers(res.data);

        //feedback count
        feedbackArray = res.data;
        feedbackCount = feedbackArray.length;
        console.log(feedbackCount)


      }).catch((err) => {
        console.log(err.message)

      })
    }
    getFeedbacks();

  }, [])


  axios.get("/api/users/getAllusers").then((res) => {
    setUsersforfeedback(res.data);
    // console.log(res.data)


    usersCount = res.data.length;


  }).catch((err) => {
    console.log(err.message)

  })





  function feedbacks(userId) {


    axios.get("/api/feedback/getallfeedbacks").then((res) => {

      setUsers(res.data);
      console.log(userId)
      //console.log(res.data)


      for (let index = 0; index < res.data.length; index++) {

        if (res.data[index]._id === userId) {
          //console.log(res.data[index].subject)

          //console.log(res.data[index].message)
          feedbackSub = res.data[index].subject
          feedbackMessage = res.data[index].message
        }
      }



    }).catch((err) => {
      console.log(err.message)

    })
  }
  
  //percentagge
  feedbackPercentage=(feedbackCount/usersCount)*100;
  feedbackPercentageRate = feedbackPercentage.toFixed(2)


  // search button
  useEffect(() => {
    const result = users.filter(users => {
      return users.name.toLowerCase().match(search.toLowerCase());
    });

    setFilterdUsers(result);
  }, [search]);


  //delete function

  const dispatch = useDispatch();
  function deleteFeedback(userId) {

    dispatch(deletefeedbackAction(userId));

  }

  const [isDisplayed, updateisDisplayed] = useState('')

    function updateDisplay(userId, val) {

        const updateisDisplayed = {

          isDisplayed: val
        }

        console.log(updateisDisplayed, userId)


        dispatch(updateDisplayFeedback(updateisDisplayed, userId, val))


    }

  //create data table
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
      name: "View",
      cell: row => <button onClick={() => { feedbacks(row._id) }} className="btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop" role="button">View</button>

    },
    {
      name: "Delete",
      cell: row => <button onClick={() => { deleteFeedback(row._id) }} className="btn" role="button">Delete</button>


    },
    {
      name: "Add to Homepage",
      cell: row => <> {row.isDisplayed === true ? (<button onClick={() => { { updateDisplay(row._id, false) } }} className="btn" role="button">Remove</button>) : (<button onClick={() => { { updateDisplay(row._id, true) } }} className="btn" role="button">Add</button>)} </>


    },

  ]





  return (
    <div>

      {/* feedback data table */}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <div className='row justify-content-center'>
        <div className='col-md-9 m-3   p-0 ' >

          <DataTable

            title='Feedback Management '
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

            <div className='p-1'><button class="btn" data-bs-target="#exampleModalToggleReport" data-bs-toggle="modal" data-bs-dismiss="modal"><i style={{ fontSize: '15px', color: 'white' }} class="fa fa-file" aria-hidden="true"></i> Generate Feedback Report</button>
            </div>
          </div>
        </div>
      </div>

      {/* feedback view modal */}




      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">Detailed Infor</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>Feedback Subject</p>

              <p className='text-muted'>{feedbackSub}</p>

              <p>Message</p>

              <p className='text-muted'>{feedbackMessage}</p>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn " data-bs-dismiss="modal">Close</button>

            </div>
          </div>
        </div>
      </div>

      {/* feedback report model */}


      <div class="modal fade" id="exampleModalToggleReport" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalToggleLabel">Feedback Report</h5>
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
                              <strong>ALL ACTIVE USERS <i class="fa-solid fa-circle fa-fade" style={{ fontSize: '13px', color: 'red' }} ></i></strong>
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
                              <strong>Total Feedbacks  <i class="fa-solid fa-circle fa-fade" style={{ fontSize: '13px', color: 'red' }}></i></strong>
                            </p>
                            <h5 class="mb-0">
                              <strong>{feedbackCount}</strong>
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
                              <strong>Percentage Rate <i class="fa-solid fa-circle fa-fade" style={{ fontSize: '13px', color: 'red' }}></i></strong>
                            </p>
                            <h5 class="mb-0">
                              <strong>{feedbackPercentageRate}%</strong>
                              <small class="text-danger ms-2">
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
                              <strong>BOUNCE LIVE RATE <i class="fa-solid fa-circle fa-fade" style={{ fontSize: '13px', color: 'red' }}></i></strong>
                            </p>
                            <h5 class="mb-0">
                              <strong>00.00%</strong>
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
                                  aria-controls="ex1-pills-1" aria-selected="true">No of Approved Feedbacks</a>
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

export default Feedbackmanagementscreen
