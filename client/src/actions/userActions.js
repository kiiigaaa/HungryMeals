import axios from 'axios'
import Swal from "sweetalert2";

export const registerUser = (user) => async dispatch => {

    dispatch({ type: 'USER_REGISTER_REQUEST' })

    try {
        const response = await axios.post('/api/users/register', user)
        console.log(response);
        dispatch({ type: 'USER_REGISTER_SUCCESS' })

    } catch (error) {
        dispatch({ type: 'USER_REGISTER_FAILED', payload: error })
    }
}


//login action
export const loginUser = (user) => async dispatch => {

    dispatch({ type: 'USER_LOGIN_REQUEST' })

    try {
        const response = await axios.post('/api/users/login', user)
        console.log(response);
        dispatch({ type: 'USER_LOGIN_SUCCESS', payload: response.data })
        localStorage.setItem('currentUser', JSON.stringify(response.data))
        window.location.href = '/'

    } catch (error) {
        dispatch({ type: 'USER_LOGIN_FAILED', payload: error })
    }
}

export const logoutUser = () => dispatch => {

    localStorage.removeItem('currentUser')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('currentNotifications')
    window.location.href = '/login'
}


//update actions

export const updateUserName = (updatename, id) => async dispatch => {

    dispatch({ type: 'UPDATE_USER_NAME_REQUEST' })

    try {
        const response = await axios.put(`/api/users/update/name/${id}`, updatename)
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
            title: 'Username updated successfully'
        })
       
        setTimeout(function () {
            window.location.reload('/profile');
        }, 1500);
        console.log(response);
        
        dispatch({ type: 'UPDATE_USER_NAME_SUCCESS' })


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
            title: 'Email updated unsuccessfully'
        })
        dispatch({ type: 'UPDATE_USER_NAME_FAILED', payload: error })
    }
}



export const updateUserEmail = (updateemail, id) => async dispatch => {

    dispatch({ type: 'UPDATE_USER_EMAIL_REQUEST' })

    try {
        const response = await axios.put(`/api/users/update/email/${id}`, updateemail)
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
            title: 'Email updated successfully'
        })
        setTimeout(function () {
            window.location.reload('/profile');
        }, 1500);

        console.log(response);
        dispatch({ type: 'UPDATE_USER_EMAIL_SUCCESS' })


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
            title: 'Email updated unsuccessfully'
        })

        dispatch({ type: 'UPDATE_USER_EMAIL_FAILED', payload: error })
    }
}



export const updateNotificationOneAction = (updateNotificationOne, userId) => async dispatch => {

    dispatch({ type: 'UPDATE_USER_NOTIFICATION_ONE_REQUEST' })
    

    try {
       
        const response = await axios.put(`/api/users/update/notificationOne/${userId}`, updateNotificationOne)
       
        if (updateNotificationOne.notificationOneHeader === 'empty') {
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
                title: 'Notification Deleted!'
            })
            setTimeout(function () {
                window.location.reload('/admin/notifications');
            }, 1500);
    
            console.log(response);
            dispatch({ type: 'REMOVE_USER_NOTIFICATION_ONE_SUCCESS' })
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
                title: 'Notification One updated successfully'
            })
            setTimeout(function () {
                window.location.reload('/admin/notifications');
            }, 1500);
    
            console.log(response);
            dispatch({ type: 'UPDATE_USER_NOTIFICATION_ONE_SUCCESS' })
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

        dispatch({ type: 'NOTIFICATION_FOUR_OPERATION_FAILED', payload: error })
    }
}





export const updateNotificationTwoAction = (updateNotificationTwo, userId) => async dispatch => {

    dispatch({ type: 'UPDATE_USER_NOTIFICATION_TWO_REQUEST' })
    

    try {
        const response = await axios.put(`/api/users/update/notificationTwo/${userId}`, updateNotificationTwo)

        if (updateNotificationTwo.notificationTwoHeader === 'empty') {
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
                title: 'Notification Deleted!'
            })
            setTimeout(function () {
                window.location.reload('/admin/notifications');
            }, 1500);
    
            console.log(response);
            dispatch({ type: 'REMOVE_USER_NOTIFICATION_TWO_SUCCESS' })
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
                title: 'Notification Two updated successfully'
            })
            setTimeout(function () {
                window.location.reload('/admin/notifications');
            }, 1500);
    
            console.log(response);
            dispatch({ type: 'UPDATE_USER_NOTIFICATION_TWO_SUCCESS' })
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

        dispatch({ type: 'NOTIFICATION_TWO_OPERATION_FAILED', payload: error })
    }
}



export const updateNotificationThreeAction = (updateNotificationThree, userId) => async dispatch => {

    dispatch({ type: 'UPDATE_USER_NOTIFICATION_THREE_REQUEST' })
    

    try {
        const response = await axios.put(`/api/users/update/notificationThree/${userId}`, updateNotificationThree)

        if (updateNotificationThree.notificationThreeHeader === 'empty') {
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
                title: 'Notification Deleted!'
            })
            setTimeout(function () {
                window.location.reload('/admin/notifications');
            }, 1500);
    
            console.log(response);
            dispatch({ type: 'REMOVE_USER_NOTIFICATION_THREE_SUCCESS' })
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
                title: 'Notification Deleted!'
            })
            setTimeout(function () {
                window.location.reload('/admin/notifications');
            }, 1500);
    
            console.log(response);
            dispatch({ type: 'UPDATE_USER_NOTIFICATION_THREE_SUCCESS' })
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

        dispatch({ type: 'NOTIFICATION_THREE_OPERATION_FAILED', payload: error })
    }
}



export const updateNotificationFourAction = (updateNotificationFour, userId) => async dispatch => {

    dispatch({ type: 'UPDATE_USER_NOTIFICATION_FOUR_REQUEST' })
    

    try {
        const response = await axios.put(`/api/users/update/notificationFour/${userId}`, updateNotificationFour)

        if (updateNotificationFour.notificationFourHeader === 'empty') {
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
                title: 'Notification Deleted!'
            })
            setTimeout(function () {
                window.location.reload('/admin/notifications');
            }, 1500);
    
            console.log(response);
            dispatch({ type: 'REMOVE_USER_NOTIFICATION_FOUR_SUCCESS' })
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
                title: 'Notification Deleted!'
            })
            setTimeout(function () {
                window.location.reload('/admin/notifications');
            }, 1500);
    
            console.log(response);
            dispatch({ type: 'UPDATE_USER_NOTIFICATION_FOUR_SUCCESS' })
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

        dispatch({ type: 'NOTIFICATION_FOUR_OPERATION_FAILED', payload: error })
    }
}
