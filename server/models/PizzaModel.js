const mongoose = require("mongoose");

const pizzaSchema = mongoose.Schema({
    name: {
        type: String,
        
    },
    varients: {
        type: [String],
        
    },
    prices: {
        type: [{
            small: Number,
            medium: Number,
            large: Number
        }],
        
    },
    image: {
        type: String,
        
    },
    description: {
        type: String,
        
    },
    isNonVeg: {
        type: Boolean,
        
    },
    isVegetarian: {
        type: Boolean,
        
    },
    isBeverage: {
        type: Boolean,
        
    },
}, {
    timestamps: true,
});

const Pizza = mongoose.model("Pizza", pizzaSchema);

module.exports = Pizza;
