import React from 'react'

function FAQScreen() {
    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <br />
<div className='faq' >
            <div className='container' >
                
                <div class="wrapper bg-white rounded shadow" >
                    <br></br>

                    <div class="h2 text-center fw-bold">Frequently Asked Questions</div>

                    <div class="d-flex justify-content-center"  >

                    </div>
                    <br></br>
                    <div class="accordion accordion-flush border-top border-start border-end" id="myAccordion">
                        <div class="accordion-item"> <h2 class="accordion-header" id="flush-headingOne">
                            <button class="accordion-button collapsed border-0" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">What is HungryMeals.com ? </button> </h2>
                            <div id="flush-collapseOne" class="accordion-collapse collapse border-0" style={{ background: 'white', fontSize: '15px' }} aria-labelledby="flush-headingOne" data-bs-parent="#myAccordion"> <div class="accordion-body p-0">
                                <p className='p-3'>Hungry Meals is a online pizza ordering platform that makes it possible for customers to buy pizzas and other menu items from us delivered right to their home.
                                    The process is fast and efficient and easy</p>

                            </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-headingOne">
                                <button class="accordion-button collapsed border-0" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">What payment methods does HungryMeals.com accept? </button>
                            </h2>
                            <div id="flush-collapseTwo" style={{ background: 'white', fontSize: '15px' }} class="accordion-collapse collapse border-0" aria-labelledby="flush-headingOne" data-bs-parent="#myAccordion">
                                <div class="accordion-body p-3">
                                    <p>Cash On Delivery(COD)</p>
                                    <p>Online payments (Debit or Credit Cards)</p>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item"> <h2 class="accordion-header" id="flush-headingOne">
                            <button class="accordion-button collapsed border-0" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree"> What is the order cancelation policy? </button> </h2>
                            <div id="flush-collapseThree" style={{ background: 'white', fontSize: '15px' }} class="accordion-collapse collapse border-0" aria-labelledby="flush-headingOne" data-bs-parent="#myAccordion">
                                <div class="accordion-body p-0">
                                    <p className='p-3'>
                                        HungryMeals.com cancelation policy will be dependent on the status of the order.
                                        Canceling an order before it has been accepted by the restaurant will entitle you to a full refund.
                                        Canceling after the order has been accepted by the restaurant will entitle you to a partial refund.


                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item"> <h2 class="accordion-header" id="flush-headingOne">
                            <button class="accordion-button collapsed border-0" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour"> How can be a member od HungryMeals.com ? </button> </h2>
                            <div id="flush-collapseFour" style={{ background: 'white', fontSize: '15px' }} class="accordion-collapse collapse border-0" aria-labelledby="flush-headingOne" data-bs-parent="#myAccordion"> <div class="accordion-body p-0"> <ul class="list-unstyled m-0">
                                <p className='p-3'>
                                    Click on 'Login' at the top of the page.
                                    Then click on registration link and fill out your information in the form  and click on the 'Register' button.


                                </p>
                            </ul>
                            </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-headingOne">
                                <button class="accordion-button collapsed border-0" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive"> Can I make changes to my order? </button>
                            </h2>
                            <div id="flush-collapseFive" style={{ background: 'white', fontSize: '15px' }} class="accordion-collapse collapse border-0" aria-labelledby="flush-headingOne" data-bs-parent="#myAccordion">
                                <div class="accordion-body p-0">
                                    <p className='p-3'>Most of the time, you may ask for modifications to your order.
                                        To do this, just make use of the contact Customer Support field for any request</p>

                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-headingOne">
                                <button class="accordion-button collapsed border-0" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSix" aria-expanded="false" aria-controls="flush-collapseSix">How can I place the order via HungryMeals.com ? </button>
                            </h2>
                            <div id="flush-collapseSix" style={{ background: 'white', fontSize: '15px' }} class="accordion-collapse collapse border-0" aria-labelledby="flush-headingOne" data-bs-parent="#myAccordion">
                                <div class="accordion-body p-0">
                                    <p className='p-3'>

                                        Enter your exact delivery address, payment method and your phone number.
                                        Always make sure that you enter the correct phone number to help us contact you regarding your order if needed.
                                        Now sit back, relax, and we'll get your food delivered to your doorstep
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            </div>
        </div>
    )
}

export default FAQScreen