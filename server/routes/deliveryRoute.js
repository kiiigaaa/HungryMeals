const express = require("express");
const router = express.Router();
const Driver = require("../models/driverModel")
const Order = require('../models/orderModel')
const Delivery = require('../models/deliveryModel')

router.post("/login", async (req, res) => {
  const { email, Password } = req.body;

  try {
    // Find a driver with the given email and password
    const driver = await Driver.findOne({ email, Password });

    if (driver) {
      // Create a response object with the driver's name, email, and ID
      const currentDriver = {
        name: driver.Name,
        email: driver.email,
        _id: driver._id,
      };

      // Send the response object back to the client
      res.send(currentDriver);
    } else {
      // If no driver was found, send an error message
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    // If an error occurred, send a generic error message
    res.status(500).json({ message: "Something went wrong" });
  }
});

//register new Driver
router.post("/addDriver", async (req, res) => {
  const { name, email, phone, Password } = req.body;

  try {
    const driverExist = await Driver.findOne({ email });

    if (driverExist) {
      return res.status(400).json({ message: "Driver already exists" });
    } else {
      const newDriver = new Driver({
        Name: name,
        email,
        phone,
        Password,
      });

      await newDriver.save();
      res.status(201).json({ message: "New driver created" });
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

// Update driver by id
router.put('/driver/:id', async (req, res) => {
  try {
    const driver = await Driver.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!driver) {
      return res.status(404).send({ error: 'Driver not found' });
    }
    res.send(driver);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// DELETE a driver by their ID
// router.delete("/drivers/:id", async (req, res) => {
//   try {
//     const driver = await Driver.findById(req.params.id);

//     if (!driver) {
//       return res.status(404).json({ message: "Driver not found" });
//     }

//     // Check if the driver is assigned to any deliveries
//     const assignedDeliveries = await Delivery.find({ driver: req.params.id });
//     if (assignedDeliveries.length > 0) {
//       return res.status(400).json({ message: "Driver is assigned to a delivery and cannot be deleted" });
//     }

//     await Driver.findByIdAndDelete(req.params.id);
//     res.json({ message: "Driver deleted" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

router.put("/update/status/delivery/:id", async (req, res) => {

  let orderId = req.params.id;
  const { isDeliveryAccepted } = req.body;

  const updateisDeliveryAccepted = {

    isDeliveryAccepted,

  }

  try {

      await Order.findByIdAndUpdate(orderId, updateisDeliveryAccepted)
      res.send('Delivery status Updated Successfully')

  } catch (error) {
      return res.status(400).json({ message: error });
  }
});

router.post("/post/delivery", async (req, res) => {

  const { driverName, orderId, location,coordinates,orderItems, customerName, amount,driverRate } = req.body



  try {


      const newDelivery = new Delivery({ driverName, orderId, location,coordinates,orderItems, customerName, amount,driverRate })
      newDelivery.save()
      res.send('Delivery Posted Successfully!')


  } catch (error) {

      return res.status(400).json({ message: error });
  }
});

router.get("/getalldeliveries", async (req, res) => {


  try {

      const deliveries = await Delivery.find()
      res.send(deliveries)

  } catch (error) {
      return res.status(400).json({ message: error });
  }
});

router.delete("/delete/delivery/:id", async (req, res) => {

  let deliveryId = req.params.id;

  try {
      await Delivery.findByIdAndDelete(deliveryId)

      res.send('Delivery Deleted Successfully')
  }

  catch (error) {


      return res.status(400).json({ message: error });
  }
});

router.get("/getcoordinates", async (req, res) => {
  try {
    const deliveries = await Delivery.find().select("coordinates");
    const coordinates = deliveries.map(delivery => delivery.coordinates);
    res.json(coordinates);
  } catch (error) {
    console.log("Error fetching coordinates:", error);
    res.status(500).json({ error: "Failed to fetch coordinates" });
  }
});


router.put('/status/:id', async (req, res) => {
  const deliveryId = req.params.id;

  try {
    const delivery = await Delivery.findById(deliveryId);

    if (!delivery) {
      return res.status(404).json({ message: 'Delivery not found' });
    }

    // Update the delivery status
    delivery.isdelivered = true;

    await delivery.save();

    res.json({ message: 'Delivery status updated successfully' });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});


module.exports = router;