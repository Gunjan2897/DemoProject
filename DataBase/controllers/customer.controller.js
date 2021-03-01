const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');
const bycrpt = require('bcrypt');
const  jwt = require('jsonwebtoken');


//for creating new customer...
module.exports.createCustomer = (req, res) => {
  console.log(req.body);
    const customer = new Customer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        customerImage: req.file.filename,
        role: req.body.role,
        phone: req.body.phone,
        address:{
            city:req.body.city,
            country:req.body.country,
            state:req.body.state,
            zip:req.body.zip
        }
    });
    // Save customer details in databse..
    customer.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({ message: err.message || "Some error occurred." })
    });
}

//for login authenticate customer....
module.exports.login=(req,res)=>{
    Customer.find({email:req.body.email}).then(customer=>{
        
        bycrpt.compare(req.body.password,customer[0].password,(err,result)=>
        {
            if(err)
            {
                return res.status(401).json({
                    message:"authentication Failed!"
                });
            }
            else if(result)
            {
          
                const token = jwt.sign(
                    {data:customer[0]._id},'SECRET#123',{
                    expiresIn:"1h"
                });
                return res.status(200).json({
                    message:"Authentication has successfully done!",
                    token:token
                });
            }else{
                res.status(401).json({
                    message:"authentication Failed"
                });
            }
        })
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    }) ;
}