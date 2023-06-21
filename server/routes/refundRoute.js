const express = require("express");
const router = express.Router();
const Refund = require('../models/refundModel')


router.post("/addrefund", async (req, res) => {
  const refund = req.body.refund;

  try {
    const newrefund = new Refund({
      id: refund.id,
      refundamount: refund.refundamount,
      email: refund.email,
      description: refund.description,
      isSuccessfull: refund.isSuccessfull
    });
    await newrefund.save();
    res.send('New Refund Transaction Added Successfully');
  } catch (error) {
    console.error(error);
    return res.status(400).jason({message:error});
  }
});



router.get("/getallrefunds", async (req, res) => {
  try {
    const refunds = await Refund.find({})
    res.send(refunds)
  } catch (error) {
    return res.status(400).json({ message: error })

  }

});

// router.post("/updateStatus", async (req,res) => {

//   const refundid = req.body.refundid
//   try {
//     const refund = await Refund.findOne({_id:refundid})
//     refund.isSuccessfull=true
//     await refund.save()
//     res.send('Transaction added successfully')
//   } catch (error) {
//     return res.status(400).json({message : 'something went wrong'})
//   }
// });

router.put("/update/pendingrefund/:id", async (req, res) => {

  let refundid = req.params.id;
  const { isSuccessfull } = req.body;

  const updateisSuccessful = {

      isSuccessfull,

  }

  try {

      await Refund.findByIdAndUpdate(refundid, updateisSuccessful)
      res.send('Refund status Updated Successfully')

  } catch (error) {
      return res.status(400).json({ message: error });
  }
});

router.delete("/delete/Refund/:id", async (req, res) => {

  let refundid = req.params.id;

  try {
      await Refund.findByIdAndDelete(refundid)

      res.send('Order Deleted Successfully')
  }

  catch (error) {


      return res.status(400).json({ message: error });
  }
});

module.exports = router;