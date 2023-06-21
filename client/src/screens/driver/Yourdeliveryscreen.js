import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { updateDeliveryStatus } from '../../actions/driverActions'
import { deleteDeliveryAction } from '../../actions/deliveryActions'
import { Button } from 'react-bootstrap'


let deliveryId;

export default function Yourdeliveryscreen() {
  const dispatch = useDispatch()
  const [delivery, setDelivery] = useState([])


  const userstate = useSelector(state => state.driverloginReducer)
  const { currentDriver } = userstate

  useEffect(() => {
    function getdeliveries() {
      axios.get('/api/delivery/getalldeliveries')
        .then((res) => {
          const allDeliveries = res.data
          const deliveredDeliveries = allDeliveries.filter(delivery => delivery.driverName === currentDriver.name )

          setDelivery(deliveredDeliveries)
        })
        .catch((err) => {
          console.log(err.message)
        })
    }
    getdeliveries()
  }, [])

  //update delivery status
  const [isDeliveryAccepted, updateisDeliveryAccepted] = useState('')

  function updateDStatus(orderId, val) {

      const updateisDeliveryAccepted = {

          isDeliveryAccepted: val
      }



      console.log(updateisDeliveryAccepted , orderId)
      dispatch(updateDeliveryStatus(updateisDeliveryAccepted, orderId ,val))


  }

  //delete delivery
  function deleteDeliveries(deliveryId) {

    dispatch(deleteDeliveryAction(deliveryId));

}


  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <h9 style={{ fontSize: '35px' }}>Your Deliveries</h9>
      <br />
      <div className='row justify-content-center'>
        {delivery.map((delivery) => (
          <div key={delivery.orderId} className='box col-md-8 m-2 p-1  p-3 mb-5 shadow-lg'>
            <div className='flex-container'>
              <div className='text-start w-100 m-1'>
                <h2 style={{ fontSize: '25px' }}>Items</h2>
                <hr />
                {delivery.orderItems.map((item) => (
                  <div key={item._id}>
                    <p>
                      {item.name} [{item.varient}] * {item.quantity} = {item.price}
                    </p>
                  </div>
                ))}
              </div>
              <div className='text-start w-100 m-1'>
                <h2 style={{ fontSize: '25px' }}>Address</h2>
                <hr />
                <p>Street : {delivery.location.street}</p>
                <p>City : {delivery.location.city}</p>
                <p>County : {delivery.location.country}</p>
                {/* <p>Postal Code : {delivery.location.pincode}</p> */}
              </div>
              <div className='text-start w-100 m-1'>
                <h2 style={{ fontSize: '25px' }}>Order Info</h2>
                <hr />
                <p>Rider Name : {delivery.driverName}</p>
                <p>Customer Name : {delivery.customerName}</p>
                <p>Order Amount : {delivery.amount} LKR </p>
                <p>Date : {delivery.createdAt.substring(0, 10)}</p>
                {/* <p>Delivery Id : {delivery._id}</p>
                <p>Order Id : {delivery.orderId}</p> */}
              </div>
            </div>
            <button onClick={() => {
                        updateDStatus(delivery.orderId,false);
                        deleteDeliveries(delivery._id)
                    }} className="btn">CANCEL</button>

          </div>

         
        ))}
      </div>

      <a href="/driver/map" class="btn">Go to locations</a>

    </div>
  )
}