let mongoose = require('mongoose');
let userSchema = require('./user');
let testSchema = require('./test');

mongoose.connect('mongodb://agam:agamkr123@cluster0-shard-00-00-9hkbn.mongodb.net:27017,cluster0-shard-00-01-9hkbn.mongodb.net:27017,cluster0-shard-00-02-9hkbn.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true',{useNewUrlParser : true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
    console.log('connected');
})

let User =  mongoose.model('users', userSchema);
let Test = mongoose.model('tests', testSchema);
module.exports = {
    User,
    Test,
    mongoose
};