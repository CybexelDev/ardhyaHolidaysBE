const mongoose = require('mongoose');

const adminAuthSchema = mongoose.Schema({
   
        name:{
            type: String,
            required: true
        },
        phoneNumber:{
            type: String,
            required: true
        },
        destination:{
            type: String,
            required: true
        },
        startDate:{
            type: Date,
            required: true
        },
        endDate:{
            type: Date,
            required: true
        },
        message:{   
            type: String,
            required: true
        },
             
    })


const enquiry = mongoose.model('enquiries', adminAuthSchema)
module.exports = enquiry