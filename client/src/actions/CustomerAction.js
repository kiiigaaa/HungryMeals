import axios from 'axios'
import Swal from 'sweetalert2'

export const deleteCustomerAction = (userId) => async dispatch => {

    dispatch({ type: 'CUSTOMER_DELETE_REQUEST' })


    try {
        const response = await axios.delete(`/api/users/delete/customer/${userId}`)

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
            title: 'Customer deleted successfully'
        })

        setTimeout(function () {
            window.location.reload('/admin/customers');
        }, 1500);



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

//update function

export const updateCustomerName = (updatecustomername, userId) => async dispatch => {

    dispatch({ type: 'UPDATE_USER_NAME_REQUEST' })

    try {
        const response = await axios.put(`/api/users/update/customer/name/${userId}`, updatecustomername)
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
            title: 'Customer Username updated successfully'
        })

        setTimeout(function () {
            window.location.reload('/admin/customers');
        }, 1500);
        console.log(response);

        dispatch({ type: 'UPDATE_CUSTOMER_NAME_SUCCESS' })


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
            title: 'Customer Name updated unsuccessfully'
        })
        dispatch({ type: 'UPDATE_CUSTOMER_NAME_FAILED', payload: error })
    }
}



export const updateCustomerEmail = (updatecustomeremail, userId) => async dispatch => {

    dispatch({ type: 'UPDATE_CUSTOMER_EMAIL_REQUEST' })



    try {
        const response = await axios.put(`/api/users/update/customer/email/${userId}`, updatecustomeremail)
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
            window.location.reload('/admin/customers');
        }, 1500);

        console.log(response);
        dispatch({ type: 'UPDATE_CUSTOMER_EMAIL_SUCCESS' })


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

        dispatch({ type: 'UPDATE_CUSTOMER_EMAIL_FAILED', payload: error })
    }

}



export const updateCustomerPassword = (updatecustomerpassword, userId) => async dispatch => {

    dispatch({ type: 'UPDATE_CUSTOMER_PASSWORD_REQUEST' })

    try {
        const response = await axios.put(`/api/users/update/customer/password/${userId}`, updatecustomerpassword)
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
            title: 'Password updated successfully'
        })
        setTimeout(function () {
            window.location.reload('/admin/customers');
        }, 1500);

        console.log(response);
        dispatch({ type: 'UPDATE_CUSTOMER_PASSWORD_SUCCESS' })


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
            title: 'Password updated unsuccessfully'
        })

        dispatch({ type: 'UPDATE_CUSTOMER_PASSWORD_FAILED', payload: error })
    }
}

export const updateCustomerVerification = (updatecustomerverification, userId, val) => async dispatch => {

    dispatch({ type: 'UPDATE_CUSTOMER_VERIFICATION_REQUEST' })


    if (val === true) {


        try {
            const response = await axios.put(`/api/users/update/customer/verification/${userId}`, updatecustomerverification)
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
                title: 'Enable Verified user successfully'
            })
            setTimeout(function () {
                window.location.reload('/admin/customers');
            }, 1500);
           

            console.log(response);
            dispatch({ type: 'UPDATE_CUSTOMER_VERIFICATION_SUCCESS' })


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
                title: 'Enable Verified user unsuccessfully'
            })

            dispatch({ type: 'UPDATE_CUSTOMER_VERIFICATION_FAILED', payload: error })
        }


    } else {

        try {
            const response = await axios.put(`/api/users/update/customer/verification/${userId}`, updatecustomerverification)
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
                title: 'Disable Verified user successfully'
            })
            setTimeout(function () {
                window.location.reload('/admin/customers');
            }, 1500);
            


            console.log(response);
            dispatch({ type: 'UPDATE_CUSTOMER_VERIFICATION_SUCCESS' })


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
                title: 'Disable Verified user unsuccessfully'
            })

            dispatch({ type: 'UPDATE_CUSTOMER_VERIFICATION_FAILED', payload: error })
        }
    }


}

export const addUser = (user) => async dispatch => {

    dispatch({ type: 'CUSTOMER_ADDED_REQUEST' })

    try {
        const response = await axios.post('/api/users/addcustomer', user)
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
            title: 'Customer addded successfully'
        })
       
        setTimeout(function () {
            window.location.reload('/admin/customers');
        }, 1500);
        console.log(response);
        
        dispatch({ type: 'CUSTOMER_ADDED_SUCCESS' })

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
            title: 'Customer added unsuccessfully'
        })

        dispatch({ type: 'CUSTOMER_ADDED_FAILED', payload: error })
    }
}

