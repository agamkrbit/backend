let router = require('express').Router();
let User = require('../models/database').User;
let jsonwebtoken = require('jsonwebtoken');
let secret = require('../config/jwt_config').secret;


router.post('/login', function(req, res){
    if(req.body.username && req.body.password){
        User.findOne({name : req.body.name, password :  req.body.password},function(err, adv){
            if(err){
                res.status(500).json({
                    message : 'internal error'
                }) 
            }
            if(adv){
                let user = {
                    firstname : adv.firstname,
                    lastname : adv.lastname,
                    email : adv.email,
                    password : adv.password
                }
                jsonwebtoken.sign(user, secret,function(err, token){
                    if(err){
                        console.log(err);
                        res.status(500).json({
                            message : 'Internal error'
                        }) 
                    }else{
                        res.status(200).json({
                            message : 'Sucess',
                            token : token
                        })
                    }
                })
            }else{
                res.status(404).json({
                    message : 'username or password is wrong!',
                })
            }
            
        })
    }else{
        res.status(400).json({
            message : 'Missing parameters'
        })
    }
})

module.exports = router;