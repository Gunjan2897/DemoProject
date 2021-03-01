const mongoose = require('mongoose');
const Product = mongoose.model('Product')


//for creating new products...
module.exports.createProduct = (req, res) => {
    //Create a Product...
    //console.log(req.body);
    const product = new Product({
        productName: req.body.productName,
        categoryName: req.body.categoryName,
        price: req.body.price,
        productImage: req.file.filename,
        Description:req.body.Description
    });
    // Save Products in databse..
    product.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({ message: err.message || "Some error occurred." })
    });
}


//Retrieve all Products from the database..
module.exports.findAll = (req, res) => {
    Product.find().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({ message: err.message || "Some error occurred." })
    });
}

//Remove Products from database.....
module.exports.deleteProduct = (req, res) => {
    // console.log(req.body);
    Product.findOneAndDelete({ _id: req.params.id }, (err, result) => {
        if (err) {
            res.status(500).json({ errmsg: err });
        } else {
            res.status(200).json({ msg: result + "Deleted" })
        }
    })
}

//Update Products from Database....
module.exports.updateProduct = (req, res) => {
    if(req.file){
        req.body.productImage=req.file.filename}
    Product.findOneAndUpdate({ _id: req.params.id },req.body,(err, result) => {
        if (err) {
            res.send(err)
        } else 
            res.send(result)
        }
    );
}