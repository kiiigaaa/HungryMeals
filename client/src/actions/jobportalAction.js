import axios from "axios";
import Swal from "sweetalert2";

export const getAllJobs = () => async dispatch => {

    dispatch({ type: 'GET_JOBS_REQUEST' })


    try {

        const response = await axios.get('/api/jobportal/getalljobs')
        console.log(response)
        dispatch({ type: 'GET_JOBS_SUCCESS', payload : response.data })

    } catch (error) {

        dispatch({ type: 'GET_JOBS_FAILED', payload : error })
    }

}

export const deleteJobAction = (JobID) => async dispatch => {

    dispatch({ type: 'JOB_DELETE_REQUEST' })


    try {
        const response = await axios.delete(`/api/jobportal/delete/jobs/${JobID}`)

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
            icon: 'success',
            title: 'Job deleted successfully'
        })

        setTimeout(function () {
            window.location.reload('/admin/jobportalManage');
        }, 1500);



        console.log(response);
        dispatch({ type: 'DELETE_JOB_SUCCESS' })




    } catch (error) {

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
            title: 'Unsuccessful Operation'
        })


        dispatch({ type: 'DELETE_OPERATION_FAILED', payload: error })
    }
}

//create new job
export const addJob = (job) => async dispatch => {

    dispatch({ type: 'JOB_ADDED_REQUEST' })

    try {
        const response = await axios.post('/api/jobportal/post/jobs', job)
        console.log(response);

        
        
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
            icon: 'success',
            title: 'Job addded successfully'
        })
       
        setTimeout(function () {
            window.location.reload('/admin/jobportalManage');
        }, 1500);
        console.log(response);
        
        dispatch({ type: 'JOB_ADDED_SUCCESS' })

    } catch (error) {
        
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
            title: 'Job added unsuccessfully'
        })

        dispatch({ type: 'JOB_ADDED_FAILED', payload: error })
    }
}

//Update jobs
export const updateJobsAction = (updatejobs, id) => async dispatch => {

    dispatch({ type: 'UPDATE_JOBS_REQUEST' })

    try {
    
        const response = await axios.put(`/api/jobportal/update/jobs/${id}`, updatejobs)
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
            icon: 'success',
            title: 'Jobs updated successfully!'
        })
       
        setTimeout(function () {
            window.location.reload('/admin/jobportalManage');
        }, 1500);
        console.log(response);
        
        dispatch({ type: 'UPDATE_JOB_SUCCESS' })


    } catch (error) {

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
            title: 'Jobs updated unsuccessfully!'
        })
        dispatch({ type: 'UPDATE_JOBS_FAILED', payload: error })
    }
}