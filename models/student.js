const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    parentsContactNumber: {
        type: String,
        required: true
    },
    rollNumber: {
        type: String,
        required: true
    },
    sid:{
        type: String,
        required: true
    }
})

const Student = mongoose.model('Student',UserSchema,'students');

module.exports = Student;