const mongoose = require("mongoose");
const validator = require('validator');
const schema = mongoose.Schema;

let PlaylistSchema = new schema({
    name:{
        type:String,
        required:true,
        maxlength:3,
    },
    email:{
        type:String,
        required:true,
        unique:[true, "Email ID is already present"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email");
            }
        }
    }
})

module.exports = mongoose.model("Employee", PlaylistSchema);