const mongoose = require("mongoose");
const VEHICLE = require('../Models/vehicleModel')
const CATEGORY = require('../Models/categoryModel')
const PACKAGE = require('../Models/packageModel')
const VEHICLEBOOKING = require('../Models/vehicleBookingModal')
const TESTIMONIALS = require("../Models/testimonialsModel");


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


const getPackageData = async (req, res) => {
  try{

    const packageData = await  PACKAGE.find();
    res.status(200).json({ data : packageData });

  }catch(error){
    console.error('Error fetching package data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


const relatedVehicles = async (req, res) => {
  try {
    const { CategoryId, SeatCapacity } = req.body;

    const vehicles = await VEHICLE.aggregate([
      {
        $match: {
          CategoryId: CategoryId,
          SeatCapacity: SeatCapacity,
        },
      },
      {
        $project: {
          vehicleName: 1,
          vehicleNumber: 1,
          SeatCapacity: 1,
          RentPerKLM: 1,
          Image: 1,
          Location: 1,
          StarRating: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      count: vehicles.length,
      vehicles,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const bookingVehicle = async (req, res) =>{
    try{
           const { vehicleId, pickupDate, returnDate, customerName, customerPhone } = req.body;
         
           
           const vehicle = await VEHICLE.findById(vehicleId);

              if (!vehicle) {
                return res.status(404).json({
                  success: false,
                  message: "Vehicle not found",
                });
              }
                
              const newBooking = new VEHICLEBOOKING({
                vehicleId,
                pickupDate,
                returnDate,
                customerName,
                customerPhone,
              });

                const savedBooking = await newBooking.save();

                res.status(201).json({
                  success: true,
                  message: "Vehicle booked successfully",
                  booking: savedBooking,
                });

    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
          });
    }
}


const getTestimonials = async (req, res) => {
  try {
    const testimonials = await TESTIMONIALS.find();
    res.status(200).json({  
success: true,
      count: testimonials.length,
      testimonials,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}


const getSearchResults = async (req, res) => {
  try {
    const { destination, duration } = req.query;

    const query = {
      $or: []
    };

    if (destination) {
      query.$or.push({
        Location: { $regex: destination, $options: "i" }
      });
    }

    if (duration) {
      query.$or.push({
        Duration: { $regex: duration, $options: "i" }
      });
    }

    const searchResults = await PACKAGE.find(query);

    if (searchResults.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No packages found",
      });
    }

    res.status(200).json({
      success: true,
      count: searchResults.length,
      packages: searchResults,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const vehicleDetails = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    
    const vehicle = await VEHICLE.findById(vehicleId);

    if (!vehicle) { 
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    res.status(200).json({
      success: true,
      vehicle,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const packageDetails = async (req, res) => {
  try {
    const { packageId } = req.params;
    const package = await PACKAGE.findById(packageId);

    if (!package) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }

    res.status(200).json({
      success: true,
      package,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getDurationAndLocation = async (req, res) => {
  try {
    const packages = await PACKAGE.find({}, 'Duration Location');
     
    if (!packages || packages.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No packages found",
      });
    }

    const duration= packages.map(pkg => ({
      Duration: pkg.Duration,
    }));

     const location = packages.map(pkg => ({
      destination: pkg.Location
    }));

    res.status(200).json({
      success: true,
      data: { duration, location },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }

}


module.exports = { getVahicleData, getCategory, getPackageData, relatedVehicles, bookingVehicle, getTestimonials, getSearchResults, vehicleDetails, packageDetails, getDurationAndLocation };