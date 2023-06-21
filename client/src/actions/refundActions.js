import axios from "axios";
import Swal from 'sweetalert2'

export const addRefund = (refund)=>async dispatch=>{
    dispatch({type:'ADD_REFUND_TRANSACTION'})
    try{
        const response= await axios.post('/api/refunds/addrefund', {refund})
        console.log(response);
        dispatch({type:'ADD_REFUND_SUCCESS'})
    } catch(error){
        dispatch({type:'ADD_REFUND_FAILED', payload : error})
    }
}


export const getAllRefunds = ()=>async dispatch=>{
    dispatch({type:'GET_ALLREFUNDS_REQUEST'})
    try{
        const response= await axios.get('/api/refunds/getallrefunds')
        console.log(response);
        dispatch({type:'GET_ALLREFUNDS_SUCCESS', payload : response.data})
    } catch(error){
        dispatch({type:'GET_ALLREFUNDS_FAILED', payload : error})
    }
}

export const updateStatusAction = (updatestatus, refundid, val) => async dispatch => {

    dispatch({ type: 'UPDATE_REFUND_REQUEST' })


    if (val === true) {


        try {
            const response = await axios.put(`/api/refunds/update/pendingrefund/${refundid}`, updatestatus)
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
                window.location.reload('/admin/refunds');
            }, 1500);
           

            console.log(response);
            dispatch({ type: 'UPDATE_REFUND_STATUS_SUCCESS' })


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

            dispatch({ type: 'UPDATE_REFUND STATUS_FAILED', payload: error })
        }


    } else {

        try {
            const response = await axios.put(`/api/refunds/update/pendingrefund/${refundid}`, updatestatus)
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
                title: 'Disable refund status successfully'
            })
            setTimeout(function () {
                window.location.reload('/admin/refunds');
            }, 1500);
            


            console.log(response);
            dispatch({ type: 'UPDATE_REFUND_STATUS_SUCCESS' })


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

            dispatch({ type: 'UPDATE_REFUND_STATUS_FAILED', payload: error })
        }
    }


}

export const deleteRefundTransactionAction = (refundid) => async dispatch => {

    dispatch({ type: 'REFUND_TRANSACTION_DELETE_REQUEST' })


    try {
        const response = await axios.delete(`/api/refunds/delete/Refund/${refundid}`)

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
            title: 'Refund Transaction Deleted Successfully'
        })

        setTimeout(function () {
            window.location.reload('/admin/refunds');
        }, 1500);



        console.log(response);
        dispatch({ type: 'DELETE_REFUND_TRANSACTION_SUCCESS' })




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