const mongoose = require('mongoose');


var cartSchema = new mongoose.Schema({
   
    quantity:{
       type:Number,
       default:1
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,ref:'Product'
      
     },
     customer_id:{
        type:mongoose.Schema.Types.ObjectId,ref:'Customer',
       
    }
});
//cartSchema.createIndex({customer_id:1},{ sparse:true})

mongoose.model('Cartitems',cartSchema);