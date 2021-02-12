const mongoose = require('mongoose');

//A users schema describing the contents of the documents within this collection
const usersSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { 
        type: String, 
        required: [true,'This field is required']
     },

    surname: { 
        type: String, 
        required: [true,'This field is required'] 
     },

    email: { 
        type: String,
        required: [true,'This field is required'] ,
        unique: true,
    },

    password: { 
        type: String,
        required: [true,'This field is required for security reasons']
      },

    age: { 
        type: Number,
        
     },

    location: { 
        type: String,
        
    },

    skills: [
        {id: String, name:String}
    ],

    phoneNumber: { 
        type: String,
      
    },

    video: { 
        type:String
    },
    
    image: { 
        type: String
    },
});

module.exports = mongoose.model('Users', usersSchema);