let mongoose = require('mongoose');
let settingSchema = mongoose.Schema({
    intertrestedTopic : [String],
})

module.exports = settingSchema;