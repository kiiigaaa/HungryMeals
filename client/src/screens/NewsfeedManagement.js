import React from 'react'
import axios from 'axios'
import DataTable from "react-data-table-component"
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import Swal from 'sweetalert2';
import truncate from 'lodash/truncate';
import { createNewsAction, deleteNewsAction, updateNewsAction } from '../actions/newsfeedAtion';



let newsId;

export default function Newsfeedmanagement() {

    const dispatch = useDispatch()


    const [filterdNews, setFilterdNews] = useState([]);
    const [search, setSearch] = useState("");
    const [news, setNews] = useState([]);

    useEffect(() => {
        function getNews() {
            axios.get("/api/newsfeed/getallnews").then((res) => {
                setNews(res.data);
                setFilterdNews(res.data);

            }).catch((err) => {
                console.log(err.message)
            })
        }
        getNews();

    }, [])



    function getCurrentNews(newsId) {

        axios.get(`/api/newsfeed/getcurrentnews/${newsId}`).then((res) => {


            setNews(res.data);
            news = res.data


        }).catch((error) => {
            console.log(error)


        })
    }




    function ShortenedDataTableHeader({ row }) {
        const maxLength = 25; // Set the maximum length for the header
        const shortenedHeader = truncate(row.header, { length: maxLength }); // Use the truncate function to shorten the header
        return <span>{shortenedHeader}</span>;
    }

    const columns = [
        {
            name: "Name",
            selector: (row) => <ShortenedDataTableHeader row={row} />,

        },
        {
            name: "Preview",
            selector: (row) => <img width={75} height={75} src={row.image} />,

        },

        {
            name: "Category",
            selector: (row) => {
                return (
                    <span
                        className={`badge bg-${row.category === "News" ? "success" : "success"}`}
                    >
                        {row.category}
                    </span>
                );
            },
        },

        {
            name: "Date",
            selector: (row) => row.createdAt.substring(0, 10),
            sortable: true
        },

        {
            name: "Details",
            cell: row => <button onClick={() => { getCurrentNews(newsId = row._id) }} className="btn" data-bs-toggle="modal" href="#staticBackdrop1" role="button">Edit <i class="fas fa-edit" style={{ "color": "white" }}></i></button>

        },
        {
            name: "Delete",
            cell: row => <button onClick={() => { deleteNews(row._id) }} type="button" class="btn ">Delete <i class="fas fa-trash-alt"></i></button>

        }




    ];


    useEffect(() => {
        const result = news.filter(news => {
            return news.header.toLowerCase().match(search.toLowerCase());
        });

        setFilterdNews(result);
    }, [search]);



    //create news
    const [newImage, setnewsImage] = useState('')
    const [newHeader, setnewsHeader] = useState('')
    const [newCategory, setnewsCategory] = useState('')
    const [newDescription, setnewsDescription] = useState('')



    function createnews() {

        const newNews = {
            newImage,
            newHeader,
            newCategory,
            newDescription
        }


        if (newHeader.trim().length !== 0 && newCategory.trim().length !== 0 && newDescription.trim().length !== 0) {

            dispatch(createNewsAction(newNews))

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


    //update news
    const [image, updatenewsImage] = useState(news.image)
    const [header, updatenewsHeader] = useState(news.header)
    const [category, updatenewsCategory] = useState(news.category)
    const [description, updatenewsDescription] = useState(news.description)


    function updateforNews(newsId) {


        const updateNews = {

            image,
            header,
            category,
            description

        }

            console.log(updateNews, newsId)
            dispatch(updateNewsAction(updateNews, newsId))
       




    }


    //delete news
    function deleteNews(newsId) {

        dispatch(deleteNewsAction(newsId));

    }


    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // add leading zero if needed
    const day = String(today.getDate()).padStart(2, '0'); // add leading zero if needed
    const formattedDate = `${year}-${month}-${day}`;


    return (
        <div>

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />


            <div className='row justify-content-center'>



                <div className='col-md-9 m-3   p-0' >

                    <DataTable

                        title=<div style={{ paddingTop: '25px' }}><h20>Newsfeed Management <sup><span class="badge bg-danger">Not Completed 70%</span></sup></h20></div>
                        columns={columns}
                        data={filterdNews}
                        pagination
                        fixedHeader
                        fixedHeaderScrollHeight="450px"
                        selectableRows
                        selectableRowsHighlight
                        subHeader
                        subHeaderComponent={
                            <input

                                type="text"
                                placeholder="Search News..."
                                className='w-25 form-control'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}

                            />
                        }
                        style={{ fontSize: '54px' }}
                    />



                    <br />
                    <br />
                    <div className='modal-footer'>
                        <button class="btn" data-bs-target="#staticBackdrop3" data-bs-toggle="modal" data-bs-dismiss="modal"><i class="fa-solid fa-plus fa-beat" style={{ "color": "white" }}></i> Add News & Events</button>
                        <div className='p-1'><button class="btn" data-bs-target="#" data-bs-toggle="modal" data-bs-dismiss="modal"><i style={{ fontSize: '15px', color: 'white' }} class="fa fa-file" aria-hidden="true"></i> Generate Newsfeed Report</button></div>
                    </div>
                </div>


            </div>


            {/* Model 1 - Preview */}
            <div class="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">



                        <div class="modal-header">


                            <h5 class="modal-title" id="exampleModalToggleLabel">
                                <h20>{news.category === "News" ? "News Preview" : "Event Preview"}</h20>


                            </h5>

                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>



                        </div>





                        <div class="modal-body">


                            <div className="p-4 m-4" style={{ borderRadius: '25px', textAlign: "left" }}>

                                <div class="row gx-5">
                                    <div class="col-md-4 mb-4">
                                        <div class="bg-image hover-overlay ripple shadow-2-strong rounded-5" data-mdb-ripple-color="light">

                                            <img src={news.image} class="img-fluid  shadow-lg" style={{ borderRadius: '25px' }} />

                                        </div>
                                    </div>

                                    <div class="col-md-6 mb-4">
                                        <span class="badge bg-danger px-2 py-1 shadow-1-strong mb-3"><i class="fa fa-clock" aria-hidden="true"></i> {news.createdAt && news.createdAt.toString().substring(0, 10)}
                                        </span>
                                        <> </>
                                        <span
                                            className={`badge bg-${news.category === "News" ? "success" : "success"}`}
                                        >
                                            {news.category}
                                        </span>

                                        <br></br>
                                        <h9 style={{ fontSize: "23px" }}>{news.header}</h9>

                                        <p10 class="text-muted "><br></br><br></br>
                                            {news.description}
                                        </p10>

                                    </div>
                                </div>



                            </div>




                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn " data-bs-target="#staticBackdrop2" data-bs-toggle="modal" data-bs-dismiss="modal">Edit <i class="fas fa-edit" style={{ "color": "white" }}></i></button>
                        </div>

                    </div>
                </div>
            </div>

            {/* Model 2 - Update */}
            <div class="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg">

                    <div class="modal-content">



                        <div class="modal-header">


                            <h5 class="modal-title" id="exampleModalToggleLabel">
                                <h20>{news.category === "News" ? "Edit News" : "Edit Event"}</h20>


                            </h5>

                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>



                        </div>





                        <div class="modal-body">


                            <div className="p-4 m-4" style={{ borderRadius: '25px', textAlign: "left" }}>

                                <div class="row gx-5">
                                    <div class="col-md-4 mb-4">
                                        <div class="bg-image hover-overlay ripple shadow-2-strong rounded-5" data-mdb-ripple-color="light">

                                            <img src={image || news.image} class="img-fluid  shadow-lg" style={{ borderRadius: '25px' }} />

                                            <div class="form-group">
                                                <br></br>
                                                {/* <label for="exampleFormControlTextarea1"><h20>Image Link</h20></label> */}
                                                <textarea
                                                    class="form-control"
                                                    id="exampleFormControlTextarea1"
                                                    rows="10"
                                                    placeholder='Enter image src'
                                                    value={image || news.image}
                                                    onChange={(e) => { updatenewsImage(e.target.value) }}
                                                    style={{ fontSize: '16px', fontFamily: 'Mukta, calibri', color: "#6c757d", fontStyle: "italic", fontSize: "15px" }}
                                                >

                                                </textarea>
                                            </div>

                                        </div>
                                    </div>

                                    <div class="col-md-6 mb-4">
                                        <span class="badge bg-danger px-2 py-1 shadow-1-strong mb-3"><i class="fa fa-clock" aria-hidden="true"></i> {news.createdAt && news.createdAt.toString().substring(0, 10)}
                                        </span>
                                        <> </>
                                        <span
                                            className={`badge bg-${news.category === "News" ? "success" : "success"}`}
                                        >
                                             {category || news.category}
                                        </span>
                                        <br></br>
                                        <div class="form-group">
                                            <input
                                                class="form-control"
                                                id="exampleFormControlTextarea1"
                                                rows="1"
                                                placeholder='Enter Category News or Event'
                                                value={category || news.category}
                                                onChange={(e) => { updatenewsCategory(e.target.value) }}
                                                style={{ fontFamily: 'Mukta, calibri', color: "#6c757d", fontStyle: "italic", fontSize: "15px" }}
                                            >

                                            </input>

                                        </div>
                                        <br></br>
                                        <div class="form-group">
                                            <textarea
                                                class="form-control"
                                                id="exampleFormControlTextarea1"
                                                rows="3"
                                                placeholder='Enter Header'
                                                value={header || news.header}
                                                onChange={(e) => { updatenewsHeader(e.target.value) }}
                                                style={{ fontSize: '20px', fontFamily: 'Signika Negative,sans-serif', color: "#670001", fontWeight: "bold" }}
                                            >

                                            </textarea>
                                        </div>
                                        <br></br>
                                        <div class="form-group">
                                            <textarea
                                                class="form-control"
                                                id="exampleFormControlTextarea1"
                                                rows="20"
                                                placeholder='Enter Description'
                                                value={description || news.description}
                                                onChange={(e) => { updatenewsDescription(e.target.value) }}
                                                style={{ fontFamily: 'Mukta, calibri', color: "#6c757d", fontStyle: "italic", fontSize: "15px" }}
                                            >

                                            </textarea>
                                        </div>




                                    </div>
                                </div>



                            </div>




                        </div>

                        <div class="modal-footer">
                            <button onClick={() => updateforNews(newsId, updateforNews)} type="button" class="btn ">Update</button>
                        </div>

                    </div>



                </div>

            </div>

            {/* Model 3 - Create News */}
            <div class="modal fade" id="staticBackdrop3" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg">

                    <div class="modal-content">



                        <div class="modal-header">


                            <h5 class="modal-title" id="exampleModalToggleLabel">
                                <h20>Add News & Events</h20>


                            </h5>

                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>



                        </div>





                        <div class="modal-body">


                            <div className="p-4 m-4" style={{ borderRadius: '25px', textAlign: "left" }}>

                                <div class="row gx-5">
                                    <div class="col-md-4 mb-4">
                                        <div class="bg-image hover-overlay ripple shadow-2-strong rounded-5" data-mdb-ripple-color="light">

                                            <img src={newImage} class="img-fluid  shadow-lg" style={{ borderRadius: '25px' }} />

                                            <div class="form-group">
                                                <br></br>
                                                {/* <label for="exampleFormControlTextarea1"><h20>Image Link</h20></label> */}
                                                <textarea
                                                    class="form-control"
                                                    id="exampleFormControlTextarea1"
                                                    rows="10"
                                                    placeholder='Enter image src'
                                                    value={newImage}
                                                    onChange={(e) => { setnewsImage(e.target.value) }}
                                                    style={{ fontSize: '16px', fontFamily: 'Mukta, calibri', color: "#6c757d", fontStyle: "italic", fontSize: "15px" }}
                                                >

                                                </textarea>
                                            </div>

                                        </div>
                                    </div>

                                    <div class="col-md-6 mb-4">
                                        <span class="badge bg-danger px-2 py-1 shadow-1-strong mb-3"><i class="fa fa-clock" aria-hidden="true"></i> {formattedDate}
                                        </span>
                                        <> </>
                                        <span
                                            className={`badge bg-${news.category === "News" ? "success" : "success"}`}
                                        >
                                             {newCategory}
                                        </span>
                                        <br></br>
                                        <div class="form-group">
                                            <input
                                                class="form-control"
                                                id="exampleFormControlTextarea1"
                                                rows="1"
                                                placeholder='Enter Category News or Event'
                                                value={newCategory}
                                                onChange={(e) => { setnewsCategory(e.target.value) }}
                                                style={{ fontFamily: 'Mukta, calibri', color: "#6c757d", fontStyle: "italic", fontSize: "15px" }}
                                            >

                                            </input>

                                        </div>
                                        <br></br>
                                        <div class="form-group">
                                            <textarea
                                                class="form-control"
                                                id="exampleFormControlTextarea1"
                                                rows="3"
                                                placeholder='Enter Header'
                                                value={newHeader}
                                                onChange={(e) => { setnewsHeader(e.target.value) }}
                                                style={{ fontSize: '20px', fontFamily: 'Signika Negative,sans-serif', color: "#670001", fontWeight: "bold" }}
                                            >

                                            </textarea>
                                        </div>
                                        <br></br>
                                        <div class="form-group">
                                            <textarea
                                                class="form-control"
                                                id="exampleFormControlTextarea1"
                                                rows="20"
                                                placeholder='Enter Description'
                                                value={newDescription}
                                                onChange={(e) => { setnewsDescription(e.target.value) }}
                                                style={{ fontFamily: 'Mukta, calibri', color: "#6c757d", fontStyle: "italic", fontSize: "15px" }}
                                            >

                                            </textarea>

                                        </div>





                                    </div>
                                </div>



                            </div>




                        </div>

                        <div class="modal-footer">
                            <button onClick={createnews} type="button" class="btn ">Post</button>
                        </div>

                    </div>



                </div>

            </div>

        </div >
    )
}