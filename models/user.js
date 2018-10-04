let mongoose = require('mongoose');
let settingsSchema = require('./settings');
let userSchema = new mongoose.Schema({
    firstname :  {type : String, required : true},
    lastname : {type : String, required : true},
    dateOfCreation : { type : Date, default : Date.now},
    email : {type : String, required : true, unique : true, index : true},
    password: {type : String, required : true},
    age : {type : String, required : true},
    settings : settingsSchema
});

module.exports = userSchema;