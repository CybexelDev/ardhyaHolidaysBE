const express = require('express')
const router = express.Router()
const uploadsMulter = require('../config/cloudinary');
const {adminLogin, addVehicleData, deleteVehicleData, updateVehicleData, addPackageData, deletePackageData,  addCategory, updatePackageData, vehicleBooking, addTestimonial, deleteTestimonial, deleteCategory, updateCategory, createAdmin} = require('../Controllers/adminController')
const { getVahicleData, getCategory,  getPackageData, getTestimonials} = require('../Controllers/userController')
const verifyAdmin = require('../middleware/auth')

router.post("/createAdmin", createAdmin);
router.post("/adminLogin", adminLogin);

router.post('/addVehicleData',verifyAdmin, uploadsMulter, addVehicleData);
router.delete('/deleteVehicle/:id', verifyAdmin, deleteVehicleData);
router.put('/updateVehicle/:id',verifyAdmin, uploadsMulter, updateVehicleData);
router.get('/getVahicleData',verifyAdmin, getVahicleData)

router.post('/addPackage', verifyAdmin, uploadsMulter, addPackageData);
router.delete('/deletePackage/:id',verifyAdmin, deletePackageData);
router.put('/updatePackage/:id',verifyAdmin, uploadsMulter, updatePackageData);
router.get('/getPackageData',verifyAdmin, getPackageData)

router.post('/addCategory',verifyAdmin, addCategory);
router.get('/getCategory',verifyAdmin, getCategory)
router.delete('/deleteCategory/:id',verifyAdmin, deleteCategory)
router.put('/updateCategory/:id',verifyAdmin, updateCategory);

router.get('/vehiclebooking',verifyAdmin, vehicleBooking)
router.get('/getVahicleData',verifyAdmin, getVahicleData)
router.get('/getPackageData',verifyAdmin, getPackageData)

router.post('/addTestimonial',verifyAdmin, uploadsMulter, addTestimonial);
router.delete('/deleteTestimonial/:id',verifyAdmin, deleteTestimonial);
router.get('/getTestimonials',verifyAdmin, getTestimonials)


module.exports = router;



 