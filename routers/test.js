let express = require('express');
let router = express.Router();
let Test = require('../models/database').Test;

router.use(function(req, res, next){
    console.log('requested for test at '+new Date().toISOString());
    next();
});

router.get('/all', function(req, res){
    Test.find({categories : {$in : req.body.categories || ['SSC:CGL']}}, function(err, val){
        if(err){
            res.status('500').json({
                message : 'internal error',
                code : '500'
            })
        }else{
            let tests = val.map((value) => {
                return {
                    id : value.id,
                    name : value.name,
                    description : value.description,
                    noUserAttempted : value.noUserAttempted,
                    noUserLike: value.noUserLike,
                    timeLimit : value.timeLimit,
                    noOfQuestions : value.noOfQuestions,
                    categories : value.categories,
                    subCategories : value.subCategories
                }
            });
            res.status('200').json({
                message : 'success',
                tests : tests,
                code : '200'
            })
        }
    })
});

router.get('/trending', function(req, res){
    
    Test.aggregate([
        {$match : {categories : {$in : req.body.categories || ['SSC:CGL']}}},
        {$sort : { noUserLike : 1}},
        {$limit : 20}
    ]).exec(function(err , val){
        if(err){
            res.status('500').json({
                message : 'internal error',
                code : '500'
            })
        }else{
            let tests = val.map((value) => {
                return {
                    id : value.id,
                    name : value.name,
                    description : value.description,
                    noUserAttempted : value.noUserAttempted,
                    noUserLike: value.noUserLike,
                    timeLimit : value.timeLimit,
                    noOfQuestions : value.noOfQuestions,
                    categories : value.categories,
                    subCategories : value.subCategories
                }
            });
            res.status('200').json({
                message : 'success',
                tests : tests,
                code : '200'
            })
        }
    });
});

router.get('/recent', function(req, res){
    
    Test.aggregate([
        {$match : {categories : {$in : req.body.categories || ['SSC:CGL']}}},
        {$sort : { timestamp : 1}},
        {$limit : 20}
    ]).exec(function(err , val){
        if(err){
            res.status('500').json({
                message : 'internal error',
                code : '500'
            })
        }else{
            let tests = val.map((value) => {
                return {
                    id : value.id,
                    name : value.name,
                    description : value.description,
                    noUserAttempted : value.noUserAttempted,
                    noUserLike: value.noUserLike,
                    timeLimit : value.timeLimit,
                    noOfQuestions : value.noOfQuestions,
                    categories : value.categories,
                    subCategories : value.subCategories
                }
            });
            res.status('200').json({
                message : 'success',
                tests : tests,
                code : '200'
            })
        }
    });
});

module.exports = router;