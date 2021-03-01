const express = require('express')
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


const ctrlUser = require('../controllers/product.controller')

//for creating new products Route....
router.post('/createProduct',upload.single('productImage'),ctrlUser.createProduct);
//Retrieve all Products Route...
router.get("/getProd",ctrlUser.findAll);
//Remove Products...
router.delete("/deleteProd/:id",ctrlUser.deleteProduct);
//Update products Route....
router.put("/updateProd/:id",upload.single('productImage'),ctrlUser.updateProduct);

module.exports = router;