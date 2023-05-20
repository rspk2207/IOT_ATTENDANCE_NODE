const Student = require('../models/student');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const auth_controller = {
    getAuthentication:
        (req,res) => {
            res.render('auth');
        },
    getSignIn:
        (req,res) => {
            res.render('signin');
        },
    validateSignUp:
    (req,res) => {
        console.log(req.body);
        const {name, email, contactNumber,parentsContactNumber,rollNumber, password, verifypassword} = req.body;
        let errors = [];
        if(!name || !email || !password || !verifypassword || !rollNumber || !contactNumber || !parentsContactNumber)
        {
            errors.push(1);
        }
        if(password != verifypassword)
        {
            errors.push(1);
        }
        
        if( !password || password.length < 8 )
        {
            errors.push(1);
        }
        if(contactNumber == parentsContactNumber)
        {
            errors.push(1);
        }
        if(errors.length > 0)
        {
            res.redirect('/auth/authenticate');
        }
        else
        {
            Student.findOne({rollNumber: rollNumber})
            .then(student => {
                if(student)
                {
                   console.log("Student already exists");
                   res.redirect("/auth/authenticate"); 
                }
                else
                {
                    let id = 0; 
                    if(rollNumber == '108120111')
                    {
                        id = 1;
                    }
                    else if(rollNumber == '108120123')
                    {
                        id = 2;
                    }
                    else if(rollNumber == 'ADMIN')
                    {
                        id = 0;
                    }
                    const newStudent = new Student({
                        name: name,
                        password: password,
                        email: email,
                        contactNumber: contactNumber,
                        parentsContactNumber: parentsContactNumber,
                        rollNumber: rollNumber,
                        sid: id
                    });

                    bcrypt.genSalt(10, (err,salt) => 
                    bcrypt.hash(newStudent.password,salt, (err,hash) =>
                    {
                        if(err)
                        {
                            console.log("Error in salting password");
                            throw err;
                        }
                        newStudent.password = hash;
                        newStudent.save();
                        /*
                        .then(student =>{
                            console.log(student,1);
                        })
                        .catch(err => console.log(err));
                        */
                        res.redirect('/auth/authenticate');
                    }))
                }
            })
        }
    },
    validateSignIn:
    (req,res,next) => {
        passport.authenticate('local',{
            successRedirect: '/auth/dashboard',
            failureRedirect: '/auth/authenticate',
            successMessage:{message: 'signin success'},
            failureMessage:{message:'signin failed ra bunda'}
        }) (req,res,next);

    },
    verify:
    (req,res) => {
        //console.log(req.user);
        res.redirect('/auth/dashboard')
        //res.render('layout',{user: req.user});
    },
    getDashboard:
    (req,res) => {
        /*
        Review.find({email: req.user.email})
        .then(reviewData => {
            res.render('dashboard',{user: req.user, reviewData});
        })
        .catch(err => {
            console.log(err);
        });
        */
        
        if(req.user.sid == '0')
        {   
            Student.find({})
            .then(allData=> {
            res.render('attendance_admin',{user: req.user, students: allData});
            })
            .catch(err => {
                console.log(err);
            });
        }
        else
        {
            res.render('attendance',{user: req.user,id: req.user.sid});
        }
    },
    getStudentStat:
    (req,res) => {
        console.log(req.params.pid);
        Student.findOne({sid: String(req.params.pid)})
        .then(student => {
            console.log(student);
            res.render('student_stats_admin',{ user: req.user, studentData: student});
        })
        .catch(err => {
            console.log(err);
            res.redirect('/auth/dashboard');
        })
    }

}

module.exports = auth_controller;