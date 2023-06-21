import React from 'react'
import axios from 'axios'
import DataTable from "react-data-table-component"
import Swal from 'sweetalert2';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { deleteOrderAction } from '../../actions/orderActions';
import { newDeliveryAction, updateDeliveryStatus } from '../../actions/driverActions';

let OrderId

export default function Deliveryrequestscreen() {


    const userstate = useSelector(state => state.driverloginReducer)
    const { currentDriver } = userstate
    
    const [orders, setOrders] = useState([]);
    const [filterdOrders, setFilterdOrders] = useState([]);
    const [searchOrders, setSearchOrders] = useState("");

    //   useEffect(() => {

    //     function getOrders() {

    //       //get all users from database
    //       axios.get("/api/orders/getallorders").then((res) => {
    //         setOrders(res.data);
    //         console.log(res.data)


    //         setFilterdOrders(res.data);


    //       }).catch((err) => {
    //         console.log(err.message)

    //       })
    //     }

    //     getOrders();

    //   }, [])

    useEffect(() => {
        function getOrders() {
            axios.get("/api/orders/getallorders")
                .then((res) => {
                    const allOrders = res.data;
                    //console.log(allOrders)
                    const deliveredOrders = allOrders.filter(order => order.isDelivered === true && order.isDeliveryAccepted === false);
                    setOrders(deliveredOrders);
                    setFilterdOrders(deliveredOrders);
                })
                .catch((err) => {
                    console.log(err.message)
                })
        }
        getOrders();
    }, [])


    //update delivery status
    const [isDeliveryAccepted, updateisDeliveryAccepted] = useState('')

    function updateDStatus(orderId, val) {

        const updateisDeliveryAccepted = {

            isDeliveryAccepted: val
        }




        dispatch(updateDeliveryStatus(updateisDeliveryAccepted, orderId, val))


    }




    function deliveries(OrderId) {
        axios
            .get(`/api/orders/getcurrentorders/${OrderId}`)
            .then((res) => {
                setOrders(res.data);
                let orders = res.data;
                console.log(orders)

                const newDelivery = {
                    driverName: currentDriver.name,
                    orderId: orders._id,
                    orderItems: orders.orderItems,
                    location: orders.shippingAddress,
                    coordinates: orders.coordinates,
                    customerName: orders.name,
                    amount: orders.orderAmount,
                    driverRate: '1000'

                }

                dispatch(newDeliveryAction(newDelivery))

            })
            .catch((error) => {
                console.log(error);
            });
    }




    const columnsOrders = [
        {
            name: "Order",
            selector: (row) => row.orderItems.map(obj => obj.name).join(", "),
            sortable: true
        },

        {
            name: "Location",
            selector: (row) => row.shippingAddress.street + ',' + row.shippingAddress.city,
            sortable: true
        },

        {
            name: "Customer Name",
            selector: (row) => row.name,
            sortable: true
        },

        // {
        //     name: "Accept",
        //     cell: row => (
        //         <div>
        //             <button onClick={() => {
        //                 deliveries(row._id);
        //                 updateDStatus(row._id, true);
        //             }} className="btn">ACCEPT</button>

        //         </div>
        //     )
        // }

        {
            name: "Actions",
            cell: row => (
                <div>
                    <button
                        onClick={() => {
                            deliveries(row._id);
                            updateDStatus(row._id, true);
                        }}
                        className="btn "
                    >
                        Accept
                    </button>
                    <> </>
                    <button
                        onClick={() => deleteOrder(row._id)}
                        className="btn"
                    >
                        Decline
                    </button>
                </div>
            )
        }



    ]



    // search button
    useEffect(() => {
        const results = orders.filter(orders => {
            return orders._id.toLowerCase().match(searchOrders.toLowerCase());
        });

        setFilterdOrders(results);
    }, [searchOrders]);

    const dispatch = useDispatch();

    function deleteOrder(OrderId) {

        dispatch(deleteOrderAction(OrderId));


    }










    return (

        <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            <div className='row justify-content-center'>
                <div className='col-md-9 m-3   p-0 ' >
                    {/* Data table for customer details */}
                    <DataTable
                         title="DELIVERY REQUESTS"
                        columns={columnsOrders}
                        data={filterdOrders}
                        pagination
                        fixedHeader
                        fixedHeaderScrollHeight="450px"
                        selectableRows
                        selectableRowsHighlight
                        subHeader
                        subHeaderComponent={
                            <input
                                type="text"
                                placeholder="Search requests..."
                                className='w-25 form-control'
                                value={searchOrders}
                                onChange={(e) => setSearchOrders(e.target.value)}
                            />
                        }
                    />
                    <br></br>
                    <div className='modal-footer'>
                        <a href="/driver/delivery" className="btn">Your Deliveries</a>
                    </div>
                </div>
            </div>
        </div>

    )
}