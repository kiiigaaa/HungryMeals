import axios from 'axios'
import Swal from 'sweetalert2'


export const UserFeedBack = (newFeedback) => async dispatch => {

    dispatch({ type: 'USER_FEEDBACK_SENDING' })

    try {
        const response = await axios.post('/api/feedback/post',newFeedback )
       
         console.log(response);
         dispatch({ type: 'USER_FEEDBACK_SUCCESS' })
         setTimeout(function(){
             window.location.reload();
          }, 1500);

        
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        

        Toast.fire({
            icon: 'success',
            title: 'Feedback Added Successfully. Thankyou for your valuble feedback'
        })

        setTimeout(function () {
            window.location.reload('/admin/customers');
        }, 1500);



        console.log(response);
        dispatch({ type: 'DELETE_CUSTOMER_SUCCESS' })

    } catch (error) {
        dispatch({ type: 'USER_FEEDBACK_FAILED' + error, payload: error })
    }
}

// delete user feedback - feedback management
export const deletefeedbackAction = (userId) => async dispatch => {

    dispatch({ type: 'FEEDBACK_DELETE_REQUEST' })


    try {
        const response = await axios.delete(`/api/feedback/delete/feedback/${userId}`)

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
            title: 'Feedback deleted successfully'
        })

        setTimeout(function () {
            window.location.reload('/admin/feedback');
        }, 3500);



        console.log(response);
        dispatch({ type: 'DELETE_CUSTOMER_SUCCESS' })




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


//add to home screen

export const updateDisplayFeedback = (updateDisplayFeedback, userId, val) => async dispatch => {

    dispatch({ type: 'DISPLAY_CUSTOMER_FEEDBACK_REQUEST' })


    if (val === true) {


        try {
            const response = await axios.put(`/api/feedback/update/feedback/display/${userId}`, updateDisplayFeedback)
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
                title: 'Add feedback successfully'
            })
            setTimeout(function () {
                window.location.reload('/admin/customers');
            }, 1500);
           

            console.log(response);
            dispatch({ type: 'DISPLAY_CUSTOMER_FEEDBACK_SUCCESS' })


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
                title: 'Adding feedback unsuccessfully'
            })

            dispatch({ type: 'DISPLAY_CUSTOMER_FEEDBACK_FAILED', payload: error })
        }


    } else {

        try {
            const response = await axios.put(`/api/feedback/update/feedback/display/${userId}`, updateDisplayFeedback)
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
                title: 'Remove feedback successfully'
            })
            setTimeout(function () {
                window.location.reload('/admin/feedback');
            }, 1500);
            


            console.log(response);
            dispatch({ type: 'DISPLAY_CUSTOMER_FEEDBACK_SUCCESS' })


        } catch (error) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'error',
                title: 'Remove Feedback unsuccessfully'
            })

            dispatch({ type: 'DISPLAY_CUSTOMER_FEEDBACK_FAILED', payload: error })
        }
    }


}