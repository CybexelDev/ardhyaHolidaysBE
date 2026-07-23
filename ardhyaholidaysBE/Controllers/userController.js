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






module.exports = { getVahicleData, getCategory, getPackageData, relatedVehicles, bookingVehicle, getTestimonials };