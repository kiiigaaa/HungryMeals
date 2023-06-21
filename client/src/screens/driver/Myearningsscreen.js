import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
import { Table, Button } from "react-bootstrap";

function Myearningsscreen() {

    const columns = [
        
        { key: "customerName", title: "Customer Name" },
        { key: "Location", title: "Location" },
        { key: "Payment(Rs)", title: "Payment(Rs)" },

    ];

    const [delivery, setDelivery] = useState([]);
    const [totalEarnings, setTotalEarnings] = useState(0);

    const userstate = useSelector((state) => state.driverloginReducer);
    const { currentDriver } = userstate;

    useEffect(() => {
        function getdeliveries() {


            axios
                .get('/api/delivery/getalldeliveries')
                .then((res) => {
                    const allDeliveries = res.data;
                    const deliveredDeliveries = allDeliveries.filter(
                        (delivery) => delivery.driverName === currentDriver.name
                    );
                    setDelivery(deliveredDeliveries);

                    // Calculate total earnings
                    const today = new Date().toISOString().slice(0, 10); // Get today's date
                    const total = deliveredDeliveries.reduce((sum, delivery) => {
                        if (delivery.createdAt.slice(0, 10) === today) {
                            // Check if delivery was created today
                            return sum + delivery.driverRate;
                        }
                        return sum;
                    }, 0);
                    setTotalEarnings(total);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }

        getdeliveries();
    }, []);

    return (

        <div>
            <br />
            <br />
            <br />
            <br />
            <br/>
            <h9 style={{ fontSize: '35px' }}>Your Earnings</h9>

            
            <br />
            <br />

            <div className='row justify-content-center'>
                <div className='col-md-9 m-3   p-0 ' >
                    <div>
                    <Table striped bordered hover>
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.key}>{column.title}</th>
                        ))}
                    </tr>
                </thead>
                            <tbody>
                                {delivery.map((delivery) => (
                                    <tr key={delivery._id}>
                                        
                                       
                                        <td>{delivery.customerName}</td>
                                        
                                        <td>{delivery.location.city}</td>
                                        
                                        
                                        <td>{delivery.driverRate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>


                        <br/>
                        <br/>
                        
                        <h2 style={{ fontSize: '25px' }}>Total earnings today: Rs.{totalEarnings}</h2>
                        <p></p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Myearningsscreen;
