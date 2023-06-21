import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { updatetickets } from "../../actions/ticketsActions";
import Swal from "sweetalert2";
import { TicketForm } from "../../actions/ticketsActions";
export default function TicketsScreen() {

    const dispatch = useDispatch()

    const [tickettitle, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [description, setdescription] = useState('')
    const [email, setemail] = useState('')
    const [telephone, settelephone] = useState('')

    const userstate = useSelector(state => state.loginUserReducer)
    const { currentUser } = userstate

    let userId = currentUser._id;



    function updateTickets(userId) {
        console.log(userId)

        const updateTickets = {

            tickettitle,
            category,
            description,
            email,
            telephone


        }

        console.log(updateTickets)
        dispatch(updatetickets(updateTickets, userId))


    }
    function raiseTicket() {

        const newTicket = {
            tickettitle,
            category,
            description,
            email,
            telephone
        }
        if (tickettitle.trim().length !== 0 && category.trim().length !== 0 && description.trim().length !== 0 && email.trim().length !== 0) {
    
          dispatch(TicketForm(newTicket))
    
        }
        else {
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
            title: 'Please fill out required fields !'
          })
        }
    
    
    
    
    
      }
    






    return (

        <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className='row justify-content-center'>
                <div className="col-md-5 mt-5 text-start shadow p-3 mb-5 bg-white rounded">
                    <h9 style={{ fontSize: '35px' }}>Customer Support-Ticket Raising Form</h9>
                    <br /><br />
                    <form class="row g-3">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Type the Title here</label><br />
                            <input
                                type="text"
                                class="form-control"
                                id="exampleFormControlInput1"
                                placeholder=""
                                value={tickettitle}
                                onChange={(e) => { setTitle(e.target.value) }}

                            />
                        </div><br />
                        <div class="col-md-4">
                            <label for="inputState" class="form-label">Select Tickets Category</label><br />
                            <select id="inputState" class="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option selected>Choose...</option>
                                <option value="Orders">Orders</option>
                                <option value="Refunds">Refunds</option>
                                <option value="Payments">Payments</option>
                                <option value="Delivery">Delivery</option>

                            </select>


                        </div><br />

                        <div class="form-group">
                            <label for="exampleFormControlTextarea1">Description</label><br />
                            <textarea
                                class="form-control"
                                id="exampleFormControlTextarea1"
                                rows="3"
                                value={description}
                                onChange={(e) => { setdescription(e.target.value) }}

                            ></textarea>
                        </div>
                        <br />
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Email</label><br />
                            <input
                                type="text"
                                class="form-control"
                                id="exampleFormControlInput1"
                                placeholder=""
                                value={email}
                                onChange={(e) => { setemail(e.target.value) }}

                            />
                        </div>
                        <br />
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Telephone</label><br />
                            <input
                                type="text"
                                class="form-control"
                                id="exampleFormControlInput1"
                                placeholder=""
                                value={telephone}
                                onChange={(e) => { settelephone(e.target.value) }}

                            />
                        </div>
                    </form>
                    <br />
                    {/* <button onClick={() => updateTickets(userId)} className="btn mt-3 mb-3 " >SUBMIT</button> */}
                    <div class="col-12">
                        <button type="submit" onClick={raiseTicket} class="btn ">Submit</button>
                    </div>

                </div>


            </div>
            <br />

        </div>
    )
}