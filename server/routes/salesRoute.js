const express = require("express");
const router = express.Router();
const Refund = require('../models/orderModel')

router.put("/update/transactionstatus/:id", async (req, res) => {

    let salesid = req.params.id;
    const { isSuccessfull } = req.body;
  
    const updateisSuccessful = {
  
        isSuccessfull,
  
    }
  
    try {
  
        await Sale.findByIdAndUpdate(salesid, updateisSuccessful)
        res.send('Refund Status Updated Successfully')
  
    } catch (error) {
        return res.status(400).json({ message: error });
    }
  });
  
  module.exports = router;