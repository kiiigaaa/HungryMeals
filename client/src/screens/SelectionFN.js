import React from 'react'

export default function SelectionFN() {
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {/* <div className='row justify-content-center mb-5'>

        <div class="card col-md-4 m-4 shadow p-3 mb-5 bg-white" style={{width: '20rem', height: '22rem'}}>
          <img class="card-img-top" src="https://img.freepik.com/premium-vector/two-young-women-make-choice-grocery-store-using-large-screen-smartphone-shop-windows_65580-207.jpg?w=360" alt="Card image cap"/>
            <div class="card-body">
              <h5 class="card-title"><h9>Food Catalogue</h9></h5>
              <p class="card-text"></p>
              
              <a href="/admin/addfoodcatalogue" class="btn"><i class="fa fa-plus" aria-hidden="true" style={{color : 'white'}}></i>Add</a>
            </div>
        </div>

        <div class="card col-md-4 m-4 shadow p-3 mb-5 bg-white" style={{width: '20rem', height: '22rem'}}>
          <img class="card-img-top" src="https://img.freepik.com/free-vector/mens-near-huge-smartphone-with-application-icons-screen-checking-social-media-news-feeds-social-media-news-tips-iot-smart-city-concept-vector-illustration_335657-2005.jpg?w=1380&t=st=1677156210~exp=1677156810~hmac=6b66638477c158f973f099639463207223c40956539a228fbf78680ebb6d3473" alt="Card image cap"/>
            <div class="card-body">
              <br/>
              <h5 class="card-title"><h9>Newsfeed Management</h9></h5>
              
              <a href="#" class="btn">Go <i class="fa-solid fa-arrow-right"></i></a>
            </div>
        </div>

      </div> */}


      <div className='row justify-content-center '>
        
        <div class="card col-md-4 m-4 shadow p-3 mb-5 bg-white " style={{ width: '18rem', borderRadius: '15px' }}>
          <img src="https://img.freepik.com/premium-vector/two-young-women-make-choice-grocery-store-using-large-screen-smartphone-shop-windows_65580-207.jpg?w=360" alt="Card image cap" class="card-img-top" />
          <div class="card-body">
            <h5 class="card-title"><h9>Food Catalogue</h9></h5>
            <p class="card-text"><p10>Add Foods & Beverages</p10><br></br>


            </p>
            <br />
            <br />
            <br />
            <br />
            <a href="addfoodcatalogue" class="btn">See More</a>
          </div>
        </div>



        <div class="card col-md-4 m-4 shadow p-3 mb-5 bg-white " style={{ width: '18rem', borderRadius: '15px' }}>
          <img src="https://img.freepik.com/free-vector/mens-near-huge-smartphone-with-application-icons-screen-checking-social-media-news-feeds-social-media-news-tips-iot-smart-city-concept-vector-illustration_335657-2005.jpg?w=1380&t=st=1677156210~exp=1677156810~hmac=6b66638477c158f973f099639463207223c40956539a228fbf78680ebb6d3473" alt="Card image cap" />
          <div class="card-body">
            <h5 class="card-title" style={{marginTop:"20px"}}><h9>Newsfeed Management</h9></h5>
            <p class="card-text"><p10>Manage all News & Events</p10><br></br>


            </p>
            <br />
            <br />
            <br />
            <br />
            <a href="newsfeedmanagement" class="btn">See More</a>
          </div>
        </div>


        
      </div>





    </div>
  )
}
