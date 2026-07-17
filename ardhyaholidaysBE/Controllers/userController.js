const VEHICLE = require('../Models/vehicleModel')
const CATEGORY = require('../Models/categoryModel')



const getVahicleData = async (req, res) => {

    try {

        const vehicleData = await VEHICLE.find();
        res.status(200).json({ vehicleData });

    }catch (error) {
        console.error('Error fetching vehicle data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

}


const getCategory = async (req, res) => {
    try {
        const categoryData = await CATEGORY.find();
        res.status(200).json({ categoryData });
    } catch (error) {
        console.error('Error fetching category data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }   
}



module.exports = { getVahicleData, getCategory }