const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema({

    name: { type: String, require },
    email: { type: String, require },
    subject: { type: String, require },
    message: { type: String, require },
    isDisplayed: { type: Boolean, require , default : false }

}, {

    timestamps: true,

})

module.exports = mongoose.model('feedbacks', feedbackSchema)