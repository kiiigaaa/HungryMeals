const express = require("express");
const router = express.Router();
const Notification = require("../models/notificationModel")




router.post("/post/", async (req, res) => {

    const { notificationImage, notificationHeader, notificationBody, notificationDate } = req.body



    try {


        const newPubNoti = new Notification({ notificationImage, notificationHeader, notificationBody, notificationDate })
        newPubNoti.save()
        res.send('Public Notification Posted Successfully')


    } catch (error) {

        return res.status(400).json({ message: error });
    }
});




router.get("/getnotifications", async (req, res) => {


    try {

        const notifications = await Notification.find()
        res.send(notifications)

    } catch (error) {
        return res.status(400).json({ message: error });
    }
});



router.put("/update/notification/:id", async (req, res) => {

    let userId = req.params.id;
    const { notificationImage, notificationHeader, notificationBody, notificationDate } = req.body;

    const updateNotification = {

        notificationImage,
        notificationHeader,
        notificationBody,
        notificationDate
    }

    try {

        await Notification.findByIdAndUpdate(userId, updateNotification)
        res.send('User Public Notification Updated Successfully')

    } catch (error) {
        return res.status(400).json({ message: error });
    }
});



module.exports = router;