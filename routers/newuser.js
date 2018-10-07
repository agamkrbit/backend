let express = require('express');
let router = express.Router();
let User = require('../models/database').User;
let jsonwebtoken = require('jsonwebtoken');
let secret = require('../config/jwt_config').secret;

router.use(function(req, res, next){
    console.log('requested for user at '+new Date().toISOString());
    next();
});

router.post('/create', function(req, res){
    let existedUser = User.find({email : req.body.email }, function(err, adv){
        if(err){
            res.status('500').json({
                message : 'Internal error',
                code : '500'
            })
        }else{
            if(adv){
                res.status('406').json({
                    message : 'User already registed!',
                    code : '406'
                })
            }else{
                let newUser = new User(req.body);
                newUser.save(function(err){
                    if(err){
                        res.status('500').json({
                            message : 'Internal error',
                            code : '500'
                        })
                    }else{
                        res.status('201').json({
                            message : 'sucessfully created user',
                            code : '201'
                        })
                    }
                })
            }
        }
    })
});

module.exports = router;