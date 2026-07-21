const mongoose = require('mongoose');


const vehiclesSchema = mongoose.Schema({

    Image: {
        type: [String],
        required: true
    },
    vehicleName: {
        type: String,
        required: true
    },
    vehicleNumber: {
        type: String,
        required: true
    },
    Location: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    SeatCapacity: {
        type: Number,
        required: true
    },
    MusicSystem: {
        type: Boolean,
        required: true
    },
    AC: {
        type: Boolean,
        required: true
    },
    TV:{
        type: Boolean,
        required: true
    },
    StarRating: {
        type: Number,
        required: true
    },
    RentPerKLM: {
        type: Number,
        required: true
    },
    AdvancePayment: {
        type: Number,
        required: true
    },
    TollCharges: {
        type: String,
        required: true
    },
    Features: {
        type: [String],
        required: false
    },
    CategoryId: {
        type: String,
        required: true
    },

})


const vehicles = mongoose.model('vehicles', vehiclesSchema)
module.exports = vehicles