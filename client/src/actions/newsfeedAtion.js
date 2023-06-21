import axios from "axios";
import Swal from "sweetalert2";

//Get All News
export const getAllNews = () => async dispatch => {

    dispatch({ type: 'GET_NEWS_REQUEST' })


    try {

        const response = await axios.get('/api/newsfeed/getallnews')
        console.log(response)
        dispatch({ type: 'GET_NEWS_SUCCESS', payload : response.data })

    } catch (error) {

        dispatch({ type: 'GET_NEWS_FAILED', payload : error })
    }

}

//Create News
export const createNewsAction = (newNews) => async dispatch => {

    dispatch({ type: 'USER_NEWS_SENDING' })

    try {
        const response = await axios.post('/api/newsfeed/post/news',newNews )
       
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
            title: 'News posted successfully!'
        })
       
        setTimeout(function () {
            window.location.reload('/admin/newsfeedmanagement');
        }, 1500);
        console.log(response);
        
        dispatch({ type: 'NEWS_CREATED_SUCCESS' })

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
            title: 'News posted unsuccessfully!'
        })
        dispatch({ type: 'CREATE_NEWS_FAILED', payload: error })
    }
}

//Update News
export const updateNewsAction = (updatenews, id) => async dispatch => {

    dispatch({ type: 'UPDATE_NEWS_REQUEST' })

    try {
    
        const response = await axios.put(`/api/newsfeed/update/news/${id}`, updatenews)
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
            title: 'News updated successfully!'
        })
       
        setTimeout(function () {
            window.location.reload('/admin/newsfeedmanagement');
        }, 1500);
        console.log(response);
        
        dispatch({ type: 'UPDATE_NEWS_SUCCESS' })


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
            title: 'News updated unsuccessfully!'
        })
        dispatch({ type: 'UPDATE_NEWS_FAILED', payload: error })
    }
}


//Delete News
export const deleteNewsAction = (newsId) => async dispatch => {

    dispatch({ type: 'NEWS_DELETE_REQUEST' })


    try {
        const response = await axios.delete(`/api/newsfeed/delete/news/${newsId}`)

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
            title: 'News deleted successfully!'
        })

        setTimeout(function () {
            window.location.reload('/admin/newsfeedmanagement');
        }, 1500);



        console.log(response);
        dispatch({ type: 'DELETE_NEWS_SUCCESS' })




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

