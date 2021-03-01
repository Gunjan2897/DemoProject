const express = require('express')
const router=express.Router();


const ctrlUser = require('../controllers/cate.controller')

//create new category...
router.post('/create',ctrlUser.create);
//Retrieve all Categories...
router.get("/get",ctrlUser.findAll);
//Delete Categories...
router.delete("/delete/:id",ctrlUser.delete);
//update categories...
router.put("/update/:id",ctrlUser.update);

module.exports = router;