const express = require('express')
const router = express.Router()
const uploadsMulter = require('../config/cloudinary');
const { addVehicleData, deleteVehicleData, updateVehicleData, addPackageData, deletePackageData,  addCategory, updatePackageData, vehicleBooking, addTestimonial, deleteTestimonial, deleteCategory, updateCategory} = require('../Controllers/adminController')
const { getVahicleData, getCategory,  getPackageData} = require('../Controllers/userController')

router.post('/addVehicleData', uploadsMulter, addVehicleData);
router.delete('/deleteVehicle/:id', deleteVehicleData);
router.put('/updateVehicle/:id', uploadsMulter, updateVehicleData);

router.post('/addPackage', uploadsMulter, addPackageData);
router.delete('/deletePackage/:id', deletePackageData);
router.put('/updatePackage/:id', uploadsMulter, updatePackageData);

router.post('/addCategory', addCategory);
router.get('/getCategory', getCategory)
router.delete('/deleteCategory/:id', deleteCategory)
router.put('/updateCategory/:id', updateCategory);

router.get('/vehiclebooking', vehicleBooking)
router.get('/getVahicleData', getVahicleData)
router.get('/getPackageData', getPackageData)

router.post('/addTestimonial', uploadsMulter, addTestimonial);
router.delete('/deleteTestimonial/:id', deleteTestimonial);


module.exports = router;



 