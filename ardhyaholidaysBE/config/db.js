const mongoose = require('mongoose')

const connectDb = async()=>{

      try {

        const connection = await mongoose.connect('mongodb+srv://developerscbecybexel_db_user:uEmS90dMCVsUkGJ1@aradhyaholidays.fapsrj6.mongodb.net/')
         console.log("Mongodb database Connected!");
         
        
      } catch (error) {
        console.log(error);

      }
}

module.exports=connectDb