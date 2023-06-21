const express = require("express");
const router = express.Router();
const Jobs = require('../models/jobsModel')

//add new jobs
router.post("/post/jobs", async (req, res) => {

    const { jobtitle,category, description ,salary,location} = req.body
    try {


        const newJobs = new Jobs({ jobtitle,category, description ,salary,location })
        newJobs.save()
        res.send('Job posted successfully!')


    } catch (error) {

        return res.status(400).json({ message: error });
    }
});

//get all job details
router.get("/getalljobs", async (req, res) => {

    try {

        const jobs = await Jobs.find({})
        res.send(jobs)

    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

//update newsfeed
router.put("/update/jobs/:id", async (req, res) => {

    let userId = req.params.id;
    const {jobtitle,category, description ,salary,location } = req.body;

    const updateJobs = {

        jobtitle, 
        category, 
        description,
        salary,
        location 
    }

    try {

        await Jobs.findByIdAndUpdate(userId, updateJobs)
        res.send('Job details updated successfully!')

    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.delete("/delete/jobs/:id", async (req, res) => {

    let JobID = req.params.id;

    try {
        await Jobs.findByIdAndDelete(JobID)

        res.send('Job Deleted Successfully')
    }

    catch (error) {


        return res.status(400).json({ message: error });
    }
});

//get current jobs
router.get("/getcurrentjobs/:id", async (req, res) => {

    let jobsId = req.params.id;
    try {

        const currentjobs = await Jobs.findById(jobsId)
        res.send(currentjobs)

    } catch (error) {
        return res.status(400).json({ message: error });
    }

})








module.exports = router;