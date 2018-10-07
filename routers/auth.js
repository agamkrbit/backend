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
                            message : 'internal error'
                        }) 
                    }else{
                        res.status(200).json({
                            message : 'sucess',
                            token : token
                        })
                    }
                })
            }else{
                res.status(404).json({
                    message : 'Username is not registered',
                })
            }
            
        })
    }else{
        res.status(401).json({
            message : 'missing parameters'
        })
    }
})

module.exports = router;