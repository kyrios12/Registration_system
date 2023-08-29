const mongoose = require('mongoose');

const UserSchema =mongoose.Schema({
    username:{
        type:String,
        // Here required is not necessary as other libraries validate our data
        // required:true
    },
    email:{
        type:String,
        // required:true,
        unique:true
    },
    password:{
        type:String,
        // required:true
    }
},{timeStamps:true})
module.exports = mongoose.model("User",UserSchema);
// export the schema to import any where in the project