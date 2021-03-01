const mongoose = require('mongoose');


var productSchema = new mongoose.Schema({
    productName:{
        type:String
    },
    categoryName:{
        type:String
    },
    price:{
        type:String
    },
    productImage:{
          type:String
    },
    Description:{
        type:String
    }
});


mongoose.model('Product',productSchema);