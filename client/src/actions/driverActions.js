import axios from "axios";
import Swal from "sweetalert2";


export const loginDriver = (driver) => async dispatch => {

    dispatch({ type: 'DRIVER_LOGIN_REQUEST' })

    try {
        const response = await axios.post('/api/delivery/login', driver)
        console.log(response);
        dispatch({ type: 'DRIVER_LOGIN_SUCCESS', payload: response.data })
        localStorage.setItem('currentDriver', JSON.stringify(response.data))
        window.location.href = '/driver'

    } catch (error) {
        dispatch({ type: 'DRIVER_LOGIN_FAILED', payload: error })
    }
}

export const logoutDriver = () => dispatch => {

    localStorage.removeItem('currentDriver')
    localStorage.removeItem('currentNotifications')
    window.location.href = '/driver/login'
}


export const updateDeliveryStatus = (updateisDeliveryAccepted, orderId , val) => async dispatch => {

    if(val === true){

        dispatch({ type: 'UPDATE_DELIVERY_ACCEPT_REQUEST' })

        console.log(updateisDeliveryAccepted)
        try {
            const response = await axios.put(`/api/delivery/update/status/delivery/${orderId}`, updateisDeliveryAccepted)
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
                title: 'Delivery Accepted !'
            })
            setTimeout(function () {
                window.location.href = '/driver/delivery'
            }, 1500);
    
    
            console.log(response);
            dispatch({ type: 'UPDATE_DELIVERY_ACCEPT_SUCCESS' })
    
    
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
                title: 'Operation failed!'
            })
    
            dispatch({ type: 'UPDATE_DELIVERY_ACCEPT_FAILED', payload: error })
    
    
    
        }

    }else{

        dispatch({ type: 'UPDATE_DELIVERY_ACCEPT_REQUEST' })

        console.log(updateisDeliveryAccepted)
        try {
            const response = await axios.put(`/api/delivery/update/status/delivery/${orderId}`, updateisDeliveryAccepted)
            
            console.log(response);
            dispatch({ type: 'UPDATE_DELIVERY_ACCEPT_SUCCESS' })
    
    
        } catch (error) {
           
            dispatch({ type: 'UPDATE_DELIVERY_ACCEPT_FAILED', payload: error })
    
    
    
        }



    }
    


}

export const newDeliveryAction = (newDelivery) => async dispatch => {

    dispatch({ type: 'DELIVERY_STATUS_SENDING' })

    try {
        const response = await axios.post('/api/delivery/post/delivery',newDelivery )
       
        console.log(response);
        dispatch({ type: 'DELIVERY_STATUS_SUCCESS' })
        
        setTimeout(function(){
            window.location.reload();
         }, 1500);

    } catch (error) {
        dispatch({ type: 'DELIVERY_STATUS_FAILED' + error, payload: error })
    }
}