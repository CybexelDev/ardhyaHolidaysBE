var express = require('express');
var router = express.Router();
const { getVahicleData, getCategory,  getPackageData } = require('../Controllers/userController')


router.get('/getVahicleData', getVahicleData)
router.get('/getCategory', getCategory)
router.get('/getPackageData', getPackageData)


module.exports = router;