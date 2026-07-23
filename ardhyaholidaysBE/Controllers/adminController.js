
const CATEGORY = require('../Models/categoryModel');
const { upload } = require('../config/cloudinary');
const { cloudinary } = require('../config/cloudinary');
const VEHICLE = require('../Models/vehicleModel')
const PACKAGE = require("../Models/packageModel");
const VEHICLEBOOKING = require('../Models/vehicleBookingModal')
const TESTIMONIALS = require("../Models/testimonialsModel");

const getPublicIdFromUrl = (url) => {
  const match = url.match(/\/upload\/v\d+\/(.+)\.[a-zA-Z0-9]+$/);
  return match ? match[1] : null;
};


const addVehicleData = async (req, res) => {

  const { vehicleName, vehicleNumber, Location, Description, SeatCapacity, MusicSystem, AC, TV, StarRating, RentPerKLM, AdvancePayment, TollCharges, Features, CategoryId,  Premium } = req.body;

  const photos = req.files.map((file) => {
    return file.path
  })

  const  featuresArray = Features.split(',').map((feature) => feature.trim());

  try {

    const newVehicle = new VEHICLE({
      Image: photos,
      vehicleName,
      vehicleNumber,
      Location,
      Description,
      SeatCapacity,
      MusicSystem,
      AC,
      TV,
      StarRating,
      RentPerKLM,
      AdvancePayment,
      TollCharges,
      Features: featuresArray,
      CategoryId,
      Premium
    })

    const savedVehicle = await newVehicle.save();
    res.status(201).json({ message: 'Vehicle data added successfully', vehicle: savedVehicle });

  }
  catch (error) {
    console.error('Error adding vehicle data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}




const deleteVehicleData = async (req, res) => {
  const vehicleId = req.params.id;

  try {
    const deletedVehicle = await VEHICLE.findByIdAndDelete(vehicleId);
    res.status(200).json({ message: 'Vehicle data deleted successfully', vehicle: deletedVehicle });
  } catch (error) {
    console.error('Error deleting vehicle data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


const updateVehicleData = async (req, res) => {
  try {
    const vehicleId = req.params.id;

    const {vehicleName, vehicleNumber, Location, Description, SeatCapacity, MusicSystem, AC, TV, StarRating, RentPerKLM, AdvancePayment, TollCharges, Features, oldImages,} = req.body;

    const vehicle = await VEHICLE.findById(vehicleId);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    let existingImages = [];

    if (oldImages) {
      existingImages =
        typeof oldImages === "string"
          ? JSON.parse(oldImages)
          : oldImages;
    }

    
    const newImages = req.files
      ? req.files.map((file) => file.path)
      : [];

 
    const deletedImages = vehicle.Image.filter(
      (img) => !existingImages.includes(img)
    );

    for (const image of deletedImages) {
      try {
        const publicId = image
          .split("/")
          .slice(-2)
          .join("/")
          .split(".")[0];

        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.log("Cloudinary Delete Error:", err.message);
      }
    }


    vehicle.Image = [...existingImages, ...newImages];

    vehicle.vehicleName = vehicleName;
    vehicle.vehicleNumber = vehicleNumber;
    vehicle.Location = Location;
    vehicle.Description = Description;
    vehicle.SeatCapacity = SeatCapacity;
    vehicle.MusicSystem = MusicSystem;
    vehicle.AC = AC;
    vehicle.TV = TV;
    vehicle.StarRating = StarRating;
    vehicle.RentPerKLM = RentPerKLM;
    vehicle.AdvancePayment = AdvancePayment;
    vehicle.TollCharges = TollCharges;

    if (Features) {
      vehicle.Features = Features
        .split(",")
        .map((item) => item.trim());
    }

    await vehicle.save();

    res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
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



const addPackageData = async (req, res) => {
  try {
    const { packageName, subTitle, Location, Duration, Description, Days,} = req.body;


    const photos = req.files.map((file) => file.path);

    let daysArray = [];

    if (Days) {
      daysArray = JSON.parse(Days);
    }

    const newPackage = new PACKAGE({
      Image: photos,
      packageName,
      subTitle,
      Location,
      Duration,
      Description,
      Days: daysArray,
    });

    const savedPackage = await newPackage.save();

    res.status(201).json({
      success: true,
      message: "Package added successfully",
      package: savedPackage,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const deletePackageData = async (req, res) => {
  const packageId = req.params.id;
  try{
    const deletedpackage = await PACKAGE.findByIdAndDelete(packageId);
    res.status(200).json({message:'Package data deleted successfully', package: deletedpackage});
  } catch (error) {
    console.error('Error deleting package data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


const addCategory = async (req, res) => {
  console.log(req.body, "rrrrrrrrrrrrrrrrrrrrrrrrr")
  try {
    const { categoryName } = req.body;

    const newCategory = new CATEGORY({
      categoryName,
    });

    const savedCategory = await newCategory.save();

    res.status(201).json({
      success: true,
      message: "Category added successfully",
      category: savedCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteCategory = async (req, res) => {
  const categoryId = req.params.id;
  try {
    const deletedCategory = await CATEGORY.findByIdAndDelete(categoryId);
    res.status(200).json({ message: 'Category data deleted successfully', category: deletedCategory });
  } catch (error) {
    console.error('Error deleting category data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const updateCategory = async (req, res) => {
  const categoryId = req.params.id;
  const { categoryName } = req.body;
  try {
    const updatedCategory = await CATEGORY.findByIdAndUpdate(categoryId, { categoryName }, { new: true });
    res.status(200).json({ message: 'Category data updated successfully', category: updatedCategory });
  } catch (error) {
    console.error('Error updating category data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const updatePackageData = async (req, res) => {
  try {
    const packageId = req.params.id;

    const {
      packageName,
      subTitle,
      Location,
      Duration,
      Description,
      Days,
      oldImages,
    } = req.body;

    const packageData = await PACKAGE.findById(packageId);

    if (!packageData) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }

    // Existing images
    let imageArray = [];

    if (oldImages) {
      imageArray =
        typeof oldImages === "string"
          ? JSON.parse(oldImages)
          : oldImages;
    }

    // New uploaded images
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((file) => file.path);
      imageArray = [...imageArray, ...newImages];
    }

    // Days array
    let daysArray = packageData.Days;

    if (Days) {
      daysArray = JSON.parse(Days);
    }

    packageData.Image = imageArray;
    packageData.packageName = packageName;
    packageData.subTitle = subTitle;
    packageData.Location = Location;
    packageData.Duration = Duration;
    packageData.Description = Description;
    packageData.Days = daysArray;

    await packageData.save();

    res.status(200).json({
      success: true,
      message: "Package updated successfully",
      package: packageData,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



const vehicleBooking = async (req, res) => {
  try{
    const bookings = await VEHICLEBOOKING.find().populate('vehicleId', 'vehicleName vehicleNumber SeatCapacity Image');
    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });

  }catch(error){
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}


const addTestimonial = async (req, res) => {

  try {
    const { name, position, content } = req.body;

    const photos = req.files.map((file) => file.path);

    const newTestimonial = new TESTIMONIALS({
      Image : photos,
      name,
      position,
      content,
    });

    const savedTestimonial = await newTestimonial.save();

    res.status(201).json({
      success: true,
      message: "Testimonial added successfully",
      testimonial: savedTestimonial,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const deleteTestimonial = async (req, res) => {
  const testimonialId = req.params.id;
   
  try {
    const deletedTestimonial = await TESTIMONIALS.findByIdAndDelete(testimonialId);
    res.status(200).json({ message: 'Testimonial data deleted successfully', testimonial: deletedTestimonial });
  } catch (error) {
    console.error('Error deleting testimonial data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

 


module.exports = { addVehicleData, deleteVehicleData, updateVehicleData, addPackageData, deletePackageData, addCategory, updatePackageData,  vehicleBooking, addTestimonial, deleteTestimonial, deleteCategory }
