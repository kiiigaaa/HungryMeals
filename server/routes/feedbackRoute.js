const express = require("express");
const router = express.Router();
const Feedback = require("../models/feedbackModel")


router.post("/post/", async (req, res) => {

    const { name, email, subject, message, isDisplayed } = req.body



    try {


        const newFeedback = new Feedback({ name, email, subject, message, isDisplayed })
        newFeedback.save()
        res.send('Feedback send Successfully')


    } catch (error) {

        return res.status(400).json({ message: error });
    }
});

// feedback management
router.get("/getallfeedbacks", async (req, res) => {


    try {

        const Allfeedbacks = await Feedback.find()//find data from Feedback model
        res.send(Allfeedbacks)

    } catch (error) {
        return res.status(400).json({ message: error });
    }
});


//Delete feedback
router.delete("/delete/feedback/:id", async (req, res) => {

    let userId = req.params.id;

    try {
        await Feedback.findByIdAndDelete(userId)

        res.send('Feedback Deleted Successfully')
    }

    catch (error) {


        return res.status(400).json({ message: error });
    }
});

router.put("/update/feedback/display/:id", async (req, res) => {

    let userId = req.params.id;
    const { isDisplayed } = req.body;

    const updateisDisplayed = {

        isDisplayed,

    }

    try {

        await Feedback.findByIdAndUpdate(userId, updateisDisplayed)
        res.send('Feedback displayed to the Home screen Successfully')

    } catch (error) {
        return res.status(400).json({ message: error });
    }
});



module.exports = router