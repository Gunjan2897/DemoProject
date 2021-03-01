const mongoose = require('mongoose');
const Cart = mongoose.model('Cartitems')


//Creating new cart in to the DB...
module.exports.savecart = (req, res) => {
    //Create a cart...
    Cart.find({ productId: req.body.productId }).exec((err, result) => {
        if (result.length == 0) {
            let cart = new Cart();
            cart.customer_id = req.payload.data,
            cart.productId = req.body.productId

            // Save cart in databse..
            cart.save().then((err,result)=>{
                if(err){
                    res.status(200).json(err);
                   
                }else{
                    console.log(cart);
                    res.status(200).json(result);
                }
            }).catch((error)=>{
                 console.log(error);
            })
        } else {
           
            res.status(400).send(err)
        }
    }
    )

}

//Retrieve all cart from the database..
module.exports.findAll = (req, res) => {

    Cart.find().populate("productId").then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({ message: err.message || "Some error occurred." })
    });
}


//remove items from cart....
module.exports.remove=(req,res)=>{
    Cart.findByIdAndRemove({_id:req.params.id},(err,result)=>{
        if(err){
            res.status(500).json(err);
        }else{
            res.status(200).json("Deleted");
        }
    })
}