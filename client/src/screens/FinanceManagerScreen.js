import React from 'react'
import { Route } from 'react-router-dom'
import Switch from 'react-dom'
import HistoryScreen from './HistoryScreen'
import RefundRequestScreen from './RefundRequestScreen'
import SalesScreen from './SalesScreen'



export default function FinanceManagerScreen() {
    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <br />

            {/* <div className='row justify-content-center'>
                <div className='col-md-10'>
                    <h2 style={{ fontSize: '35px' }}>Financial Management</h2>

                    <ul className='financemanagerfunctions'>
                        <li><a href="financemanager/sales">Sales</a></li>
                        <li><a href="financemanager/requests">Requests</a></li>
                        <li><div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                Refunds
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><a class="dropdown-item" href="financemanager/transaction">Add Transaction</a></li>
                                <li><a class="dropdown-item" href="financemanager/history">Trasaction History</a></li>
                                
                            </ul>
                        </div></li>
                        <li><a href="">Reports</a></li>
                    </ul>


                     {/* <Switch>
                        <Route path="financemanager/sales" component={SalesScreen} exact/>
                        <Route path="admin/requests" component={RequestsScreen} exact/>
                        <Route path="financemanager/transaction" component={TransactionScreen} exact/>
                        <Route path="financemanager/history" component={HistoryScreen} exact/>
                    </Switch>  */}

            {/* </div> */}
            {/* </div> */}

            <div className='row justify-content-center '>
                <h2 style={{ fontSize: '35px' }}>Financial Management</h2>
                <div class="card col-md-4 m-4 shadow p-3 mb-5 bg-white " style={{ width: '18rem', borderRadius: '15px' }}>
                    <img src="https://img.freepik.com/free-vector/sales-managers-with-laptops-growth-chart-sales-growth-manager-accounting-sales-promotion-operations-concept-white-background_335657-1704.jpg?size=626&ext=jpg&ga=GA1.2.395984174.1652883689&semt=sph" class="card-img-top" alt="Sales" />
                    <div class="card-body">
                        <h5 class="card-title">Sales </h5>
                        <p class="card-text">Manage all the details about  Sales<br></br>
                            

                        </p>
                        <br />
                        <br />
                        <br />
                        <br />
                        <a href="financemanager/sales" class="btn">See More</a>
                    </div>
                </div>



                <div class="card col-md-4 m-4 shadow p-3 mb-5 bg-white " style={{ width: '18rem', borderRadius: '15px' }}>
                    <img src="https://img.freepik.com/free-vector/express-delivery-service-flat_335657-3152.jpg?size=626&ext=jpg&ga=GA1.1.395984174.1652883689&semt=sph" class="card-img-top" alt="Refunds" />
                    <div class="card-body">
                        <h5 class="card-title">Refunds</h5>
                        <p class="card-text">Manage all the details about  Refunds<br></br>
                            

                        </p>
                        <br />
                        <br />
                        <br />
                        <br />
                        <a href="financemanager/requests" class="btn">See More</a>
                    </div>
                </div>


                <div class="card col-md-4 m-4 shadow p-3 mb-5 bg-white " style={{ width: '18rem', borderRadius: '15px' }}>
                    <img src="https://img.freepik.com/free-vector/setup-analytics-concept-illustration_114360-1438.jpg?size=626&ext=jpg&ga=GA1.1.395984174.1652883689&semt=sph" class="card-img-top" alt="Reports" />
                    <div class="card-body">
                        <h5 class="card-title">Reports</h5>
                        <p class="card-text">Manage all the details about  Generating reports<br></br>
                            

                        </p>
                        <br />
                        <br />
                        <br />
                        <br />
                        <a href="#" class="btn">See More</a>
                    </div>
                </div>
            </div>


        </div>
    )
}