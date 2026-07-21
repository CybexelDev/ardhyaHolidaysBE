const mongoose = require("mongoose");

const vehicleBookingSchema = mongoose.Schema({

    vehicleId: {
        type: String,
        required: true
    },
    pickupDate: {
        type: Date,
        required: true
    },
    returnDate: {
        type: Date,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    customerPhone: {
        type: String,
        required: true
    },

})

const vehicleBooking = mongoose.model('vehicleBooking', vehicleBookingSchema)
module.exports = vehicleBooking