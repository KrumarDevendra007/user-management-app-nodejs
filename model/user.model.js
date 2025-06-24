const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        requried:true,
        trim:true,
        minLength:3,
        maxLength:50
    },
    age:{
        type:Number,
        requried:true,
        min:18,
        max:100
    },
    email:{
        type:String,
        unique:true,
        validate:{
            validator: function(v){
                return /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message: props => `${props.value} is not a valid email!` 
        },
        trim:true,
        lowercase:true
    },

    password:{
        type:String,
        requried:true,
        minLenght:8,
        maxLength:20,
        valialder:{
            date:{
            validator: function(v){
                return /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}/.test(v);
                 //this regex will ensure that the password contains at least one lowercase letter, one uppercase letter, one digit, and one special character

            },
            message: props => `${props.value} is not a valid password!`
        },
        trim:true,
        minLenght:8,
        maxLength:50
      }
    },
    role:{
        type:String,
        enum: ['user', 'admin', 'seller', 'superadmin'],
        default:'user'
    },

    country: {type:String, requried:false},

    isActive: {type:Boolean, default: true},

    createdAt: {type: Date, default: Date.now}
},

{
    timestamps:true //this will automatically add createdAt and updatedAt fields to the schema
});

const User = mongoose.model('User', userSchema);

module.exports = User; // Exporting the User model

//this will create a model for the user schema, which can be used to interact with the users collection in the database
