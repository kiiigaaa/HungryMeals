import axios from 'axios'
import Swal from 'sweetalert2'

export const setNotification = () => async dispatch => {

    dispatch({ type: 'USER_PUBLIC_NOTIFICATION_REQUEST' })

    try {
        const response = await axios.get('/api/notifications/getnotifications')
        console.log(response);
        // localStorage.setItem('currentNotifications', JSON.stringify(response.data))
        dispatch({ type: 'USER_PUBLIC_NOTIFICATION_SUCCESS', payload: response.data })
       

    } catch (error) {
        dispatch({ type: 'USER_PUBLIC_NOTIFICATION_FAILED' , payload: error })
    }
}

export const updateNotificationAction = (updateNotification) => async dispatch => {

    dispatch({ type: 'UPDATE_PUBLIC_NOTIFICATION_REQUEST' })
    

    try {
        const response = await axios.put('/api/notifications/update/notification/63c378651e3467b26e947c1c', updateNotification)

        if (updateNotification.notificationHeader === 'empty') {
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
                title: 'Public notification remove successfully'
            })
            setTimeout(function () {
                window.location.reload('/admin/notifications');
            }, 1500);
    
            console.log(response);
            dispatch({ type: 'REMOVE_PUBLIC_NOTIFICATION_SUCCESS' })
        }else{
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
                title: 'Public notification updated successfully'
            })
            setTimeout(function () {
                window.location.reload('/admin/notifications');
            }, 1500);
    
            console.log(response);
            dispatch({ type: 'UPDATE_PUBLIC_NOTIFICATION_SUCCESS' })
        }



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
            title: 'Operation failed'
        })

        dispatch({ type: 'PUBLIC_NOTIFICATION_FAILED', payload: error })
    }
}
