import React from 'react'

function SelectionUserAndCareer() {
  return (
    <div>
       <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className='row justify-content-center mb-5'>

        <div class="card col-md-4 m-4 shadow p-3 mb-5 bg-white" style={{width: '18rem', height: '22rem'}}>
          <img class="card-img-top" src="https://img.freepik.com/free-vector/recruit-agent-analyzing-candidates_74855-4565.jpg?w=1060&t=st=1677854482~exp=1677855082~hmac=510d6fe3cc286151bb9c377e979270807a3565bf04f65770a56923b581594d3e" alt="Card image cap"/>
            <div class="card-body">
            <br/>
             
              <h5 class="card-title"> Users Management</h5>
              <p class="card-text"></p>
              <a href="customers" class="btn">Click Here</a>
            </div>
        </div>

        <div class="card col-md-4 m-4 shadow p-3 mb-5 bg-white" style={{width: '18rem', height: '22rem'}}>
          <img class="card-img-top" src="https://img.freepik.com/free-vector/tiny-people-searching-business-opportunities_74855-19928.jpg?w=1060&t=st=1677854394~exp=1677854994~hmac=9a7936ccb95ccb8ec6345497e4863966b976f75232191cf824616fbc28aff44d" alt="Card image cap"/>
            <div class="card-body">
              <br/>
              <h5 class="card-title">CareerFeed Management</h5>
              <br/>
              <a href="jobportalManage" class="btn">Click Here</a>
            </div>
        </div>

      </div>
    </div>
  )
}

export default SelectionUserAndCareer
