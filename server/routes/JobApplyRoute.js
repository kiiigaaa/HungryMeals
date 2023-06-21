const express = require("express");
const router = express.Router();
const Application = require("../models/JobApplyModel")


router.post("/post", async (req, res) => {

    const {
        name,
        email,
        address,
        phoneNo,
        jobCategory
    } = req.body

    

    try {


        const newApplication = new Application({ name, email, address, phoneNo, jobCategory })
        newApplication.save()
        res.send('Application send Successfully')


    } catch (error) {

        return res.status(400).json({ message: error });
    }
});

router.get("/getallApplications", async (req, res) => {


    try {

        const AllApplications = await Application.find()//find data from Feedback model
        res.send(AllApplications)

    } catch (error) {
        return res.status(400).json({ message: error });
    }
});



router.delete("/delete/applicants/:id", async (req, res) => {

    let applicationId = req.params.id;

    try {
        await Application.findByIdAndDelete(applicationId)

        res.send('Application Deleted Successfully')
    }

    catch (error) {


        return res.status(400).json({ message: error });
    }
});
module.exports = router