//Connection Creation.....
const mongoose = require('mongoose');


 mongoose.connect("mongodb://localhost:27017/demoProjectDB",
  { useNewUrlParser: true , useUnifiedTopology: true })
  .then(()=>console.log("connection stablished!")).catch((err)=>console.log(err));


  require('./cate.model');
  require('./product.model');
  require('./customer.model');
  require('./cart.model');