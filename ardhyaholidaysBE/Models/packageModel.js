const mongoose = require('mongoose');

const packageSchema = mongoose.Schema({
    
    Image: {
        type: [String],
        required: true
    },
    packageName: {
        type: String,
        required: true
    },
    subTitle: {
        type: String,
        required: true
    },
    Location: {
        type: String,
        required: true
    },
    Duration: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
     Days: [
    {
      day: {
        type: Number,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
    
})

const package = mongoose.model('package', packageSchema)
module.exports = package


