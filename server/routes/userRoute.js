const express = require("express");
const router = express.Router();
const User = require("../models/userModel");



router.post("/register", async (req, res) => {

    const { name, email, password } = req.body
    


    try {




        const userExit = await User.findOne({ email })

        if (userExit) {

            return res.status(400).json({ message: error });

        } else {

            const newUser = new User({ name, email, password })
            newUser.save()
            res.send('User Registered Successfully')
        }

    } catch (error) {

        return res.status(400).json({ message: error });
    }
});


router.post("/addcustomer", async (req, res) => {

    const { name, email, password } = req.body



    try {


        const userExit = await User.findOne({ email })

        if (userExit) {

            return res.status(400).json({ message: error });

        } else {

            const newUser = new User({ name, email, password })
            newUser.save()
            res.send('Customer added Successfully')
        }

    } catch (error) {

        return res.status(400).json({ message: error });
    }

});

router.post("/login", async (req, res) => {

    const { email, password } = req.body

    try {

        const user = await User.find({ email, password })

        if (user.length > 0) {

            const currentUser = {
                name: user[0].name,
                email: user[0].email,
                isVerified: user[0].isVerified,
                notifications: user[0].notifications,
                _id: user[0]._id,

                notificationOneImage: user[0].notificationOneImage,
                notificationOneHeader: user[0].notificationOneHeader,
                notificationOneBody: user[0].notificationOneBody,
                notificationOneDate: user[0].notificationOneDate,

                notificationTwoImage: user[0].notificationTwoImage,
                notificationTwoHeader: user[0].notificationTwoHeader,
                notificationTwoBody: user[0].notificationTwoBody,
                notificationTwoDate: user[0].notificationTwoDate,

                notificationThreeImage: user[0].notificationThreeImage,
                notificationThreeHeader: user[0].notificationThreeHeader,
                notificationThreeBody: user[0].notificationThreeBody,
                notificationThreeDate: user[0].notificationThreeDate,

                notificationFourImage: user[0].notificationFourImage,
                notificationFourHeader: user[0].notificationFourHeader,
                notificationFourBody: user[0].notificationFourBody,
                notificationFourDate: user[0].notificationFourDate,

            }
            res.send(currentUser);

        }
        else {

            return res.status(400).json({ message: 'User Login Failed' });

        }

    } catch (error) {

        return res.status(400).json({ message: 'Something went wrong' });
    }
})


router.get("/getcurrentuser/:id", async (req, res) => {

    let userId = req.params.id;
    try {

        const currentusers = await User.findById(userId)
        res.send(currentusers)

    } catch (error) {
        return res.status(400).json({ message: error });
    }

})

router.get("/getallusers", async (req, res) => {


    try {

        const users = await User.find()
        res.send(users)

    } catch (error) {
        return res.status(400).json({ message: error });
    }
});


router.put("/update/password/:id", async (req, res) => {

    let userId = req.params.id;
    const { password } = req.body;

    const updateUserPassword = {

        password,

    }

    try {

        await User.findByIdAndUpdate(userId, updateUserPassword)
        res.send('User Password Updated Successfully')

    } catch (error) {
        return res.status(400).json({ message: error });
    }
});


router.put("/update/name/:id", async (req, res) => {

    let userId = req.params.id;
    const { name } = req.body;

    const updateUserName = {

        name,

    }

    try {

        await User.findByIdAndUpdate(userId, updateUserName)
        res.send('User Name Updated Successfully')

    } catch (error) {
        return res.status(400).json({ message: error });
    }
});



router.put("/update/email/:id", async (req, res) => {

    let userId = req.params.id;
    const { email } = req.body;

    const updateUserEmail = {

        email,

    }

    try {

        await User.findByIdAndUpdate(userId, updateUserEmail)
        res.send('User Email Updated Successfully')

    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.put("/update/notificationone/:id", async (req, res) => {

    let userId = req.params.id;
    const { notificationOneImage, notificationOneHeader, notificationOneBody, notificationOneDate } = req.body;

    const updateNotificationOne = {

        notificationOneImage,
        notificationOneHeader,
        notificationOneBody,
        notificationOneDate
    }

    try {

        await User.findByIdAndUpdate(userId, updateNotificationOne)
        res.send('User Notification One Updated Successfully')

    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.put("/update/notificationtwo/:id", async (req, res) => {

    let userId = req.params.id;
    const { notificationTwoImage, notificationTwoHeader, notificationTwoBody, notificationTwoDate } = req.body;

    const updateNotificationTwo = {

        notificationTwoImage,
        notificationTwoHeader,
        notificationTwoBody,
        notificationTwoDate
    }

    try {

        await User.findByIdAndUpdate(userId, updateNotificationTwo)
        res.send('User Notification Two Updated Successfully')

    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.put("/update/notificationthree/:id", async (req, res) => {

    let userId = req.params.id;
    const { notificationThreeImage, notificationThreeHeader, notificationThreeBody, notificationThreeDate } = req.body;

    const updateNotificationThree = {

        notificationThreeImage,
        notificationThreeHeader,
        notificationThreeBody,
        notificationThreeDate
    }

    try {

        await User.findByIdAndUpdate(userId, updateNotificationThree)
        res.send('User Notification Three Updated Successfully')

    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.put("/update/notificationfour/:id", async (req, res) => {

    let userId = req.params.id;
    const { notificationFourImage, notificationFourHeader, notificationFourBody, notificationFourDate } = req.body;

    const updateNotificationFour = {

        notificationFourImage,
        notificationFourHeader,
        notificationFourBody,
        notificationFourDate
    }

    try {

        await User.findByIdAndUpdate(userId, updateNotificationFour)
        res.send('User Notification Four Updated Successfully')

    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

//customer management delete function
router.delete("/delete/customer/:id", async (req, res) => {

    let userId = req.params.id;

    try {
        await User.findByIdAndDelete(userId)

        res.send('Customer Deleted Successfully')
    }

    catch (error) {


        return res.status(400).json({ message: error });
    }
});

//customer management update function

router.put("/update/customer/name/:id", async (req, res) => {

    let userId = req.params.id;
    const { name } = req.body;

    const updateCustomerName = {

        name,

    }

    try {

        await User.findByIdAndUpdate(userId, updateCustomerName)
        res.send('Customer Name Updated Successfully')

    } catch (error) {
        return res.status(400).json({ message: error });
    }
});



router.put("/update/customer/email/:id", async (req, res) => {

    let userId = req.params.id;
    const { email } = req.body;

    const updateCustomerEmail = {

        email,

    }

    try {

        const userExit = await User.findOne({ email })

        if (userExit) {

            res.send('Customer Email already registered')



        } else {

            await User.findByIdAndUpdate(userId, updateCustomerEmail)
            res.send('Customer Email Updated Successfully')

        }



    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.put("/update/customer/password/:id", async (req, res) => {

    let userId = req.params.id;
    const { password } = req.body;

    const updateCustomerPassword = {

        password,

    }

    try {

        await User.findByIdAndUpdate(userId, updateCustomerPassword)
        res.send('Customer Password Updated Successfully')

    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.put("/update/customer/verification/:id", async (req, res) => {

    let userId = req.params.id;
    const { isVerified } = req.body;

    const updateisVerified = {

        isVerified,

    }

    try {

        await User.findByIdAndUpdate(userId, updateisVerified)
        res.send('Customer verification Updated Successfully')

    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

module.exports = router;