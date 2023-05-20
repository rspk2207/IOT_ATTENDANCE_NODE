const LocalStorage = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Student = require('../models/student');

module.exports = function(passport){
    passport.use(
        new LocalStorage({usernameField: 'email'},(email,password,done) =>{
            Student.findOne({email: email})
            .then(student =>{
                if(!student)
                {
                    console.log("No user found using passport authentication");
                    return done(null,false,{message: 'That email is not registered'});
                }

                bcrypt.compare(password,student.password,(err,success) => {
                    if(err) throw err;
                    if(success)
                    {
                        console.log("Password matches");
                        return done(null,student);
                    }
                    else
                    {
                        console.log("Password doesn't match");
                        return done(null,false,{message: "Incorrect password found during passport authentication"});
                    }
                });
            })
            .catch(err => console.log(err));
        })
    );

    passport.serializeUser((student,done) => {
        done(null,student.id);
    });

    passport.deserializeUser((id,done) => {
        Student.findById(id)
        .then(student =>{
            done(null,student);
        });
        /*
        ((err,usert) => {
            done(err,usert);
        })(err,usert);
        */
    });
}

