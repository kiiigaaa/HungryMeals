import axios from "axios";
import Swal from 'sweetalert2';


export const loginAdmin = (admin) => async dispatch => {

    dispatch({ type: 'ADMIN_LOGIN_REQUEST' })

    try {
        const response = await axios.post('/api/admins/login', admin)
        console.log(response);
        dispatch({ type: 'ADMIN_LOGIN_SUCCESS', payload: response.data })
        localStorage.setItem('currentAdmin', JSON.stringify(response.data))
        window.location.href = '/admin'

    } catch (error) {
        dispatch({ type: 'ADMIN_LOGIN_FAILED', payload: error })
    }
}

export const logoutAdmin = () => dispatch => {

    localStorage.removeItem('currentAdmin')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('currentNotifications')
    window.location.href = 'admin/login'
}


export const addAdmin = (admin) => async dispatch => {

    dispatch({ type: 'ADMIN_ADDED_REQUEST' })

    try {
        const response = await axios.post('/api/admins/addAdmin', admin)
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
            title: 'Admin Registration Successful'
        })
       
        setTimeout(function () {
            window.location.reload('/admin/customers');
        }, 1500);
        console.log(response);
        
        dispatch({ type: 'ADMIN_ADDED_SUCCESS' })

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
            title: 'Admin Registration unsuccessful'
        })

        dispatch({ type: 'ADMIN_ADDED_FAILED', payload: error })
    }
}

////////////////////////////////////////////



export const deleteAdminAction = (adminID) => async dispatch => {

    dispatch({ type: 'ADMIN_DELETE_REQUEST' })


    try {
        const response = await axios.delete(`/api/admins/delete/admin/${adminID}`)

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
            title: 'Admin deleted successfully'
        })

        setTimeout(function () {
            window.location.reload('/admin/customers');
        }, 1500);



        console.log(response);
        dispatch({ type: 'DELETE_ADMIN_SUCCESS' })




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
