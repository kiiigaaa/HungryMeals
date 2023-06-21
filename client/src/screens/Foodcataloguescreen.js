import React from 'react';
import axios from 'axios';
import DataTable from "react-data-table-component";
import { Modal } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from "../actions/cartAction";
import { updateFoodsAction, addFoodsAction, deleteFoodsAction } from '../actions/pizzaAction';


let foodId;
let x;

export default function Foodcataloguescreen() {

  const [catalogues, setCatalogues] = useState([]);
  const [foods, setFoods] = useState([]);
  const [filteredCatalogues, setFilteredCatalogues] = useState([]);
  const [searchCatalogues, setSearchCatalogues] = useState("");
  const [filterType, setFilterType] = useState("");

  useEffect(() => {

    function getCatalogues() {

      //get all catalogues from database
      axios.get("/api/pizzas/getallpizzas").then((res) => {
        setCatalogues(res.data);
        setFilteredCatalogues(res.data);

      }).catch((err) => {
        console.log(err.message);
      })
    }

    getCatalogues();

  }, []);



  function getCurrentFood(foodId) {

    axios.get(`/api/pizzas/getcurrentfood/${foodId}`).then((res) => {

      setFoods(res.data);
      const foods = res.data


    }).catch((error) => {
      console.log(error)


    })
  }



  useEffect(() => {
    const results = catalogues.filter(catalogue => {
      if (filterType === "vegetarian") {
        return catalogue.isVegetarian;
      } else if (filterType === "nonvegetarian") {
        return catalogue.isNonVeg;
      } else if (filterType === "beverage") {
        return catalogue.isBeverage;
      } else {
        return true;
      }
    }).filter(catalogue => catalogue.name.toLowerCase().includes(searchCatalogues.toLowerCase()));
    setFilteredCatalogues(results);
  }, [filterType, catalogues, searchCatalogues]);



  const columnsOrders = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true
    },
    {
      name: "Preview",
      selector: (row) => <img width={75} height={75} src={row.image} />,

    },
    // {
    //   name: "Date",
    //   selector: (row) => row.createdAt.substring(0, 10),
    //   sortable: true
    // },
    {
      name: "Details",
      cell: row => <button onClick={() => { getCurrentFood(foodId = row._id) }} className="btn" data-bs-toggle="modal" href="#staticBackdrop1" role="button">Edit <i class="fas fa-edit" style={{ "color": "white" }}></i></button>
    },
    {
      name: "Delete",
      cell: row => <button onClick={() => { deleteFoods(row._id) }} type="button" class="btn ">Delete <i class="fas fa-trash-alt"></i></button>

    }
  ];



  const [quantity, setquantity] = useState(1)
  const [varient, setvarient] = useState('small')
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const dispatch = useDispatch()

  function addtocart() {

    dispatch(addToCart(catalogues, quantity, varient))
  }



  //update foods

  const [name, updatefoodName] = useState(foods.name);
  const [image, updatefoodImage] = useState(foods.image);
  const [description, updatefoodDescription] = useState(foods.description);
  // const [varients, updatefoodVarients] = useState([]);
  const [prices, updatefoodPrices] = useState(foods.prices ? foods.prices[0] : { small: '', medium: '', large: '' });
  const [isBeverage, updateIsBeverage] = useState(false);
  const [isVegetarian, updateIsVegetarian] = useState(false);
  const [isNonVeg, updateIsNonVeg] = useState(false);


  useEffect(() => {
    // Check the value of the respective fields and update the state accordingly
    updateIsBeverage(foods.isBeverage);
    updateIsVegetarian(foods.isVegetarian);
    updateIsNonVeg(foods.isNonVeg);
  }, [foods]);



  function updateFoodPrices(size, value) {
    value = parseInt(value, 10) || 0; // use 0 if value is falsy
    updatefoodPrices(prevPrices => ({
      ...prevPrices,
      [size]: value || foods.prices[0][size]
    }));
  }





  // function updateFoodVarients(size, value) {
  //   updatefoodVarients(prevVarients => {
  //     const newVarients = [...prevVarients];
  //     newVarients[size] = value !== '' ? value : foods.varients[size];
  //     return newVarients;
  //   });
  // }



  function updateforfood(foodId) {


    const updateFoods = {
      name,
      image,
      isBeverage,
      isVegetarian,
      isNonVeg,
      description,
      varients: [
        "small",
        "medium",
        "large"
      ],
      prices,
    }

    dispatch(updateFoodsAction(updateFoods, foodId));
  }



  //add new foods

  const [newName, setfoodName] = useState('');
  const [newImage, setfoodImage] = useState('');
  const [newDescription, setfoodDescription] = useState('');
  const [newVarients, setfoodVarients] = useState([]);
  const [newPrices, setfoodPrices] = useState(foods.prices ? foods.prices[0] : { small: '', medium: '', large: '' });
  const [newIsBeverage, setIsBeverage] = useState(false);
  const [newIsVegetarian, setIsVegetarian] = useState(false);
  const [newIsNonVeg, setIsNonVeg] = useState(false);




  function setFoodPrices(size, value) {
    value = parseInt(value, 10) || 0; // use 0 if value is falsy
    setfoodPrices(prevPrices => ({
      ...prevPrices,
      [size]: value || prevPrices[size]
    }));
  }
  





  function addnewfood() {


    const addFoods = {
      newName,
      newVarients: [
        "small",
        "medium",
        "large"
      ],
      newPrices,
      newImage,
      newIsBeverage,
      newIsVegetarian,
      newIsNonVeg,
      newDescription


    }

    dispatch(addFoodsAction(addFoods));
  }

  //delete foods
  function deleteFoods(foodId) {

    dispatch(deleteFoodsAction(foodId));

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
        <div className='col-md-9 m-3 p-0'>
          {/* Data table for customer details */}
          <DataTable
            title=<div style={{ paddingTop: '25px' }}><h20>Food Catalogue Management <sup><span class="badge bg-danger">Not Completed</span></sup></h20></div>
            columns={columnsOrders}
            data={filteredCatalogues}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="450px"
            selectableRows
            selectableRowsHighlight
            subHeader
            noDataComponent={<div className="text-center"><p10>No foods available...</p10></div>}
            subHeaderComponent={
              <div className="p-3">
                <input
                  type="text"
                  placeholder="Search Foods..."
                  className='w-100 form-control'
                  value={searchCatalogues}
                  onChange={(e) => setSearchCatalogues(e.target.value)}
                />

                <label className="p-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="filterType"
                    id="allFilter"
                    value=""
                    onChange={(e) => setFilterType(e.target.value)}
                    checked={filterType === ""}
                  />
                  <> </><h9 style={{ fontSize: "18px" }}>All</h9>
                </label>
                <label className="p-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="filterType"
                    id="vegetarianFilter"
                    value="vegetarian"
                    onChange={(e) => setFilterType(e.target.value)}
                    checked={filterType === "vegetarian"}
                  />
                  <> </><h9 style={{ fontSize: "18px" }}>Vegetarian</h9>
                </label>
                <label className="p-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="filterType"
                    id="nonvegetarianFilter"
                    value="nonvegetarian"
                    onChange={(e) => setFilterType(e.target.value)}
                    checked={filterType === "nonvegetarian"}
                  />
                  <> </><h9 style={{ fontSize: "18px" }}>Non-Vegetarian</h9>
                </label>
                <label className="p-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="filterType"
                    id="beverageFilter"
                    value="beverage"
                    onChange={(e) => setFilterType(e.target.value)}
                    checked={filterType === "beverage"}
                  />
                  <> </><h9 style={{ fontSize: "18px" }}>Beverages</h9>
                </label>

              </div>

            }
          />

          <br />
          <br />
          <div className='modal-footer'>
            <button class="btn" data-bs-target="#staticBackdrop2" data-bs-toggle="modal" data-bs-dismiss="modal"><i class="fa-solid fa-plus fa-beat" style={{ "color": "white" }}></i> Add New Foods</button>
            <div className='p-1'><button class="btn" data-bs-target="#" data-bs-toggle="modal" data-bs-dismiss="modal"><i style={{ fontSize: '15px', color: 'white' }} class="fa fa-file" aria-hidden="true"></i> Generate Food Catalogue Report</button></div>
          </div>





        </div>
      </div>


      {/* Model 1 - Preview & Edit Foods */}
      <div class="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl">
          <div class="modal-content">



            <div class="modal-header">


              <h5 class="modal-title" id="exampleModalToggleLabel">
                <h20>Edit Foods</h20>


              </h5>

              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>



            </div>





            <div class="modal-body">

              <div class="container p-4">
                <div class="row">
                  <div class="col order-last">


                    <div className="container text-center">
                      {foods.prices && (
                        <div className="row">

                          <label style={{ display: 'block', marginBottom: '10px' }}>
                            <h9 style={{ fontSize: "15px", color: 'black' }}>Food Price List</h9>
                          </label>
                          <div className="col">
                            <div style={{ alignItems: 'center' }}>
                              <span className="badge bg-secondary">Small</span>
                              <input
                                type="text"
                                id="small"
                                className="form-control"
                                value={prices.small || foods.prices[0].small}
                                onChange={(e) => { updateFoodPrices('small', e.target.value) }}
                                style={{ fontFamily: 'Signika Negative, sans-serif', color: "black", fontSize: "20px" }}
                              />
                            </div>
                            <br />
                          </div>
                          <div className="col">
                            <div style={{ alignItems: 'center' }}>
                              <span className="badge bg-danger">Medium</span>
                              <input
                                type="text"
                                id="medium"
                                className="form-control"
                                value={prices.medium || foods.prices[0].medium}
                                onChange={(e) => { updateFoodPrices('medium', e.target.value) }}
                                style={{ fontFamily: 'Signika Negative, sans-serif', color: "black", fontSize: "20px" }}
                              />
                            </div>
                            <br />
                          </div>
                          <div className="col">
                            <div style={{ alignItems: 'center' }}>
                              <span className="badge bg-success">Large</span>
                              <input
                                type="text"
                                id="large"
                                className="form-control"
                                value={prices.large || foods.prices[0].large}
                                onChange={(e) => { updateFoodPrices('large', e.target.value) }}
                                style={{ fontFamily: 'Signika Negative, sans-serif', color: "black", fontSize: "20px" }}
                              />
                            </div>

                          </div>

                        </div>)}

                      {/* {foods.varients !== undefined && (
                        <div className="row">
                          <label style={{ display: 'block', marginBottom: '10px' }}>
                            <h9 style={{ fontSize: "15px", color: 'black' }}>Food Varients List</h9>
                          </label>
                          <div className="col">
                            <div style={{ alignItems: 'center' }}>
                              <span className="badge bg-secondary">Varient 01</span>
                              <input
                                type="text"
                                id="small"
                                className="form-control"
                                value={(varients && varients[0]) || foods.varients[0]}
                                onChange={(e) => { updateFoodVarients('0', e.target.value) }}
                                style={{ fontFamily: 'Signika Negative, sans-serif', color: "black", fontSize: "20px" }}
                              />
                            </div>
                            <br />
                          </div>
                          <div className="col">
                            <div style={{ alignItems: 'center' }}>
                              <span className="badge bg-danger">Varient 02</span>
                              <input
                                type="text"
                                id="medium"
                                className="form-control"
                                value={(varients && varients[1]) || foods.varients[1]}
                                onChange={(e) => { updateFoodVarients('1', e.target.value) }}
                                style={{ fontFamily: 'Signika Negative, sans-serif', color: "black", fontSize: "20px" }}
                              />
                            </div>
                            <br />
                          </div>
                          <div className="col">
                            <div style={{ alignItems: 'center' }}>
                              <span className="badge bg-success">Varient 03</span>
                              <input
                                type="text"
                                id="large"
                                className="form-control"
                                value={(varients && varients[2]) || foods.varients[2]}
                                onChange={(e) => { updateFoodVarients('2', e.target.value) }}
                                style={{ fontFamily: 'Signika Negative, sans-serif', color: "black", fontSize: "20px" }}
                              />
                            </div>
                          </div>
                        </div>
                      )} */}

                    </div>



                    <br></br>
                    <br></br>

                  </div>
                  <div class="col">
                    <label><h9 style={{ fontSize: "15px", color: 'black' }}>Food Type</h9></label>
                    <div class="p-1" >

                      <label className="p-2">
                        <input
                          type="radio"
                          name="foodType"
                          value="vegetarian"
                          checked={isVegetarian}
                          onChange={() => {
                            updateIsVegetarian(true);
                            updateIsNonVeg(false);
                            updateIsBeverage(false);
                          }}
                        />
                        <> </>
                        <h9 style={{ fontSize: "20px" }}>Vegetarian</h9>
                      </label>
                      <label className="p-2">
                        <input
                          type="radio"
                          name="foodType"
                          value="nonVeg"
                          checked={isNonVeg}
                          onChange={() => {
                            updateIsNonVeg(true);
                            updateIsVegetarian(false);
                            updateIsBeverage(false);
                          }}
                        />
                        <> </>
                        <h9 style={{ fontSize: "20px" }}>Non-Vegetarian</h9>
                      </label>
                      <label className="p-2">
                        <input
                          type="radio"
                          name="foodType"
                          value="beverage"
                          checked={isBeverage}
                          onChange={() => {
                            updateIsBeverage(true);
                            updateIsVegetarian(false);
                            updateIsNonVeg(false);
                          }}
                        />
                        <> </>
                        <h9 style={{ fontSize: "20px" }}>Beverages</h9>
                      </label>
                      <br></br>
                      <br></br>

                      <div className="form-group">
                        <label htmlFor="foodName"><h9 style={{ fontSize: "15px", color: 'black' }}>Food Name</h9></label>
                        <input
                          type="text"
                          id="foodName"
                          className="form-control"
                          value={name || foods.name}
                          onChange={(e) => { updatefoodName(e.target.value) }}
                          style={{ fontFamily: 'Mukta, calibri', color: "black", fontStyle: "italic", fontSize: "15px" }}
                        />
                      </div>
                      <br></br>
                      <div class="form-group">
                        <label htmlFor="foodDescription" style={{ display: 'block', marginBottom: '10px' }}><h9 style={{ fontSize: "15px", color: 'black' }}>Food Description</h9></label>

                        <textarea
                          class="form-control"
                          id="foodDescription"
                          rows="15"
                          placeholder='Enter Description'
                          value={description || foods.description}
                          onChange={(e) => { updatefoodDescription(e.target.value) }}
                          style={{ fontFamily: 'Mukta, calibri', color: "#6c757d", fontStyle: "italic", fontSize: "15px" }}
                        >

                        </textarea>
                      </div>

                    </div>

                  </div>

                  <div class="col order-first">

                    <div className='row justify-content center'>

                      <div className="shadow p-3 m-1 bg-white" style={{ borderRadius: '15px', border: '1px solid black', width: '350px', textAlign: 'center' }}>



                        <div onClick={handleShow}>

                          <h1>{name || foods.name}</h1>
                          <img src={image || foods.image} className="img-fluid" style={{ height: '200px', width: '200px' }} />

                        </div>

                        <div className="flex-container">

                          <div className='w-100 m-1'>
                            <p>Varients</p>
                            <select className='form-control' value={varient} onChange={(e) => { setvarient(e.target.value) }}>
                              {foods.varients && foods.varients.map(varient => {
                                return <option value={varient}>{varient}</option>
                              })}
                            </select>
                          </div>

                          <div className='w-100 m-1'>
                            <p>Quantity</p>
                            <select className='form-control' value={quantity} onChange={(e) => { setquantity(e.target.value) }}>
                              {Array(10).keys() && [...Array(10).keys()].map((x, i) => {
                                return <option value={i + 1}>{i + 1}</option>
                              })}
                            </select>
                          </div>
                        </div>

                        <div className="flex-container">

                          <div className='m-1 w-100'>
                            {foods.prices && foods.prices[0] && <h1 className='m-1'>Price: {foods.prices[0][varient] * quantity} LKR</h1>}

                          </div>

                          <div className='m-1 w-100'>
                            <button className="btn"  >ADD TO CART</button>
                          </div>

                        </div>

                        <Modal show={show} onHide={handleClose}>

                          <Modal.Header closeButton>
                            <Modal.Title><h9>{foods.name || newName}</h9></Modal.Title>
                          </Modal.Header>

                          <Modal.Body>
                            <img src={foods.image || newImage} className="img-fluid" style={{ height: '470px', width: '500px', marginBottom: '20px' }} />
                            <p10 style={{ marginTop: '20px' }}>{foods.description || newDescription}</p10>
                          </Modal.Body>


                          <Modal.Footer>
                            <button className="btn" onClick={handleClose}>CLOSE</button>
                          </Modal.Footer>
                        </Modal>






                      </div>

                      <label htmlFor="foodImage" style={{ display: 'block', marginBottom: '10px' }}>
                        <br></br>
                        <h9 style={{ fontSize: '15px', color: 'black' }}>Food Image</h9>
                      </label>
                      <textarea
                        class="form-control"
                        id="foodImage"
                        rows="3"
                        placeholder='Enter image src'
                        value={image || foods.image}
                        onChange={(e) => { updatefoodImage(e.target.value) }}
                        style={{
                          display: 'block',
                          width: '100%',
                          padding: '10px',
                          fontSize: '16px',
                          fontFamily: 'Mukta, calibri',
                          color: '#6c757d',
                          fontStyle: 'italic'
                        }}
                      ></textarea>




                    </div>
                    <br></br>
                  </div>
                </div>
              </div>




            </div>




            <div class="modal-footer">
              <button onClick={() => updateforfood(foodId, updateforfood)} type="button" class="btn " >Update</button>
            </div>

          </div>
        </div>
      </div >

      {/* Model 1 - Add Foods */}
      <div class="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl">
          <div class="modal-content">



            <div class="modal-header">


              <h5 class="modal-title" id="exampleModalToggleLabel">
                <h20>Add New Foods</h20>


              </h5>

              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>



            </div>





            <div class="modal-body">

              <div class="container p-4">
                <div class="row">
                  <div class="col order-last">


                    <div className="container text-center">

                      <div className="row">

                        <label style={{ display: 'block', marginBottom: '10px' }}>
                          <h9 style={{ fontSize: "15px", color: 'black' }}>Food Price List</h9>
                        </label>
                        <div className="col">
                          <div style={{ alignItems: 'center' }}>
                            <span className="badge bg-secondary">Small</span>
                            <input
                              type="text"
                              id="small"
                              className="form-control"
                              value={newPrices.small}
                              onChange={(e) => { setFoodPrices('small', e.target.value) }}
                              style={{ fontFamily: 'Signika Negative, sans-serif', color: "black", fontSize: "20px" }}
                            />
                          </div>
                          <br />
                        </div>
                        <div className="col">
                          <div style={{ alignItems: 'center' }}>
                            <span className="badge bg-danger">Medium</span>
                            <input
                              type="text"
                              id="medium"
                              className="form-control"
                              value={newPrices.medium}
                              onChange={(e) => { setFoodPrices('medium', e.target.value) }}
                              style={{ fontFamily: 'Signika Negative, sans-serif', color: "black", fontSize: "20px" }}
                            />
                          </div>
                          <br />
                        </div>
                        <div className="col">
                          <div style={{ alignItems: 'center' }}>
                            <span className="badge bg-success">Large</span>
                            <input
                              type="text"
                              id="large"
                              className="form-control"
                              value={newPrices.large}
                              onChange={(e) => { setFoodPrices('large', e.target.value) }}
                              style={{ fontFamily: 'Signika Negative, sans-serif', color: "black", fontSize: "20px" }}
                            />
                          </div>

                        </div>

                      </div>


                    </div>



                    <br></br>
                    <br></br>

                  </div>
                  <div class="col">
                    <label><h9 style={{ fontSize: "15px", color: 'black' }}>Food Type</h9></label>
                    <div class="p-1" >

                      <label className="p-2">
                        <input
                          type="radio"
                          name="foodType"
                          value="vegetarian"
                          checked={newIsVegetarian}
                          onChange={() => {
                            setIsVegetarian(true);
                            setIsNonVeg(false);
                            setIsBeverage(false);
                          }}
                        />
                        <> </>
                        <h9 style={{ fontSize: "20px" }}>Vegetarian</h9>
                      </label>
                      <label className="p-2">
                        <input
                          type="radio"
                          name="foodType"
                          value="nonVeg"
                          checked={newIsNonVeg}
                          onChange={() => {
                            setIsNonVeg(true);
                            setIsVegetarian(false);
                            setIsBeverage(false);
                          }}
                        />
                        <> </>
                        <h9 style={{ fontSize: "20px" }}>Non-Vegetarian</h9>
                      </label>
                      <label className="p-2">
                        <input
                          type="radio"
                          name="foodType"
                          value="beverage"
                          checked={newIsBeverage}
                          onChange={() => {
                            setIsBeverage(true);
                            setIsVegetarian(false);
                            setIsNonVeg(false);
                          }}
                        />
                        <> </>
                        <h9 style={{ fontSize: "20px" }}>Beverages</h9>
                      </label>
                      <br></br>
                      <br></br>

                      <div className="form-group">
                        <label htmlFor="foodName"><h9 style={{ fontSize: "15px", color: 'black' }}>Food Name</h9></label>
                        <input
                          type="text"
                          id="foodName"
                          placeholder='Enter Food Name'
                          className="form-control"
                          value={newName}
                          onChange={(e) => { setfoodName(e.target.value) }}
                          style={{ fontFamily: 'Mukta, calibri', color: "black", fontStyle: "italic", fontSize: "15px" }}
                        />
                      </div>
                      <br></br>
                      <div class="form-group">
                        <label htmlFor="foodDescription" style={{ display: 'block', marginBottom: '10px' }}><h9 style={{ fontSize: "15px", color: 'black' }}>Food Description</h9></label>

                        <textarea
                          class="form-control"
                          id="foodDescription"
                          rows="15"
                          placeholder='Enter Description'
                          value={newDescription}
                          onChange={(e) => { setfoodDescription(e.target.value) }}
                          style={{ fontFamily: 'Mukta, calibri', color: "#6c757d", fontStyle: "italic", fontSize: "15px" }}
                        >

                        </textarea>
                      </div>

                    </div>

                  </div>

                  <div class="col order-first">

                    <div className='row justify-content center'>

                      <div className="shadow p-3 m-1 bg-white" style={{ borderRadius: '15px', border: '1px solid black', width: '350px', textAlign: 'center' }}>



                        <div onClick={handleShow}>

                          <h1>{newName || foods.newName}</h1>
                          <img src={newImage || foods.newImage} className="img-fluid" style={{ height: '200px', width: '200px' }} />

                        </div>

                        <div className="flex-container">

                          <div className='w-100 m-1'>
                            <p>Varients</p>
                            <select className='form-control' value={varient} onChange={(e) => { setvarient(e.target.value) }}>
                              <option value='small'>small</option>
                              <option value='medium'>medium</option>
                              <option value='large'>large</option>
                            </select>
                          </div>

                          <div className='w-100 m-1'>
                            <p>Quantity</p>
                            <select className='form-control' value={quantity} onChange={(e) => { setquantity(e.target.value) }}>
                              {Array(10).keys() && [...Array(10).keys()].map((x, i) => {
                                return <option value={i + 1}>{i + 1}</option>
                              })}
                            </select>
                          </div>




                        </div>

                        <div className="flex-container">

                          <div className='m-1 w-100'>
                            {/* {foods.newPrices && foods.newPrices[0] &&
                              <h1 className='m-1'>Price: {foods.newPrices[0][varient] * quantity} LKR</h1>
                            } */}
                          </div>


                          <div className='m-1 w-100'>
                            <button className="btn"  >ADD TO CART</button>
                          </div>

                        </div>






                      </div>

                      <label htmlFor="foodImage" style={{ display: 'block', marginBottom: '10px' }}>
                        <br></br>
                        <h9 style={{ fontSize: '15px', color: 'black' }}>Food Image</h9>
                      </label>
                      <textarea
                        class="form-control"
                        id="foodImage"
                        rows="3"
                        placeholder='Enter image src'
                        value={newImage || foods.newImage}
                        onChange={(e) => { setfoodImage(e.target.value) }}
                        style={{
                          display: 'block',
                          width: '100%',
                          padding: '10px',
                          fontSize: '16px',
                          fontFamily: 'Mukta, calibri',
                          color: '#6c757d',
                          fontStyle: 'italic'
                        }}
                      ></textarea>




                    </div>
                    <br></br>
                  </div>
                </div>
              </div>




            </div>




            <div class="modal-footer">
              <button onClick={() => addnewfood(addnewfood)} type="button" class="btn " >Update</button>
            </div>

          </div>
        </div>
      </div >



    </div >
  )
}
