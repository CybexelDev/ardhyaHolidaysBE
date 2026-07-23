const mongoose = require('mongoose');

const testimonialSchema = mongoose.Schema({
  Image: {
    type: [String],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
});

const testimonials = mongoose.model("testimonials", testimonialSchema);

module.exports = testimonials;