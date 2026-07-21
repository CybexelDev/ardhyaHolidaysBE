const express = require('express')
const router = express.Router()
const uploadsMulter = require('../config/cloudinary');
const { addVehicleData, deleteVehicleData, updateVehicleData, addPackageData, deletePackageData,  addCategory, updatePackageData} = require('../Controllers/adminController')

router.post('/addVehicleData', uploadsMulter, addVehicleData);
router.delete('/deleteVehicle/:id', deleteVehicleData);
router.put('/updateVehicle/:id', uploadsMulter, updateVehicleData);

router.post('/addPackage', uploadsMulter, addPackageData);
router.delete('/deletePackage/:id', deletePackageData);
router.put('/updatePackage/:id', uploadsMulter, updatePackageData);
router.post('/addCategory', addCategory);


module.exports = router;



 