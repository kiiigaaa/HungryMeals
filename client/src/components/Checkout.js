import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout'
import { placeOrder } from '../actions/orderActions';
import Loading from "../components/Loading"
import Success from "../components/Success"
import Error from "../components/Error"
import Swal from "sweetalert2";



//changed

export default function Checkout({ subtotal,coordinates }) {

    const userstate = useSelector(state => state.loginUserReducer)
    const { currentUser } = userstate
    const adminloginstate = useSelector(state => state.adminloginReducer)
    const { currentAdmin } = adminloginstate
    const orderstate = useSelector((state) => state.placeOrderReducer)
    const { loading, error, success } = orderstate
    const dispatch = useDispatch()
    function tokenHandler(token) {

        console.log(token);
        //changed
        dispatch(placeOrder(token, subtotal,coordinates))


    }


    function logintopay() {

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
            title: 'Please login to Checkout'
        })
        setTimeout(function () {
            window.location.replace('/login');
        }, 1500);
    }

    function admintestpay() {
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
            icon: 'success',
            title: 'PayNow Working Successfully'
        })


    }

    return (

        <div>
            {loading && (<Loading />)}
            {error && (<Error error='Something went wrong' />)}
            {success && (<Success success='Your Order Placed Successfully' />)}



            {currentUser ? (<StripeCheckout
                amount={subtotal * 100}
                shippingAddress
                token={tokenHandler}
                stripeKey="pk_test_GlFtmasU7tmBohUIk7vMbEnf00NA3VYaa0"
                currency='LKR'
            >
                <button className='btn'>Pay Now</button>
            </StripeCheckout>
            ) : (


                <button onClick={logintopay} className='btn'>Pay Now</button>

            ) && currentAdmin ? (<button onClick={admintestpay} className='btn'>Pay Now</button>) : (

                <button onClick={logintopay} className='btn'>Pay Now</button>


            )}


        </div>
    )
}