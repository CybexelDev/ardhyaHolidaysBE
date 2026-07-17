const express = require('express')
const router = express.Router()
const uploadsMulter = require('../config/cloudinary');
const { addVehicleData, deleteVehicleData, updateVehicleData } = require('../Controllers/adminController')

router.post('/addVehicleData', uploadsMulter, addVehicleData);
router.delete('/deleteVehicle/:id', deleteVehicleData);
router.put('/updateVehicle/:id', uploadsMulter, updateVehicleData);


module.exports = router;



 