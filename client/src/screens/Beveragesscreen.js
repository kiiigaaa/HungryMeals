import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pizza from "../components/Pizza";
import { getAllPizzas } from '../actions/pizzaAction'
import Loading from "../components/Loading";
import Error from "../components/Error";
import axios from "axios";




export default function Homescreen() {




    const dispatch = useDispatch()

    const pizzasstate = useSelector(state => state.getAllPizzasReducer)
    const [currentFeedbacks, setFeedbacks] = useState([]);
    const { pizzas, error, loading } = pizzasstate



    useEffect(() => {
        dispatch(getAllPizzas())
    }, [])


    const [searchQuery, setSearchQuery] = useState('')
    const [selectedOption, setSelectedOption] = useState('beverage')




    const filteredPizzas = pizzas.filter(pizza => {
        if (selectedOption === 'vegetarian') {
            return pizza.name.toLowerCase().includes(searchQuery.toLowerCase()) && pizza.isVegetarian;
        } else if (selectedOption === 'nonvegetarian') {
            return pizza.name.toLowerCase().includes(searchQuery.toLowerCase()) && !pizza.isVegetarian;
        } else if (selectedOption === 'pizza') {
            return pizza.name.toLowerCase().includes(searchQuery.toLowerCase()) && pizza.isPizza;
        } else if (selectedOption === 'beverage') {
            return pizza.name.toLowerCase().includes(searchQuery.toLowerCase()) && pizza.isBeverage;
        } else {
            return pizza.name.toLowerCase().includes(searchQuery.toLowerCase());
        }
    })


    const handleSearch = (e) => {
        setSearchQuery(e.target.value)
    }

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value)
    }





    return (

        <div>

            <br />
            <br />
            <br />
            <br />
            <br />



            <div className='row justify-content-center'>



                <div >

                    <div class="container p-5">
                        <div class="row justify-content-center">
                            <div class="col-md-6">
                                <div class="search">
                                    <i class="fa fa-search"></i>
                                    <input
                                        type="text"
                                        placeholder="Search Beverages..."
                                        value={searchQuery}
                                        className="form-control"
                                        onChange={handleSearch}

                                    />



                                </div>

                                <div>

                                  
                                </div>
                            </div>


                        </div>

                    </div>




                </div>







                {loading ? (<Loading />) : error ? (<Error error='Something went wrong' />) : (
                    filteredPizzas.length > 0 ? (
                        filteredPizzas.map(pizza => {
                            return <div className='col-md-3 m-3' key={pizza._id}>
                                <div>
                                    <Pizza pizza={pizza} />
                                </div>
                            </div>
                        })
                    ) : (
                        <p10>No beverages found...</p10>
                    )
                )}



            </div>


        </div>

    )

}