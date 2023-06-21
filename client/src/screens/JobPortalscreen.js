import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Jobs from "../components/Jobs";
import { getAllJobs } from './../actions/jobportalAction';
import { getAllJobsReducer } from './../reducers/jobsReducer';



function JobPortalscreen() {

  const dispatch = useDispatch()

  const jobsstate = useSelector(state => state.getAllJobsReducer)
  const [currentFeedbacks, setFeedbacks] = useState([]);
  const { jobs, error, loading } = jobsstate

  useEffect(() => {
    dispatch(getAllJobs())
  }, [])


  return (
    <div>

      <br />
      <br />
      <br />

      <div class="jumbotron img-jmbo">
        <div class="container p-3">
          <br />
          <br />
          <br />
          <h10 style={{ fontSize: "45px", color: "white" }}>
            Career Portal
            {/* <h1>Current Time: {time}</h1> */}
          </h10>
          <p style={{ fontSize: "14px", color: "white" }}>“Discover your dream job with our career Feed, featuring a wide range of exciting opportunities in food industry with the collaboration of Hungry Meals”</p>
          <br />
        </div>
      </div>


      {loading ? (<Loading />) : error ? (<Error error='Something went wrong' />) : (
        <div className='d-flex flex-wrap justify-content-center'>
          {jobs.map(jobs => (
            <div className='col-md-3 m-3' key={jobs._id}>
              <div>
                <Jobs jobs={jobs} />
              </div>
            </div>
          ))}
        </div>
      )}

    </div>


  )
}

export default JobPortalscreen
