import axios from "axios";
import Swal from "sweetalert2";


//Delete Delivery
export const deleteDeliveryAction = (deliveryId) => async dispatch => {

    dispatch({ type: 'DELIVERY_DELETE_REQUEST' })


    try {
        const response = await axios.delete(`/api/delivery/delete/delivery/${deliveryId}`)

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
            title: 'Delivery deleted successfully!'
        })

        setTimeout(function () {
            window.location.reload('/driver/delivery');
        }, 1500);



        console.log(response);
        dispatch({ type: 'DELETE_DELIVERY_SUCCESS' })




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