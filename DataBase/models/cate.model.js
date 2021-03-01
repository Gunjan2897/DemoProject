const mongoose = require('mongoose');


var cateSchema = new mongoose.Schema({
    title:{
        type:String
    },
    status:{
        type:String
    }
});


mongoose.model('Category',cateSchema);