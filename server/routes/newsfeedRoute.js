const express = require("express");
const router = express.Router();
const News = require('../models/newsfeedModel')


//add news for newsfeed
router.post("/post/news", async (req, res) => {
    const { newImage, newHeader, newCategory, newDescription } = req.body;

    try {
        const news = new News({
            image: newImage,
            header: newHeader,
            category: newCategory,
            description: newDescription,
        });

        await news.save();
        res.send('News posted successfully!');
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});


//update newsfeed
router.put("/update/news/:id", async (req, res) => {

    let newsId = req.params.id;
    const { image, header,category, description } = req.body;

    const updateNews = {

        image,
        header,
        category,
        description
    }

    try {

        await News.findByIdAndUpdate(newsId, updateNews)
        res.send('News updated successfully!')

    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

//get all news
router.get("/getallnews", async (req, res) => {

    try {

        const news = await News.find({})
        res.send(news)

    } catch (error) {
        return res.status(400).json({ message: error });
    }
});


//get current news
router.get("/getcurrentnews/:id", async (req, res) => {

    let newsId = req.params.id;
    try {

        const currentnews = await News.findById(newsId)
        res.send(currentnews)

    } catch (error) {
        return res.status(400).json({ message: error });
    }

})

//Delete News
router.delete("/delete/news/:id", async (req, res) => {

    let newsId = req.params.id;

    try {
        await News.findByIdAndDelete(newsId)

        res.send('News Deleted Successfully')
    }

    catch (error) {


        return res.status(400).json({ message: error });
    }
});


module.exports = router;