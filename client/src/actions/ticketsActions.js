import axios from 'axios'
import Swal from "sweetalert2";





export const updatetickets = (updateticket,id) => async dispatch => {

    dispatch({ type: 'UPDATE_USER_NAME_REQUEST' })

    try {
        const response = await axios.put(`/api/tickets/${id}`, updateticket)
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
            title: 'Ticket submitted successfully'
        })
       
        setTimeout(function () {
            window.location.reload('/tickets');
        }, 1500);
        console.log(response);
        
        dispatch({ type: 'UPDATE_TICKETS_SUCCESS' })


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
            title: 'Ticket submitted unsuccessfully'
        })
        dispatch({ type: 'UPDATE_TICKETS_FAILED', payload: error })
    }
}

export const deleteTicketAction = (TicketId) => async dispatch => {

    dispatch({ type: 'TICKET_DELETE_REQUEST' })


    try {
        const response = await axios.delete(`/api/tickets/delete/tickets/${TicketId}`)

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
            title: 'Ticket deleted successfully'
        })

        setTimeout(function () {
            window.location.reload('/admin/ticketsmanage');
        }, 1500);



        console.log(response);
        dispatch({ type: 'DELETE_TICKET_SUCCESS' })




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


export const TicketForm = (newTicket) => async dispatch => {

    dispatch({ type: 'TICKET_APPLICATION_SENDING' })

    try {
        const response = await axios.post('/api/tickets/post',newTicket )
       
        console.log(response);
        dispatch({ type: 'TICKET_APPLICATION_SUCCESS' })
        setTimeout(function(){
            window.location.reload();
         }, 1500);

    } catch (error) {
        dispatch({ type: 'TICKET_APPLICATION_FAILED' + error, payload: error })
    }
}