var express = require('express');
var router = express.Router();
const { getVahicleData, getCategory,  getPackageData, relatedVehicles, bookingVehicle, getTestimonials } = require('../Controllers/userController')


router.get('/getVahicleData', getVahicleData)
router.get('/getCategory', getCategory)
router.get('/getPackageData', getPackageData)
router.get('/relatedVehicles', relatedVehicles)
router.post('/bookingVehicle', bookingVehicle)
router.get('/getTestimonials', getTestimonials)



module.exports = router;