import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserOrders,
  updateuserrefundrequestAction,
} from "../actions/orderActions";
import Loading from "../components/Loading";
import Error from "../components/Error";

let orderId;

export default function Ordersscreen() {
  const dispatch = useDispatch();
  const orderstate = useSelector((state) => state.getUserOrdersReducer);
  const { orders, error, loading } = orderstate;

  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  //update isDeliverd orders
  const [orderStatus, updateorderStatus] = useState("");

  function updateOrderDelivery(orderId, val) {
    const updateorderStatus = {
      orderStatus: val,
    };
    console.log(orderId, val);
    dispatch(updateuserrefundrequestAction(updateorderStatus, orderId));
  }

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />

      <h2 style={{ fontSize: "35px" }}>My Orders</h2>
      <br />
      <div className="row justify-content-center">
        {loading && <Loading />}
        {error && <Error error="Something went wrong" />}
        {orders &&
          orders.map((order) => {
            return (
              <div className="box col-md-8 m-2 p-1  p-3 mb-5 shadow-lg">
                <div className="flex-container">
                  <div className="text-start w-100 m-1">
                    <h2 style={{ fontSize: "25px" }}>Items</h2>
                    <hr />
                    {order.orderItems.map((item) => {
                      return (
                        <div>
                          <p>
                            {item.name} [{item.varient}] * {item.quantity} ={" "}
                            {item.price}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="text-start w-100 m-1">
                    <h2 style={{ fontSize: "25px" }}>Address</h2>
                    <hr />
                    <p>Street : {order.shippingAddress.street}</p>
                    <p>City : {order.shippingAddress.city}</p>
                    <p>County : {order.shippingAddress.country}</p>
                    <p>Postal Code : {order.shippingAddress.pincode}</p>
                  </div>

                  <div className="text-start w-100 m-1">
                    <h2 style={{ fontSize: "25px" }}>Order Info</h2>
                    <hr />
                    <p>Order Amount : {order.orderAmount} LKR </p>
                    <p>date : {order.createdAt.substring(0, 10)}</p>
                    <p>Transaction Id : {order.transactionId}</p>
                    <p>Order Id : {order._id}</p>
                  </div>
                </div>
                {order.orderStatus ? (
                  order.isSuccessfull ? (
                    <span className="badge bg-success">Refund Successfull</span>
                  ) : (
                    <span className="badge bg-warning">
                      Cancellation Processing
                    </span>
                  )
                ) : (
                  <button
                    onClick={() => updateOrderDelivery(order._id, true)}
                    className="btn"
                    role="button"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
