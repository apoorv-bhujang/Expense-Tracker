
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const budgetSchema = new Schema({
    month: {
        type: String,
        required: true
    },
    foodBud: {
        type: Number
    },
    drinksBud: {
        type: Number
    },
    smokeBud: {
        type: Number
    },
    entertainmentBud: {
        type: Number
    },
    travelBud: {
        type: Number
    },
    shoppingBud: {
        type: Number
    }
});

module.exports = mongoose.model('Budget', budgetSchema);