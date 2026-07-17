var express = require('express');
var router = express.Router();
const { getVahicleData, getCategory } = require('../Controllers/userController')


router.get('/getVahicleData', getVahicleData)
router.get('/getCategory', getCategory)


module.exports = router;