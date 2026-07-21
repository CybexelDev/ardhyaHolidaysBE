var express = require('express');
var router = express.Router();
const { getVahicleData, getCategory,  getPackageData, relatedVehicles, bookingVehicle } = require('../Controllers/userController')


router.get('/getVahicleData', getVahicleData)
router.get('/getCategory', getCategory)
router.get('/getPackageData', getPackageData)
router.get('/relatedVehicles', relatedVehicles)
router.post('/bookingVehicle', bookingVehicle)



module.exports = router;