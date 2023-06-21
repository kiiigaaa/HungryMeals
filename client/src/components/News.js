import React, { useState } from "react";
import { Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'


export default function News({ news }) {


    return (


        // <div className="shadow-lg p-4 m-4 bg-white" style={{ borderRadius: '25px', textAlign: "left" }}>
        <div className="p-4 m-4" style={{ borderRadius: '25px', textAlign: "left" }}>

            <div class="row gx-5">
                <div class="col-md-4 mb-4">
                    <div class="bg-image hover-overlay ripple shadow-2-strong rounded-5" data-mdb-ripple-color="light">

                        <img src={news.image} class="img-fluid  shadow-lg" style={{ borderRadius: '25px' }} />

                    </div>
                </div>

                <div class="col-md-6 mb-4">
                    <span class="badge bg-danger px-2 py-1 shadow-1-strong mb-3"><i class="fa fa-clock" aria-hidden="true"></i> {news.createdAt.substring(0, 10)}</span>
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


    )
}

