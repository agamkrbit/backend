let express = require('express');
let router = express.Router();
let Test = require('../models/database').Test;

router.use(function(req, res, next){
    console.log('requested for test at '+new Date().toISOString());
    next();
});
router.get('/id/:id', function(req, res){
    Test.findOne({id : req.params.id}, function(err, data){
        if(err){
            res.status(500).json({
                code : '500',
                message : 'Internal Error'
            })
        }else{
            res.status(200).json({
                code : '200',
                message : 'sucess',
                test : data || []
            })
        }
    })
})
router.get('/all/:categories*?', function(req, res){
    categories = req.params.categories || '';
    categories = categories.split(',').filter(val => val.length > 0);
    Test.find(categories.length > 0 ? {categories : { $in :categories}} : {}, function(err, val){
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
                    instructions : value.instructions,
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

router.get('/trending/:categories*?', function(req, res){
    categories = req.params.categories || '';
    categories = categories.split(',').filter(val => val.length > 0);
    Test.aggregate([
        {$match : categories.length > 0 ? {categories : {$in : categories}} : {}},
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
                    instructions : value.instructions,
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

router.get('/recent/:categories*?', function(req, res){
    categories = req.params.categories || '';
    categories = categories.split(',').filter(val => val.length > 0);
    Test.aggregate([
        {$match : categories.length > 0 ? {categories : {$in : categories}} : {}},
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
                    instructions : value.instructions,
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