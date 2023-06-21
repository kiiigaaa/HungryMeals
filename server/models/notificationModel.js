const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema({

    
    notificationImage: { type: String, require, default: 'https://img.freepik.com/free-vector/character-illustration-people-with-internet-message-icons_53876-66149.jpg?w=900&t=st=1672323497~exp=1672324097~hmac=8f1145a507dba8e09043821090e0b1a0681a94cd1d95ce7f2459d0cb08ef4fe3' },
    notificationHeader: { type: String, require, default: 'empty' },
    notificationBody: { type: String, require, default: 'empty' },
    notificationDate: { type: String, require, default: '0000-00-00' },

  
}, {

    timestamps: true,

})

const Notification = mongoose.model('notifications', notificationSchema)

module.exports = Notification