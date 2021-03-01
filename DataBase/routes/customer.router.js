const express = require('express');
const router=express.Router();
const multer = require('multer');

//image upload....
const storage=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"uploads/")
    },
    filename: (req, file, callback) => {
        callback(null, `${file.originalname}`)
    }
})
upload = multer({
    storage: storage,
})


const ctrlUser= require('../controllers/customer.controller');

//new customer creation .....
router.post("/customer",upload.single('customerImage'),ctrlUser.createCustomer);
//authenticate login customer...
router.post("/login",ctrlUser.login);

module.exports = router;