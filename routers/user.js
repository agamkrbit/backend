let express = require('express');
let router = express.Router();
let User = require('../models/database').User;
let jsonwebtoken = require('jsonwebtoken');
let secret = require('../config/jwt_config').secret;

router.use(function(req, res, next){
    console.log('requested for user at '+new Date().toISOString());
    next();
});

router.use(function(req, res, next){
    let bearer = req.headers.authorization || '';
    let bearerToken = bearer.split(' ')[1];
    if(bearerToken){
        jsonwebtoken.verify(bearerToken, secret, function(err, decode){
            if(err){
                res.status('401').json({
                    message : 'Unauthorised',
                    code : '401'
                })
            }
            req.user = decode;
            next();
        })
    }else{
        res.status('401').json({
            message : 'unauthorised',
            code : '401'
        })
    }
})

router.get('/details', function(req, res){
    res.status(200).json({
        user : req.user,
        message : 'sucess',
        code : '200'
    })
});

router.get('/settings', function(req, res){
    User.findOne({email : req.user.email}, function(err, data){
        if(err){
            res.status('500').json({
                message : 'Internal error',
                code : '401'
            })
        }else{
            let settings = data.settings || [];
            res.status('200').json({
                message : 'sucess',
                settings : settings,
                code : '200'
            })
        }
    })
})

router.put('/settings', function(req, res){
    User.updateOne({email : req.user.email}, {settings : req.body.settings}, function(err, raw){
        if(err){
            res.status('500').json({
                message : 'internal error',
                code : 'Interal Error'
            })
        }else{
            res.status('200').json({
                message : 'sucess',
                settings : req.body.settings,
                code : '200'
            })
        }
    });
})

module.exports = router;