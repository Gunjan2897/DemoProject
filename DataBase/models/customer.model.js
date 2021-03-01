const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var customerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: "full name can\'t be empty"
    },
    lastName: {
        type: String,
        required: "full name can\'t be empty"
    },
    email: {
        type: String,
        required: "email can\'t be empty",
        unique: true
    },
    password: {
        type: String,
        required: "password can\'t be empty",
        minlength: [5, 'password must be atleast 5 character long']
    },
    customerImage: {
        type: String
    },
    role:{
        type:String,
    },
    phone: {
        type: String,
        required: "phone can\'t be empty"
    },
    address: {
        city: String,
        state: String,
        country:String,
        zip: String
    }
});

//custom validations for email...
customerSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,13}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);

}, 'invalid email!')

//for password bcrypt....
customerSchema.pre('save',function(next){
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(this.password,salt,(err,hash)=>{
            this.password=hash;
            this.saltSecret=salt;
            next();
        })
    })
})

mongoose.model('Customer', customerSchema);