import React from 'react';


export default function Footer() {



    return (
        <div>
            <br />
            <br />
            <br />
           
            
        <div  style={{ backgroundColor: '#0A0708', color: 'white' , bottom : '0', marginTop: '400px', width : '100%' }}>
            
            <div class="container" >
                <footer class="py-5" >
                    <div class="row">
                        <div class="col-6 col-md-2 mb-3">

                            <ul class="nav flex-column">

                                <a href="/">
                                    <img src="https://static.wixstatic.com/media/618c8c_698b18719d9142ca9ec080803802ceb4~mv2.png" alt="" width="110" height="65" class="d-inline-block align-text-top" />
                                </a>
                                <br/>
                                <i class="fab fa-facebook-f mt-2 " aria-hidden="true" style={{fontSize : '19px'}} ></i>
                        <i class="fab fa-twitter mt-2 " aria-hidden="true" ></i>
                        <i class="fab fa-youtube mt-2 " aria-hidden="true" ></i>
                                {/* <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Home</a></li>
                                <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Features</a></li>
                                <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Pricing</a></li>
                                <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">FAQs</a></li>
                                <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">About</a></li> */}
                            </ul>
                        </div>

                        <div class="col-6 col-md-2 mb-3">
                            <h5>Section</h5>
                            <ul class="nav flex-column">
                                <li class="nav-item mb-2"><a href="/" class="nav-link p-0 text-muted">Home</a></li>
                                <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Menus</a></li>
                                <li class="nav-item mb-2"><a href="/feedback" class="nav-link p-0 text-muted">Feedback</a></li>
                                <li class="nav-item mb-2"><a href="/faq" class="nav-link p-0 text-muted">FAQs</a></li>
                                <li class="nav-item mb-2"><a href="/about" class="nav-link p-0 text-muted">About Us</a></li>
                            </ul>
                        </div>

                        <div class="col-6 col-md-2 mb-3">
                            <h5>Section</h5>
                            <ul class="nav flex-column">
                                <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Promos</a></li>
                                <li class="nav-item mb-2"><a href="/newsfeed" class="nav-link p-0 text-muted">News & Events</a></li>
                                <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Careers</a></li>
                                <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Terms & Conditions</a></li>
                               
                                <li class="nav-item mb-2"><a href="/register" class="nav-link p-0 text-muted">Sign Up</a></li>
                            </ul>
                        </div>
                        

                        <div class="col-md-5 offset-md-1 mb-3">
                            <form>
                                {/* <a href="/">
                                    <img src="https://static.wixstatic.com/media/618c8c_9a01260c6c1144c589bec4245b92f9b3~mv2.png" alt="" width="88" height="55" class="d-inline-block align-text-top" />
                                </a>
                               
                                <br/>
                                 */}
                                <h5>Subscribe to our newsletter</h5>
                                <p>Monthly digest of what's new and exciting from us.</p>
                                <div class="d-flex flex-column flex-sm-row w-100 gap-2">
                                    <label for="newsletter1" class="visually-hidden">Email address</label>
                                    <input id="newsletter1" type="text" class="form-control" placeholder="Email address" />
                                    <button class="btn" type="button">Subscribe</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div>
                    
                       <hr/>
                        <p className='text-end'>© 2023 Hungry Meals, Inc. All rights reserved.</p>
                       
                    </div>
                    {/* <div class="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
                        <p>© 2022 Hungry Meals, Inc. All rights reserved.</p>
                        <ul class="list-unstyled d-flex">
                            <li class="ms-3"><a class="link-dark" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#twitter"></use></svg></a></li>
                            <li class="ms-3"><a class="link-dark" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#instagram"></use></svg></a></li>
                            <li class="ms-3"><a class="link-dark" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#facebook"></use></svg></a></li>
                        </ul>
                    </div> */}
                </footer>
            </div>
        </div>
        </div>
    )
}
