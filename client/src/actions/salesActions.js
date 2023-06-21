import axios from "axios";
import Swal from 'sweetalert2'

export const updateStatusAction = (updatestatus, salesid, val) => async dispatch => {

    dispatch({ type: 'UPDATE_TRASACTION_STATUS' })


    if (val === true) {


        try {
            const response = await axios.put(`/api/orders/update/transactionstatus/${salesid}`, updatestatus)
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
                title: 'Enable status successfully'
            })
            setTimeout(function () {
                window.location.reload('/admin/orders');
            }, 1500);
           

            console.log(response);
            dispatch({ type: 'UPDATE_TRANSACTION_STATUS_SUCCESS' })


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
                title: 'Enable status unsuccessfully'
            })

            dispatch({ type: 'UPDATE_TRANSACTION_STATUS_FAILED', payload: error })
        }


    } else {

        try {
            const response = await axios.put(`/api/orders/update/transactionstatus/${salesid}`, updatestatus)
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
                title: 'Disable transaction status successfully'
            })
            setTimeout(function () {
                window.location.reload('/admin/orders');
            }, 1500);
            


            console.log(response);
            dispatch({ type: 'UPDATE_TRANSACTION_STATUS_SUCCESS' })


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
                title: 'Disable status unsuccessfully'
            })

            dispatch({ type: 'UPDATE_TRANSACTION_STATUS_FAILED', payload: error })
        }
    }


}