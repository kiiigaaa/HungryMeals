const mongoose = require("mongoose");

const userAdminSchema = mongoose.Schema({

    AdminName: { type: String, require },
    AdminEmail: { type: String, require },
    AdminPassword: { type: String, require },
    isAdmin: { type: Boolean, require, default: true },

}, {

    timestamps: true,

})

const Admin = mongoose.model('admins', userAdminSchema)

module.exports = Admin