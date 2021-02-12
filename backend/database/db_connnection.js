const mongoose=require('mongoose');
require('dotenv').config();

//Connecting to mongoDB database
mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
  useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true},
   (err) =>{
    if(!err)
     {
       console.log('Connected to the database' )
    }
     else{
        console.log('Error while connecting:' + err);
    }
});

module.exports= mongoose;

