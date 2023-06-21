const mongoose = require("mongoose");

const newsfeedSchema = mongoose.Schema({

    image: { type: String, require },
    header: { type: String, require },
    category: { type: String, require ,default: 'News'},
    description: { type: String, require}

}, {

    timestamps: true,

})

const NewsfeedModel = mongoose.model('news', newsfeedSchema)

module.exports = NewsfeedModel