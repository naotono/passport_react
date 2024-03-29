const Strategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')

const salt = bcrypt.genSaltSync(10)

const loginStrategy = new Strategy({usernameField: 'email'}, function(email, password, done){
    User.findOne({email}).lean().exec((err, user) => {
        if (err) {
            return done(err, null);
        }
        if (!user) {
            return done('No user found', null);
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if(!isPasswordValid) {
            return done('Email or Password not valid', done)
        }
        
        return done(null, user);
    });
})


module.exports = loginStrategy