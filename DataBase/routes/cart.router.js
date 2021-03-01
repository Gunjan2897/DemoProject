const express = require('express')
const router=express.Router();




const ctrlUser = require('../controllers/cart.controller')
const jwtHelper=require('../jwt/jwtHelper');


//create new cart...
router.post('/save',jwtHelper.verifyJwtToken,ctrlUser.savecart);
//Retrieve all cart...
router.get("/getcart",ctrlUser.findAll);
//Delete cart...
router.delete("/del/:id",ctrlUser.remove);
//update cart...
//router.put("/update/:id",ctrlUser.update);

module.exports = router;