const express = require('express');
const User = require('../models/user');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const dbConfig = require('../configuration/dbConfig');


router.post('/registration', (request, response)=>{
    let user = new User({ 
        nickname: request.body.nickname, 
        email: request.body.email, 
        password: request.body.password
    });

    User.addUser(user, (error, user)=>{
        if(error){
            response.json({success: false, message: 'User NOT added...'});
        }
        else{
            response.json({success: true, message: 'User added...'});
        }
    });
});


router.post('/auth', (request, response)=>{
    const login = request.body.nickname;
    const password = request.body.password;

    User.getUserByNickname(login, (error, user)=>{
        if(error) throw error;
        if(!user){
            return response.json({success: false, message: 'User Not Found'});
        }

        // compare
        User.passwordCompare(password, user.password, (error, isMatch)=>{
            if(error) throw error;
            if(isMatch){
                jwt.sign(user, dbConfig.secretKey, {
                    expiresIn: 60
                });
                response.json({
                    success: true,
                    user:{
                        id: user.id,
                        nickname: user.nickname, 
                        email: user.email
                    }
                });
            }
            else{
                return response.json({success: false, message: 'Passwords not equals'});
            }
        });
    });
});

router.get('/personalarea', passport.authenticate('jwt', {session: false}), (request, response)=>{
    response.send('Personal Area');
});

module.exports = router;