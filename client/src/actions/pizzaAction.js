import axios from "axios";
import Swal from "sweetalert2";





//Add new foods
export const addFoodsAction = (newFoods) => async dispatch => {

    dispatch({ type: 'NEW_FOOD_SENDING' })

    try {
        const response = await axios.post('/api/pizzas/add/food',newFoods )
       
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
            title: 'Food added successfully!'
        })
       
        setTimeout(function () {
            window.location.reload('/admin/newsfeedmanagement');
        }, 1500);
        console.log(response);
        
        dispatch({ type: 'FOODSD_ADDED_SUCCESS' })

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
            title: 'Food added unsuccessfully!'
        })
        dispatch({ type: 'FOOD_ADDED_FAILED', payload: error })
    }
}

export const getAllPizzas = () => async dispatch => {

    dispatch({ type: 'GET_PIZZAS_REQUEST' })


    try {

        const response = await axios.get('/api/pizzas/getallpizzas')
        console.log(response)
        dispatch({ type: 'GET_PIZZAS_SUCCESS', payload : response.data })

    } catch (error) {

        dispatch({ type: 'GET_PIZZAS_FAILED', payload : error })
    }
    

}

//Update Foods
export const updateFoodsAction = (updatefoods, id) => async dispatch => {

    dispatch({ type: 'UPDATE_FOODS_REQUEST' })

    try {
    
        const response = await axios.put(`/api/pizzas/update/food/${id}`, updatefoods)
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
            title: 'Foods updated successfully!'
        })
       
        setTimeout(function () {
            window.location.reload('/admin/addfoodcatalogue');
        }, 1500);
        console.log(response);
        
        dispatch({ type: 'UPDATE_FOODS_SUCCESS' })


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
            title: 'Foods updated unsuccessfully!'
        })
        dispatch({ type: 'UPDATE_FOODS_FAILED', payload: error })
    }
}

//Delete Foods
export const deleteFoodsAction = (foodId) => async dispatch => {

    dispatch({ type: 'FOOD_DELETE_REQUEST' })


    try {
        const response = await axios.delete(`/api/pizzas/delete/food/${foodId}`)

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
            title: 'Food deleted successfully!'
        })

        setTimeout(function () {
            window.location.reload('/admin/newsfeedmanagement');
        }, 1500);



        console.log(response);
        dispatch({ type: 'DELETE_FOOD_SUCCESS' })




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
