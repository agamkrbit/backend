let mongoose = require('mongoose');

let testSchema = new mongoose.Schema({
    id : { type : Number , required : true , default : 0 },
    name : { type : String, required : true},
    description : {type : String, required : true},
    noUserAttempted : { type : Number , default : 0},
    noUserLike: {type : Number , default : 0},
    questions : [{type: String}],
    timeLimit : {type : Number , default : 0},
    noOfQuestions : {type : Number, default : 0},
    categories : [{type: String}],
    subCategories : [{categories : String, value : [String]}]
});

module.exports = testSchema;
