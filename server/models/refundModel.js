const mongoose = require("mongoose");

const refundSchema = mongoose.Schema({

    id : {type: String , require},
    refundamount : {type: String , require},
    email : {type: String , require},
    description: { type: String, require },
    isSuccessfull : {type: Boolean , default : false},

}, {

    timestamps: true,

})

const refundModel = mongoose.model('refunds', refundSchema)

module.exports = refundModel